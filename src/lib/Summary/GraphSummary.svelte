<script>
export let FOLD = {};
export let validation;
</script>

{#if validation}
	{#if validation.vertices}
		{#if validation.vertices.references === false}
			<p>element references a vertex which doesn't exist</p>
		{:else}
			<p>vertex references valid</p>
		{/if}
	{/if}
{/if}
