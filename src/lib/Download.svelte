<script>
	export let FOLD = {};
	export let isEmpty;
</script>

{#if !isEmpty}
	<div>
		<p class="disabled-text">
			download the modified FOLD file
		</p>
		<div class="button-row">
			<button disabled>download</button>
		</div>
	</div>
{/if}

<style>
	div {
		margin: 1rem 0;
	}
	.button-row {
		display: flex;
		justify-content: center;
	}
	.disabled-text {
		color: #555;
	}
</style>
