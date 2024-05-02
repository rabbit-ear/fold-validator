<script lang="ts">
	import DragAndDrop from "./DragAndDrop.svelte";
	import Header from "./Header.svelte";
	import Validator from "./validator/Validator.svelte";
	import Viewer from "./viewer/Viewer.svelte";
	import { AppScreen } from "../general/types.ts";
	import { Screen } from "../stores/view.ts";
</script>

<main>
	<DragAndDrop />
	<Header />
	{#if $Screen === AppScreen.validator}
		<Validator />
	{:else if $Screen === AppScreen.viewer}
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
