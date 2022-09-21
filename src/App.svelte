<script>
	import ear from "rabbit-ear";
	import Header from './lib/Header.svelte'
	import LoadFile from './lib/LoadFile.svelte'
	import TextArea from './lib/TextArea.svelte'
	import Summary from './lib/Summary/index.svelte'
	import Renders from './lib/Renders.svelte'
	import Download from './lib/Download.svelte'
	import Footer from './lib/Footer.svelte'

	let FOLD = {};
	let validation;
	$: validation = ear.graph.validate(FOLD);
	let isEmpty;
	$: isEmpty = Object.keys(FOLD).length === 0;
</script>

<main>
	<Header />
	<LoadFile bind:FOLD={FOLD} />
	<TextArea bind:FOLD={FOLD} />
	<Summary {FOLD} {validation} {isEmpty} />
	<Renders {FOLD} {validation} {isEmpty} />
	<Download {FOLD} {isEmpty} />
	<Footer />
</main>

<style>

	main {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

</style>
