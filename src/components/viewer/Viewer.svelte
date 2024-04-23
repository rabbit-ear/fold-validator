<script lang="ts">
	import WebGLCanvas from "./WebGLCanvas.svelte";
	import Settings from "./Settings.svelte";
	import { Frame } from "../../stores/file.ts";
	import {
		Perspective,
		FrameClass,
		ViewMatrix,
	} from "../../stores/view.ts";
</script>

<div>
	<Settings />
	<WebGLCanvas
		graph={$Frame}
		perspective={$Perspective}
		renderStyle={$FrameClass}
		viewMatrix={$ViewMatrix}
	/>
</div>

<style>
	div {
		height: calc(100vh - 3rem - 3px);
	}
</style>
