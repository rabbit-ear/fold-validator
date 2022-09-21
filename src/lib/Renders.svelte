<script>
	export let FOLD = {};
	export let validation;
	export let isEmpty;
</script>

{#if !isEmpty}
	<div class="row">
		<div class="view"><svg viewBox="0 0 1 1"/></div>
		<div class="view"><svg viewBox="0 0 1 1"/></div>
		<div class="view"><svg viewBox="0 0 1 1"/></div>
	</div>
{/if}

<style>
	.row {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: 1fr;
	}
	.view {
		width: 100%;
		height: 33vw;
		background-color: #1e1e1e;
		/*margin: 1rem;*/
	}
	svg {
		background-color: #333;
		margin: 1rem;
	}
</style>