<script>
	let files;
	export let FOLD = {};
	export let selectedFrame;

	const fileDialogDidLoad = (string, filename, mimeType) => {
		try {
			FOLD = JSON.parse(string);
			selectedFrame = 0;
		}
		catch (error) { window.alert(error); }
	};

	$: if (files) {
		const file = files[0];
		let mimeType, filename;
		const reader = new FileReader();
		reader.onload = loadEvent => fileDialogDidLoad(loadEvent.target.result, filename, mimeType);
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

<!-- {#if files && files[0]}
	<p>
		{files[0].name}
	</p>
{/if}
 -->
<style>
	div {
		margin: 1rem 0;
	}
</style>