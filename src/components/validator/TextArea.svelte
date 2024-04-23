<script lang="ts">
	import { FileString } from "../../stores/file.ts";
	import { validateFOLD } from "../../stores/validate.ts";
</script>

<textarea
	placeholder="&lcub;&rcub;"
	bind:value={$FileString}
></textarea>

<div>
	<button on:click={validateFOLD}>validate</button>
</div>

<style>
	textarea {
		color: #D7D9DA;
		width: 80%;
		height: 15rem;
		resize: vertical;
		font-size: 1rem;
		padding: 1rem;
		box-sizing: border-box;
		border: 2px solid #555;
		border-radius: 0.5rem;
		/*background-color: #f8f8f8;*/
		outline: none;
	}
	div {
		margin: 1rem 0;
	}
	button {
	  border-radius: 8px;
	  border: 1px solid transparent;
	  padding: 0.6em 1.2em;
	  font-size: 1em;
	  font-weight: 500;
	  font-family: inherit;
	  background-color: #1a1a1a;
	  cursor: pointer;
	  transition: border-color 0.25s;
	}
	button:hover {
	  border-color: #646cff;
	}
	button:focus,
	button:focus-visible {
	  outline: 4px auto -webkit-focus-ring-color;
	}
</style>
