<script>
	export let FOLD = {};
	import Examples from "./Examples.svelte";
</script>

<div class="header">
	<div class="left">
		<h2>
			<a href="https://github.com/edemaine/FOLD/">FOLD</a>
		</h2>
		<p>
			validator and viewer
		</p>
	</div>
	<div class="right">
		<Examples bind:FOLD={FOLD} />
		<!-- <p>
			dark / light
		</p> -->
	</div>
</div>

<style>
	.header {
		width: 100vw;
		height: 3rem;
		background-color: #1b1b1b;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		border-bottom: 2px solid #555;

	}
	.header > div {
		height: 100%;
	}
	.left {
		margin: 0 1rem;
		gap: 1rem;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: left;
	}
	.right {
		margin: 0 1rem;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: right;
	}
</style>
