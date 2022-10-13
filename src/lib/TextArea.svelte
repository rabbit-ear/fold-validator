<script>
	export let FOLD = {};
	export let selectedFrame = 0;
	let textArea;

	const loadFOLD = (string) => {
		try {
			FOLD = JSON.parse(string);
			selectedFrame = 0;
		}
		catch (error) { window.alert(error); }
	};

	let isHovering = false;

	// function dragStart(event, stackIndex, itemIndex) {
	// 	console.log("dragStart", event, stackIndex, itemIndex);
	// 	const data = {stackIndex, itemIndex};
	// 	event.dataTransfer.setData('text/plain', JSON.stringify(data));
	// }

	function drop(event) {
		isHovering = false;
		event.preventDefault();
		if (event.dataTransfer.items) {
			const item = event.dataTransfer.items[0];
			if (item && item.kind === "file") {
				const file = item.getAsFile();
				const reader = new FileReader();
				reader.onload = loadEvent => loadFOLD(loadEvent.target.result);
				reader.readAsText(file);
			}
		}
		// else {
		// 	// Use DataTransfer interface to access the file(s)
		// 	[...event.dataTransfer.files].forEach((file, i) => {
		// 		console.log(`… 2.0 file[${i}].name = ${file.name}`);
		// 	});
		// }
	}
</script>

<textarea
	class={isHovering ? "dragging" : ""}
	placeholder="&lcub;&rcub;"
	ondragover="return false"
	bind:this={textArea}
	on:dragenter={() => isHovering = true}
	on:dragleave={() => isHovering = false}
	on:drop={event => drop(event)}
>{JSON.stringify(FOLD)}
</textarea>

<div>
	<button on:click={() => loadFOLD(textArea.value)}>process</button>
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
	textarea.dragging {
		border: 2px solid #fb4;
	}
	div {
		margin: 1rem 0;
	}
</style>
