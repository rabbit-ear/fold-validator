<script lang="ts">
	import LoadFile from "./LoadFile.svelte";
	import TextArea from "./TextArea.svelte";
	import Report from "./Report.svelte";
	import Metadata from "./Metadata.svelte";
	// import Validity from "./Validity.svelte";
	import Errors from "./Errors.svelte";
	// import Analysis from "./Analysis.svelte";
	// import Renders from "./Renders.svelte";
	// import Download from "./Download.svelte";
	import Footer from "./Footer.svelte";
	import { ReportIsValid } from "../../stores/validate.ts";
</script>

<LoadFile />
<TextArea />
<Metadata />
{#if $ReportIsValid}
	<Report />
	<Errors />
{/if}

<Footer />
