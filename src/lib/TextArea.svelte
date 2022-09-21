<script>
	export let FOLD = {};
	export let processFOLD = (el) => {
		const string = document.querySelector(".fold-textarea").value;
		try {
			FOLD = JSON.parse(string);
		} catch (err) {
			console.error(err);
		}
	};
</script>

<textarea class="fold-textarea" placeholder="&lcub;&rcub;">{JSON.stringify(FOLD)}</textarea>

<div>
	<button on:click={processFOLD}>process</button>
</div>

<style>
	textarea {
		width: 80%;
		height: 15rem;
		resize: vertical;
		font-size: 1rem;
		padding: 1rem;
		box-sizing: border-box;
		border: 2px solid #888;
		border-radius: 0.5rem;
		/*background-color: #f8f8f8;*/
		outline: none;
	}
	div {
		margin: 1rem 0;
	}
</style>
