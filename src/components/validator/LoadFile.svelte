<script lang="ts">
	import {
		fileDialogDidUpdate,
	} from "../../general/filemanager.ts";

	let files: FileList|null|undefined = $state();

	$effect(() => fileDialogDidUpdate(files))
</script>

<div>
	<span>Drag and drop a file, or </span>
	<input type="file" bind:files>
</div>

<style>
	div {
		margin: 1rem 0;
	}
</style>
