<script lang="ts">
	import {
		FileString,
	} from "../stores/file.ts";

	const loadFiles = (event: DragEvent) => {
		// drag and drop file event object does not contain
		// the filename, we have to store it here and re-match later.
		let filename = "";

		const fileOnLoad = (event: ProgressEvent<FileReader>) => {
			if (event.target
				&& event.target.result
				&& typeof event.target.result === "string") {
				$FileString = event.target.result;
			}
		};

		if (event.dataTransfer && event.dataTransfer.items) {
			const filenames = [...event.dataTransfer.files]
				.map(el => el.name);
			const transferFile = [...event.dataTransfer.items]
				.map((item, i) => ({ item, filename: filenames[i] }))
				.filter(el => el.item.kind === "file")
				.map(el => ({ ...el, contents: el.item.getAsFile() }))
				.shift();
			if (transferFile) {
				const reader = new FileReader();
				reader.onload = fileOnLoad;
				filename = transferFile.filename;
				if (transferFile.contents) {
					reader.readAsText(transferFile.contents);
				}
				return reader;
			}
		}
	};

	let isHovering = false;

	const dragenter = (e: DragEvent) => {
		e.preventDefault();
		isHovering = true;
	};

	const dragleave = (e: DragEvent) => {
		e.preventDefault();
		isHovering = false;
	};

	const dragover = (e: DragEvent) => {
		e.preventDefault();
		isHovering = true;
	};

	const drop = (event: DragEvent) => {
		event.preventDefault();
		event.stopPropagation();
		isHovering = false;
		loadFiles(event);
	};
</script>

<svelte:body
	on:dragenter={dragenter}
	on:dragleave={dragleave}
	on:dragover={dragover}
	on:drop={drop}
	/>

<div class={isHovering ? "hovering" : ""} />
<!-- {#if isHovering}<div class="hovering" />{/if} -->

<style>
	div {
		width: 100vw;
		height: 100%;
		min-height: 100vh;
		pointer-events: none;
		position: absolute;
		top: 0;
		left: 0;
		margin: 0;
		padding: 0;
		outline: none;
		border: 3px solid transparent;
		background-color: transparent;
    border-radius: 0.25rem;
    transition: all 0.15s;
	}

	.hovering {
		background-color: #fb41;
    border-color: #fb4;
	}
</style>
