<script>
	import {
		findSpecGeometryKeys,
		findSpecOrderKeys,
		findNonSpecKeys,
	} from "../graph/misc";
	export let FOLD = {};
	export let frames = [];
	export let selectedFrame = 0;
	let frame = {};
	$: frame = frames[selectedFrame];
	let nonSpecKeys = [];
	$: nonSpecKeys = findNonSpecKeys(frames[selectedFrame]);
	let geometryKeys = [];
	$: geometryKeys = findSpecGeometryKeys(frames[selectedFrame]);
	let orderKeys = [];
	$: orderKeys = findSpecOrderKeys(frames[selectedFrame]);
</script>

{#if FOLD.file_spec}
	<p>FOLD spec version: <span class="value">{FOLD.file_spec}</span></p>
{/if}

{#if FOLD.file_title}
	<p>title: <span class="value">{FOLD.file_title}</span></p>
{/if}

{#if FOLD.file_author}
	<p>author: <span class="value">{FOLD.file_author}</span></p>
{/if}

{#if FOLD.file_creator}
	<p>creator: <span class="value">{FOLD.file_creator}</span></p>
{/if}

{#if FOLD.file_description}
	<p>description: <span class="value">{FOLD.file_description}</span></p>
{/if}

{#if FOLD.file_classes}
	<p>
		file classes:
		{#each FOLD.file_classes as str}
			<span class="pill">{str}</span>
		{/each}
	</p>
{/if}

<!-- <hr /> -->

<!--
{#if FOLD.file_frames}
	<p>frames: <span class="value">{FOLD.file_frames.length}</span></p>
{/if}
 -->

{#if frame.frame_title}
	<p>title: <span class="value">{frame.frame_title}</span></p>
{/if}

{#if frame.frame_author}
	<p>author: <span class="value">{frame.frame_author}</span></p>
{/if}

{#if frame.frame_description}
	<p>description: <span class="value">{frame.frame_description}</span></p>
{/if}

{#if frame.frame_unit}
	<p>unit: <span class="value">{frame.frame_unit}</span></p>
{/if}

{#if frame.frame_classes}
	<p>
		frame classes:
		{#each frame.frame_classes as str}
			<span class="pill">{str}</span>
		{/each}
	</p>
{/if}

{#if frame.frame_attributes}
	<p>
		attributes:
		{#each frame.frame_attributes as str}
			<span class="pill">{str}</span>
		{/each}
	</p>
{/if}

{#if frames.length > 1}
	<p>
		frame: <span class="value">{selectedFrame+1}/{frames.length}</span>
	</p>
	<div>
		<input type="range" min={0} max={frames.length - 1} step="1" bind:value={selectedFrame}/>
	</div>
{/if}

<!-- 
{#if geometryKeys.length}
	<p>
		geometry:
		{#each geometryKeys as key}
			<span class="pill">{key}</span>
		{/each}
	</p>
{/if}
 -->
<!-- 
{#if orderKeys.length}
	<p>
		orders:
		{#each orderKeys as key}
			<span class="pill">{key}</span>
		{/each}
	</p>
{/if}
 -->
{#if nonSpecKeys.length}
	<p>
		non-spec keys:
		{#each nonSpecKeys as key}
			<span class="pill warning">{key}</span>
		{/each}
	</p>
{/if}
<!-- 
		keys included
		keys excluded
		non spec keys
 -->

<style>
	p {
		line-height: 1.5rem;
		word-break: break-word;
	}
	.value {
		font-weight: bold;
		color: #ccc;
	}
	.pill {
		font-weight: bold;
		background-color: #36393c;
		color: #ccc;
		border-radius: 0.75rem;
		padding: 0 0.5rem;
	}
	.warning {
		background-color: #46493c;
		color: #fb4;
	}
</style>