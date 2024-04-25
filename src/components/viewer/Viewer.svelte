<script lang="ts">
	import WebGLCanvas from "./WebGLCanvas.svelte";
	import Settings from "./Settings.svelte";
	import {
		Frame,
	} from "../../stores/file.ts";
	import {
		Perspective,
		FrameClass,
	} from "../../stores/view.ts";
</script>

<div>
	<Settings />
	<WebGLCanvas
		graph={$Frame}
		perspective={$Perspective}
		renderStyle={$FrameClass}
	/>
</div>

<style>
	/* 3rem is the header height */
	/* 3px to fix the annoying canvas overspil thing that always seems to happen */
	div {
		width: 100%;
		height: calc(100vh - 3rem - 3px);
	}
</style>
