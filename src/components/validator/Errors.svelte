<script lang="ts">
	import {
		Errors,
		IsValid,
		ReportIsValid,
	} from "../../stores/validate.ts";

	const formatFrameNumber = (i:number):string => (i === 0
		? `Frame #0 (top level):`
		: `Frame #${i}`);

	// &cross; {el}
	const formatErrors = (errors: string[][]):string => ($Errors
		.map(array => array.join("\n"))
		.map((string, i) => `${formatFrameNumber(i)}\n${string}`))
		.join("\n");
</script>

{#if $ReportIsValid}
	{#if !$IsValid}
		<div class="result error">&cross; problems found</div>
		<textarea readonly>{formatErrors($Errors)}</textarea>
	{:else}
			<div class="result success">&check; valid</div>
	{/if}
{/if}

<style>
	textarea {
		color: #f52;
		width: 80%;
		height: 15rem;
		resize: vertical;
		font-size: 1rem;
		padding: 1rem;
		border: 2px solid #555;
		border-radius: 0.5rem;
		background-color: #2b2a33;
		outline: none;
	}
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
	/* .warning {
		background-color: #46493c;
		color: #fb4;
	} */
	.success {
		background-color: #36493c;
		color: #bf4;
	}
</style>
