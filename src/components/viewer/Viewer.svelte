<script lang="ts">
	import Effects from "./Effects.svelte";
	import WebGLCanvas from "./WebGLCanvas.svelte";
	import Settings from "./Settings.svelte";
	import { Frame } from "../../stores/file.svelte.ts";
	import { Renderer } from "../../stores/view.svelte.ts";
</script>

<div>
	<Effects />
	<Settings />
	<WebGLCanvas
		graph={Frame.value}
		perspective={Renderer.Perspective}
		renderStyle={Renderer.FrameClass}
	/>
</div>

<style>
	/* 3rem is the header height */
	/* 2px to fix the annoying canvas overspil thing that always seems to happen */
	div {
		width: 100%;
		height: calc(100vh - 3rem - 3px);
	}
</style>
