<script lang="ts">
	import {
		onMount,
		onDestroy,
	} from "svelte";
	import {
		FileString,
	} from "../stores/file.ts";

	const loadFiles = (event: DragEvent) => {
		// drag and drop file event is weird.
		// have to cache the filename here
		// because it's not contained in the event object
		// that gets passed into the async function fileOnLoad
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

	const dragenter = (e: DragEvent) => { isHovering = true; e.preventDefault(); };
	const dragleave = (e: DragEvent) => { isHovering = false; e.preventDefault(); };
	const dragover = (e: DragEvent) => { isHovering = true; e.preventDefault(); };
	const drop = (event: DragEvent) => {
		isHovering = false;
		event.preventDefault();
		event.stopPropagation();
		loadFiles(event);
	}

	onMount(() => {
		document.body.addEventListener("dragenter", dragenter, false);
		document.body.addEventListener("dragleave", dragleave, false);
		document.body.addEventListener("dragover", dragover, false);
		document.body.addEventListener("drop", drop, false);
	});

	onDestroy(() => {
		document.body.removeEventListener("dragenter", dragenter, false);
		document.body.removeEventListener("dragleave", dragleave, false);
		document.body.removeEventListener("dragover", dragover, false);
		document.body.removeEventListener("drop", drop, false);
	});
</script>

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
		background-color: transparent;
		border: 3px solid transparent;
    border-radius: 0.25rem;
    transition: all 0.15s;
	}
	.hovering {
		background-color: #fb41;
    border-color: #fb4;
	}
</style>
