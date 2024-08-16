<script lang="ts">
	import {
		GetIsValid,
		GetReportIsValid,
	} from "../../stores/validate.svelte.ts";
</script>

{#if GetReportIsValid()}
	{#if !GetIsValid()}
		<div class="result error">&cross; problems found</div>
	{:else}
		<div class="result success">&check; valid</div>
	{/if}
{/if}

<style>
	.result {
		font-size: 1.75rem;
		border-radius: 2rem;
		line-height: 2.5rem;
		padding: 0.5rem 1rem;
		margin: 0.5rem;
	}

	.error {
		background-color: #46393c;
		color: #f52;
	}

	.success {
		background-color: #36493c;
		color: #bf4;
	}
</style>
