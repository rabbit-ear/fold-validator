<script>
	export let validation = {};
</script>

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
