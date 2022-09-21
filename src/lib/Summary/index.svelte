<script>
	import GraphSummary from "./GraphSummary.svelte";
	export let FOLD = {};
	export let validation;
	let isEmpty;
	$: isEmpty = Object.keys(FOLD).length === 0;
</script>

{#if !isEmpty}
	{#if validation}
		<h3>{validation.summary}</h3>
		<GraphSummary {FOLD} {validation} />
	{/if}
{/if}

<style>
	h3 {
		color: #fb4;
	}
</style>