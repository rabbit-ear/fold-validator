<script lang="ts">
	import {
		FileString,
	} from "../../stores/file.ts";

	let files: FileList;

	const fileDialogDidLoad = (
		string: string|ArrayBuffer|null|undefined,
		filename: string,
		mimeType: string,
	) => {
		if (typeof string === "string") {
			$FileString = string;
		}
	};

	$: if (files) {
		let mimeType: string, filename: string;
		const reader = new FileReader();
		reader.onload = loadEvent => fileDialogDidLoad(loadEvent.target?.result, filename, mimeType);
		if (files.length) {
			mimeType = files[0].type;
			filename = files[0].name;
			reader.readAsText(files[0]);
		}
	}
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
