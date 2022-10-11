<script>
	export let FOLD = {};
	export let selectedFrame = 0;

	import blintzFrames from "../fold/blintz-frames.fold?raw";
	import craneCP from "../fold/crane-cp.fold?raw";
	import craneFolded from "../fold/crane-folded.fold?raw";
	import huffman from "../fold/huffman.fold?raw";
	import mazeFolding from "../fold/maze-folding.fold?raw";
	import polygami from "../fold/polygami.fold?raw";
	import squareTwist from "../fold/square-twist-frames.fold?raw";
	import threeFold from "../fold/three-fold.fold?raw";
	import bird from "../fold/kraft-bird-base-06-mvf.fold?raw";
	import abstract from "../fold/abstract.fold?raw";
	import nestedFrames from "../fold/nested-frames.fold?raw";
	// simple examples
	import simpleWaterbomb from "../fold/simple-waterbomb-3d.fold?raw";
	// bad fold files
	import badEdges from "../fold/bad-edges.fold?raw";
	import badJSON from "../fold/bad-json.fold?raw";
	import noFace3D from "../fold/simple-3d-no-faces.fold?raw";

	const load = (string) => {
		try {
			FOLD = JSON.parse(string);
			selectedFrame = 0;
		}
		catch (error) { window.alert(error); }
	};
</script>

<div class="header">
	<h5>examples (will be removed for deployment)</h5>
	<span>cp:</span>
	<span class="link" on:click={() => load(craneCP)}>crane</span>
	<span class="link" on:click={() => load(bird)}>bird</span>

	<span>3D:</span>
	<span class="link" on:click={() => load(huffman)}>huffman</span>
	<span class="link" on:click={() => load(mazeFolding)}>maze</span>
	<span class="link" on:click={() => load(polygami)}>poly</span>

	<span>flat:</span>
	<span class="link" on:click={() => load(craneFolded)}>crane</span>
	<span class="link" on:click={() => load(threeFold)}>simple</span>

	<span>frames:</span>
	<span class="link" on:click={() => load(blintzFrames)}>blintz</span>
	<span class="link" on:click={() => load(squareTwist)}>twist</span>

	<span>simple:</span>
	<span class="link" on:click={() => load(simpleWaterbomb)}>waterbomb-3D</span>

	<span>other:</span>
	<span class="link" on:click={() => load(abstract)}>abstract</span>
	<span class="link" on:click={() => load(nestedFrames)}>nested-frames</span>
	<span class="link" on:click={() => load(noFace3D)}>no-face-3D</span>

	<span>invalid:</span>
	<span class="link" on:click={() => load(badEdges)}>bad-edges</span>
	<span class="link" on:click={() => load(badJSON)}>bad-json</span>

</div>

<style>
	h5, span {
		margin: 0 0.25rem;
	}
	.link {
		color: #646cff;
	}
	.link:hover {
		color: #535bf2;
	}
	.link {
		cursor: pointer;
	}
	.header {
		width: 100vw;
		min-height: 3rem;
		background-color: #1b1b1b;
		display: flex;
		flex-wrap: wrap;
  		flex-direction: row;
		align-items: center;
		justify-content: start;
		border-bottom: 2px solid #555;

	}
</style>
