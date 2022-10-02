<script>
	import ear from "rabbit-ear";
	import WebGL from "../WebGLView/WebGLView.svelte";
	
	export let frame = {};
	export let frameInfo;

	const renderOptions = {
		viewBox: true,
		strokeWidth: true,
		vertices: false,
		padding: 0.04,
	};

	// const updateViews = (graph) => {
	// 	if (frameInfo.isEmpty) { return; }
	// 	const row = document.querySelector(".row");
	// 	if (!row) { return; }
	// 	for (let i = row.childNodes.length - 1; i >= 0; i -= 1) {
	// 		if (row.childNodes[i].nodeName === "svg") {
	// 			row.removeChild(row.childNodes[i]);
	// 		}
	// 	}
	// 	// while (row.childNodes.length) { row.removeChild(row.childNodes[0]); }
	// 	ear.svg(row)
	// 		.setClass("creasePattern")
	// 		.origami(graph, renderOptions)
	// 	ear.svg(row)
	// 		.setClass("foldedForm")
	// 		.origami(graph, renderOptions);
	// };
	// $: updateViews(FOLD);

	const formatViewClass = (viewClass) => {
		switch (viewClass) {
			case "foldedForm": return "folded form";
			case "creasePattern": return "crease pattern";
			default: return "";
		}
	}

</script>

{#if frameInfo.viewClass !== undefined}
	<div class="row webgl">
		<WebGL
			origami={frame}
			perspective={frameInfo.viewClass === "foldedForm"
				? "perspective"
				: "orthographic"}
			viewClass={frameInfo.viewClass}
			strokeWidth={frameInfo.vmin/200} />
	</div>
	<div class="row">
		<p>{formatViewClass(frameInfo.viewClass)}</p>
	</div>
{/if}

<style>
	.row.webgl { height: 33vw; }
	.row {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
	}
	.row > p {
		margin: 1rem 0;
		text-align: center;
		font-style: italic;
	}
	/*.row > * {
		width: 33vw;
		height: 33vw;
		background-color: #1e1e1e;
	}*/
	svg {
		margin: 1rem;
	}
	/*svg .boundaries { fill: none; }*/
</style>