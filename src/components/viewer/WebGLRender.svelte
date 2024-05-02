<script lang="ts">
	import {
		onMount,
		onDestroy,
		createEventDispatcher,
	} from "svelte";
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
		FrontColor,
		BackColor,
		CPColorMode,
		LayerNudge,
		StrokeWidth,
		ShowFoldedFaceOutlines,
		ShowFoldedCreases,
		ShowFoldedFaces,
	} from "../../stores/view.js";

	export let graph: FOLD = {};
	export let fov = 30.25;
	export let perspective: RenderPerspective = RenderPerspective.orthographic;
	export let viewMatrix = [...identity4x4];
	export let renderStyle: RenderStyle;

	let gl: WebGLRenderingContext|WebGL2RenderingContext;
	let version: number;
	let canvas: HTMLCanvasElement;
	let models: WebGLModel[] = [];

	let canvasSize: [number, number];
	$: canvasSize = (canvas
		? [canvas.clientWidth, canvas.clientHeight]
		: [1, 1]);
	$: modelMatrix = makeModelMatrix(graph);
	$: modelViewMatrix = multiplyMatrices4(viewMatrix, modelMatrix);
	$: projectionMatrix = makeProjectionMatrix(canvas, perspective, fov);

	$: uniformOptions = {
		projectionMatrix,
		modelViewMatrix,
		canvas,
		frontColor: renderStyle === RenderStyle.translucent ? "#9e9b9b" : $FrontColor,
		backColor: renderStyle === RenderStyle.translucent ? "#9e9b9b" : $BackColor,
		outlineColor: renderStyle === RenderStyle.translucent ? "white" : "black",
		cpColor: $CPColorMode === ColorMode.dark ? "#121212" : "white",
		strokeWidth: $StrokeWidth,
		opacity: renderStyle === RenderStyle.translucent ? 0.25 : 1,
	};

	$: programOptions = {
		...($CPColorMode === ColorMode.dark ? dark : light),
		layerNudge: $LayerNudge,
		outlines: $ShowFoldedFaceOutlines,
		edges: $ShowFoldedCreases,
		faces: $ShowFoldedFaces,
	};

	$: uniforms = models.map(model => model.makeUniforms(gl, uniformOptions));

	$: {
		try {
			deallocPrograms();
			models = renderStyle === RenderStyle.creasePattern
				? creasePattern(gl, version, graph, programOptions)
				: foldedForm(gl, version, graph, programOptions);
		} catch (error) { }
	};

	$: if (gl) {
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		models.forEach((program, i) => drawModel(gl, version, program, uniforms[i]));
	};

	const deallocPrograms = () => models
		.forEach(program => deallocModel(gl, program));

	const dealloc = () => {
		deallocPrograms();
		// gl = undefined;
		// version = undefined;
		// canvas = undefined;
		models = [];
	};

	const onResize = () => {
		if (!canvas) { return; }
		canvas = canvas;
		rebuildViewport(gl, canvas);
	};

	onMount(() => {
		const init = initializeWebGL(canvas); // (canvas, 1); to force WebGL 1
		gl = init.gl;
		version = init.version;
		if (!gl) {
			return alert("WebGL is not supported.");
		}
		gl.enable(gl.BLEND);
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
		rebuildViewport(gl, canvas);
	});

	onDestroy(dealloc);

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

	const dispatch = createEventDispatcher();
	const mousedown = (e: MouseEvent) => dispatch("press", formatEvent(e));
	const mousemove = (e: MouseEvent) => dispatch("move", formatEvent(e));
	const mouseup = (e: MouseEvent) => dispatch("release", formatEvent(e));
	const touchstart = (e: TouchEvent) => dispatch("press", formatTouchEvent(e));
	const touchmove = (e: TouchEvent) => dispatch("move", formatTouchEvent(e));
	const touchend = (e: TouchEvent) => dispatch("release", formatTouchEvent(e));
	const wheel = (e: WheelEvent) => dispatch("scroll", e);
</script>

<svelte:window on:resize={onResize} />

<canvas
	bind:this={canvas}
	on:mousedown={mousedown}
	on:mousemove={mousemove}
	on:mouseup={mouseup}
	on:wheel={wheel}
	on:touchstart={touchstart}
	on:touchmove={touchmove}
	on:touchend={touchend}
/>

<style>
	canvas {
		width: 100%;
		height: 100%;
	}
</style>
