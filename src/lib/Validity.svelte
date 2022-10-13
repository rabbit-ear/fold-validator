<script>
	export let validation = {};
</script>

<!-- summary -->
{#if validation.errors && validation.errors.length}
	<h3 class="error">&cross; problems found</h3>
{:else if validation.warnings && validation.warnings.length}
	<h3 class="success">&#9888; valid</h3>
	<p class="warning">with warnings</p>
{:else}
	<h3 class="success">&check; valid</h3>
{/if}

<style>
	h3 {
		font-size: 1.75rem;
		background-color: #36393c;
		border-radius: 1.5rem;
		line-height: 2.5rem;
		padding: 0.25rem 0.75rem;
	}
	h3 { margin: 0.5rem 0; }
	h3.error {
		background-color: #46393c;
		color: #f52;
	}
	h3.warning {
		background-color: #46493c;
		color: #fb4;
	}
	h3.success {
		background-color: #36493c;
		color: #bf4;
	}
</style>