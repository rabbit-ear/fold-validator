<script lang="ts">
	import { FileString } from "../../stores/file.svelte.ts";
</script>

<textarea
	placeholder="&lcub;&rcub;"
	bind:value={FileString.value}
></textarea>

<style>
	textarea {
		color: #D7D9DA;
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
