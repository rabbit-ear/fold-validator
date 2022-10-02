<script>
	export let FOLD = {};
	import blintzFrames from "../fold/blintz-frames.fold?raw";
	import craneCP from "../fold/crane-cp.fold?raw";
	import craneFolded from "../fold/crane-folded.fold?raw";
	import huffman from "../fold/huffman.fold?raw";
	import mazeFolding from "../fold/maze-folding.fold?raw";
	import polygami from "../fold/polygami.fold?raw";
	import squareTwist from "../fold/square-twist-frames.fold?raw";
	import threeFold from "../fold/three-fold.fold?raw";
	import bird from "../fold/kraft-bird-base-06-mvf.fold?raw";

	const load = (string) => { FOLD = JSON.parse(string); };
</script>

<span>cp:</span>
<a href="javascript:void(0)" on:click={() => load(craneCP)}>crane</a>
<a href="javascript:void(0)" on:click={() => load(bird)}>bird</a>

<span>3D:</span>
<a href="javascript:void(0)" on:click={() => load(huffman)}>huffman</a>
<a href="javascript:void(0)" on:click={() => load(mazeFolding)}>maze</a>
<a href="javascript:void(0)" on:click={() => load(polygami)}>poly</a>

<span>flat:</span>
<a href="javascript:void(0)" on:click={() => load(craneFolded)}>crane</a>
<a href="javascript:void(0)" on:click={() => load(threeFold)}>simple</a>

<span>frames:</span>
<a href="javascript:void(0)" on:click={() => load(blintzFrames)}>blintz</a>
<a href="javascript:void(0)" on:click={() => load(squareTwist)}>twist</a>

<style>
	span {
		margin: 0 0.5rem;
	}
	a {
		cursor: pointer;
		margin: 0 0.5rem;
	}
</style>