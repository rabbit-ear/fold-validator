<script>
	import ear from "rabbit-ear";
	import Header from "./lib/Header.svelte";
	import LoadFile from "./lib/LoadFile.svelte";
	import TextArea from "./lib/TextArea.svelte";
	import Result from "./lib/Result.svelte";
	import Errors from "./lib/Errors.svelte";
	import Metadata from "./lib/Metadata.svelte";
	import Analysis from "./lib/Analysis.svelte";
	import Renders from "./lib/Renders.svelte";
	import Download from "./lib/Download.svelte";
	import Footer from "./lib/Footer.svelte";

	import inspectFile from "./graph/inspectFile.js";
	import inspectFrame from "./graph/inspectFrame.js";
	import validate from "./graph/validate.js"

	const getFileFrames = (foldFile) => !foldFile.file_frames
		? [ear.graph.flattenFrame(foldFile, 0)]
		: Array.from(Array(foldFile.file_frames.length + 1))
			.map((_, i) => ear.graph.flattenFrame(foldFile, i));

	let FOLD = {};
	let frames = [];
	let frame = {};
	let selectedFrame = 0;
	let fileInfo = {};
	let framesInfo = [];
	let validation = {};
	let isEmpty = true;

	$: isEmpty = Object.keys(FOLD).length === 0;
	$: frames = getFileFrames(FOLD);
	$: fileInfo = inspectFile(FOLD);
	$: framesInfo = frames.map(frame => inspectFrame(frame));
	$: validation = validate(FOLD, fileInfo, framesInfo);
</script>

<main>
	<Header />
	<LoadFile bind:FOLD={FOLD} />
	<TextArea bind:FOLD={FOLD} />
	<!-- <Result {FOLD} {framesInfo} /> -->
	{#if false}
		<Download />
	{/if}
	{#if !isEmpty}
		<Errors {validation} />
		<div class="left">
			<Metadata {FOLD} {frames} bind:selectedFrame={selectedFrame} />
		</div>
		<Renders
			frame={frames[selectedFrame]}
			frameInfo={framesInfo[selectedFrame]}
		/>
		<Analysis {fileInfo} frameInfo={framesInfo[selectedFrame]} />
	{/if}
	<Footer />
</main>

<style>
	.left {
		text-align: left;
	}
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
