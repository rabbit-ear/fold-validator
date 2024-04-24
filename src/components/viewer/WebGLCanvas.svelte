<script lang="ts">
	import {
		type FOLD,
	} from "rabbit-ear/types.js";
	import {
		identity4x4,
	} from "rabbit-ear/math/matrix4.js";
	import WebGLRender from "./WebGLRender.svelte";
	import {
		RenderStyle,
		RenderPerspective,
		type GLCanvasUIEvent,
	} from "../../stores/types.ts";
	import {
		rotateViewMatrix,
		zoomViewMatrix,
	} from "./general.ts";

	export let graph: FOLD = {};
	export let perspective: RenderPerspective;
	export let renderStyle: RenderStyle;
	export let viewMatrix = [...identity4x4];
	let prevVector: [number, number]|undefined;

	type DispatchedGLCanvasUIEvent = { detail: GLCanvasUIEvent };

	const onPress = ({ detail }: DispatchedGLCanvasUIEvent) => {
		detail.preventDefault();
		const { point, vector } = detail;
		prevVector = vector;
	};

	const onMove = ({ detail }: DispatchedGLCanvasUIEvent) => {
		detail.preventDefault();
		const { point, vector } = detail;
		const buttons = prevVector ? 1 : 0;
		if (buttons && prevVector && vector) {
			viewMatrix = rotateViewMatrix(perspective, viewMatrix, vector, prevVector);
			prevVector = vector;
		}
	};

	const onRelease = () => {
		prevVector = undefined;
	};

	const onScroll = ({ detail }: DispatchedGLCanvasUIEvent) => {
		detail.preventDefault();
		const { deltaY } = detail;
		if (deltaY !== undefined) {
			const scrollSensitivity = 1 / 100;
			const delta = -deltaY * scrollSensitivity;
			if (Math.abs(delta) < 1e-3) { return; }
			viewMatrix = zoomViewMatrix(perspective, viewMatrix, delta);
		}
	};
</script>

<WebGLRender
	{graph}
	{perspective}
	{renderStyle}
	viewMatrix={viewMatrix}
	on:press={onPress}
	on:move={onMove}
	on:release={onRelease}
	on:scroll={onScroll}
/>
