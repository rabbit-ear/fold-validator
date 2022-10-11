<script>
	export let validation = {};
</script>

<!-- summary -->
{#if validation.errors && validation.errors.length}
	<h3 class="error">problems found</h3>
{:else if validation.warnings && validation.warnings.length}
	<h3 class="success">valid</h3>
	<p class="warning">with warnings</p>
{:else}
	<h3 class="success">valid</h3>
{/if}

<div class="container">
	{#if validation.errors}
		{#each validation.errors as el}
			<div class="alert error">&cross; {el}</div>
		{/each}
	{/if}
	{#if validation.warnings}
		{#each validation.warnings as el}
			<div class="alert warning">&#9888; {el}</div>
		{/each}
	{/if}
	{#if validation.successes}
		{#each validation.successes as el}
			<div class="alert success">&check; {el}</div>
		{/each}
	{/if}
</div>

<!-- <div>
	<p>
		<span>epsilon</span><input type="text" /><button>auto-detect</button>
	</p>
</div> -->

<style>
	h3 { margin: 1rem 0; }
	h3.error { color: var(--darkmode-red); }
	h3.warning { color: var(--darkmode-yellow); }
	h3.success { color: #ccc; }
	.alert {
		margin: 0.125rem;
		padding: 0.25rem 1rem;
		border-radius: 0.5rem;
	}
	.alert.error { background-color: var(--darkmode-red); color: white; }
	.alert.warning { background-color: var(--darkmode-yellow); color: black; }
	.alert.success { background-color: var(--darkmode-gray-4); color: white; }
	.container {
		max-width: 75vw;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
</style>
