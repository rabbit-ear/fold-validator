<script lang="ts">
  import DragAndDrop from "./DragAndDrop.svelte";
	import Header from "./Header.svelte";
	import Validator from "./validator/Validator.svelte";
	import Viewer from "./viewer/Viewer.svelte";
	import { AppMode } from "../stores/types.ts";

	let appMode:AppMode = AppMode.Validator;
</script>

<main>
	<DragAndDrop />
	<Header bind:appMode={appMode} />

	{#if appMode === AppMode.Validator}
		<Validator />
	{:else if appMode === AppMode.Viewer}
		<Viewer />
	{:else}
		<div></div>
	{/if}
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		min-height: 100vh;
	}
</style>
