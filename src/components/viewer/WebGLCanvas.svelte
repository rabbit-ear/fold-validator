<script lang="ts">
	import {
		type FOLD,
	} from "rabbit-ear/types.js";
	import WebGLRender from "./WebGLRender.svelte";
	import {
		RenderStyle,
		RenderPerspective,
		type GLCanvasUIEvent,
	} from "../../general/types.ts";
	import {
		ViewMatrix,
	} from "../../stores/view.svelte.ts";
	import {
		rotateViewMatrix,
		zoomViewMatrix,
	} from "../../general/math.ts";

	type WebGLCanvasProps = {
		graph: FOLD,
		perspective: RenderPerspective,
		renderStyle: RenderStyle,
	};

	let { graph, perspective, renderStyle }: WebGLCanvasProps = $props();
	let prevVector: [number, number]|undefined;

	const onpress = (event: GLCanvasUIEvent) => {
		event.preventDefault();
		const { point, vector } = event;
		prevVector = vector;
	};

	const onmove = (event: GLCanvasUIEvent) => {
		event.preventDefault();
		const { point, vector } = event;
		const buttons = prevVector ? 1 : 0;
		if (buttons && prevVector && vector) {
			$ViewMatrix = rotateViewMatrix(perspective, $ViewMatrix, vector, prevVector);
			prevVector = vector;
		}
	};

	const onrelease = () => {
		prevVector = undefined;
	};

	const onscroll = (event: GLCanvasUIEvent) => {
		const { deltaY } = event;
		if (deltaY !== undefined) {
			const scrollSensitivity = 1 / 100;
			const delta = -deltaY * scrollSensitivity;
			if (Math.abs(delta) < 1e-3) { return; }
			$ViewMatrix = zoomViewMatrix(perspective, $ViewMatrix, delta);
		}
	};
</script>

<WebGLRender
	{graph}
	{perspective}
	{renderStyle}
	viewMatrix={$ViewMatrix}
	{onpress}
	{onmove}
	{onrelease}
	{onscroll}
/>
