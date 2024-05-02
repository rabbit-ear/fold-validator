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

{#if $ReportIsValid && !$IsValid}
	<textarea readonly>{formatErrors($Errors)}</textarea>
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
</style>
