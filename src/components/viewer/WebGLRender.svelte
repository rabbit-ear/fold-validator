<script lang="ts">
	import earcut from "earcut";
	import {
		type FOLD,
		type WebGLModel,
	} from "rabbit-ear/types.js";
	import {
		identity4x4,
		multiplyMatrices4,
	} from "rabbit-ear/math/matrix4.js";
	import {
		initializeWebGL,
	} from "rabbit-ear/webgl/general/webgl.js";
	import {
		rebuildViewport,
		makeProjectionMatrix,
		makeModelMatrix,
	} from "rabbit-ear/webgl/general/view.js";
	import {
		creasePattern,
	} from "rabbit-ear/webgl/creasePattern/models.js";
	import {
		foldedForm,
	} from "rabbit-ear/webgl/foldedForm/models.js";
	import {
		touchIndicators,
	} from "rabbit-ear/webgl/touches/models.js";
	import {
		drawModel,
		deallocModel,
	} from "rabbit-ear/webgl/general/model.js";
	import {
		dark,
		light,
	} from "rabbit-ear/webgl/general/colors.js";
	import {
		vectorFromScreenLocation,
	} from "../../general/math.ts";
	import {
		RenderPerspective,
		RenderStyle,
		ColorMode,
		type GLCanvasUIEvent,
	} from "../../general/types.ts";
	import {
		Renderer,
	} from "../../stores/view.svelte.js";

	type WebGLRenderProps = {
		graph: FOLD,
		perspective: RenderPerspective,
		renderStyle: RenderStyle,
		viewMatrix: number[],
		fov?: number,
		onpress: Function,
		onmove: Function,
		onrelease: Function,
		onscroll: Function,
	};

	let {
		graph = {},
		perspective = RenderPerspective.orthographic,
		renderStyle = RenderStyle.creasePattern,
		viewMatrix = [...identity4x4],
		fov = 30.25,
		onpress,
		onmove,
		onrelease,
		onscroll,
	}: WebGLRenderProps = $props();

	let canvas: HTMLCanvasElement|undefined = $state(undefined);
	let { gl, version } = $derived(canvas
		? initializeWebGL(canvas)
		: ({ gl: undefined, version: 0 }));
	let canvasSize: [number, number] = $state([1, 1]);
	let modelMatrix = $derived(makeModelMatrix(graph));
	let modelViewMatrix = $derived(multiplyMatrices4(viewMatrix, modelMatrix));
	let projectionMatrix = $derived(makeProjectionMatrix(canvasSize, perspective, fov));
	let cursorScreen: [number, number] = $state([0, 0]);
	let cursorWorld: [number, number] = $state([0, 0]);

	let uniformOptions = $derived({
		projectionMatrix,
		modelViewMatrix,
		canvas,
		// // these are only used by touchIndicators
		// cursorWorld,
		// cursorScreen,
		frontColor: renderStyle === RenderStyle.translucent ? "#9e9b9b" : Renderer.FrontColor,
		backColor: renderStyle === RenderStyle.translucent ? "#9e9b9b" : Renderer.BackColor,
		outlineColor: renderStyle === RenderStyle.translucent ? "white" : "black",
		cpColor: Renderer.CPColorMode === ColorMode.dark ? "#111111" : "white",
		strokeWidth: Renderer.StrokeWidth,
		opacity: renderStyle === RenderStyle.translucent ? 0.25 : 1,
	});

	let programOptions = $derived({
		...(Renderer.CPColorMode === ColorMode.dark ? dark : light),
		layerNudge: Renderer.LayerNudge,
		outlines: Renderer.ShowFoldedFaceOutlines,
		edges: Renderer.ShowFoldedCreases,
		faces: Renderer.ShowFoldedFaces,
		earcut,
	});

	let models: WebGLModel[] = $derived.by(() => {
		try {
			if (!gl) { return []; }
			// deallocModels();
			return renderStyle === RenderStyle.creasePattern
				? [
					...creasePattern(gl, version, graph, programOptions),
					// ...touchIndicators(gl, programOptions),
				] : [
					...foldedForm(gl, version, graph, programOptions),
					// ...touchIndicators(gl, programOptions),
				];
		} catch (error) {
			console.error(error);
			return [];
		}
	});

	let uniforms = $derived(models.map(model => model.makeUniforms(uniformOptions)));

	const deallocModels = () => models.forEach(model => deallocModel(gl, model));

	const onresize = () => {
		if (!gl || !canvas) { return; }
		rebuildViewport(gl, canvas);
		canvasSize = [canvas.clientWidth, canvas.clientHeight];
	};

	const formatEvent = (event: MouseEvent): GLCanvasUIEvent => {
		const screenPoint: [number, number] = [event.offsetX, event.offsetY];
		const vector = vectorFromScreenLocation(screenPoint, canvasSize, projectionMatrix);
		Object.assign(event, { vector });
		return event;
	};

	const formatTouchEvent = (event: TouchEvent): GLCanvasUIEvent => {
		const screenPoint: [number, number] = event.touches.length
			? [event.touches[0].clientX, event.touches[0].clientY]
			: [0, 0];
		const vector = vectorFromScreenLocation(screenPoint, canvasSize, projectionMatrix);
		Object.assign(event, { vector });
		return event;
	};

	const onmousedown = (e: MouseEvent) => onpress(formatEvent(e));
	const onmousemove = (e: MouseEvent) => {
		const event = formatEvent(e);
		cursorScreen = [e.offsetX, e.offsetY];
		cursorWorld = event.vector ? event.vector : [0, 0];
		return onmove(event);
	};
	const onmouseup = (e: MouseEvent) => onrelease(formatEvent(e));
	const ontouchstart = (e: TouchEvent) => onpress(formatTouchEvent(e));
	const ontouchmove = (e: TouchEvent) => onmove(formatTouchEvent(e));
	const ontouchend = (e: TouchEvent) => onrelease(formatTouchEvent(e));
	const onwheel = (e: WheelEvent) => onscroll(e);

	$effect(() => {
		if (!gl || !canvas) { return; }
		gl.enable(gl.BLEND);
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
		rebuildViewport(gl, canvas);
		canvasSize = [canvas.clientWidth, canvas.clientHeight];
	});

	$effect(() => {
		if (gl) {
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
			models.forEach((model, i) => drawModel(gl, version, model, uniforms[i]));
		}
	});

	$effect(() => {
		// return a function to be later called on page deallocation
		return deallocModels;
	});
</script>

<svelte:window {onresize} />

<canvas
	bind:this={canvas}
	{onmousedown}
	{onmousemove}
	{onmouseup}
	{onwheel}
	{ontouchstart}
	{ontouchmove}
	{ontouchend}></canvas>

<style>
	canvas {
		width: 100%;
		height: 100%;
	}
</style>
