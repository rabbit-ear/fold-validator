<script lang="ts">
	import { type FOLD } from "rabbit-ear/types.js";
	import {
		Fold,
		Frames,
	} from "../../stores/file.ts";
	import {
		ReportIsValid,
		NonSpecKeys,
	} from "../../stores/validate.ts";

	const prettyName: {[key: string]: string} = {
		file_spec: "FOLD spec version",
		file_title: "title",
		file_author: "author",
		file_creator: "creator",
		file_description: "description",
		file_classes: "file classes",
		frame_title: "frame title",
		frame_author: "frame author",
		frame_description: "frame description",
		frame_unit: "units",
		frame_classes: "frame classes",
		frame_attributes: "attributes",
	};

	const hasMetadata = (frame: FOLD) => (Object.keys(frame)
		.filter(key => prettyName[key] !== undefined)
		.length > 0);
</script>

{#snippet metaKeyValue({ frame, key }: {key:string,frame:FOLD})}
	{#if frame && (frame as any)[key] != null}
		<p>{prettyName[key]}: <span class="value">{(frame as any)[key]}</span></p>
	{/if}
{/snippet}

{#snippet metaKeyArrayValue({ frame, key }: {key:string,frame:FOLD})}
	{#if frame && (frame as any)[key] != null}
		<p>
			{prettyName[key]}:
			{#each (frame as any)[key] as str}
				<span class="pill">{str}</span>
			{/each}
		</p>
	{/if}
{/snippet}

{#if $Fold && $ReportIsValid && (hasMetadata($Fold) || $NonSpecKeys.length)}
	<div class="container">
		{@render metaKeyValue({ frame: $Fold, key: "file_spec" })}
		{@render metaKeyValue({ frame: $Fold, key: "file_title" })}
		{@render metaKeyValue({ frame: $Fold, key: "file_author" })}
		{@render metaKeyValue({ frame: $Fold, key: "file_creator" })}
		{@render metaKeyValue({ frame: $Fold, key: "file_description" })}
		{@render metaKeyArrayValue({ frame: $Fold, key: "file_classes" })}

		{#each $Frames as frame, i}
			{#if hasMetadata(frame)}
				<p class="italic">Frame {i}</p>
				<div class="indent">
					{@render metaKeyValue({ frame, key: "frame_title" })}
					{@render metaKeyValue({ frame, key: "frame_author" })}
					{@render metaKeyValue({ frame, key: "frame_description" })}
					{@render metaKeyValue({ frame, key: "frame_unit" })}
					{@render metaKeyArrayValue({ frame, key: "frame_classes" })}
					{@render metaKeyArrayValue({ frame, key: "frame_attributes" })}
				</div>
			{/if}
		{/each}

		{#if $NonSpecKeys.length}
			<p>
				out-of-spec keys found
				{#each $NonSpecKeys as key}
					<span class="pill warning">{key}</span>
				{/each}
			</p>
		{/if}

	</div>
{/if}

<style>
	.container {
		padding: 1rem;
		margin: 1rem 0;
		border: 2px solid #555;
		border-radius: 0.5rem;
		background-color: #2b2a33;
	}
	p {
		font-size: 1rem;
		line-height: 1rem;
		word-break: break-word;
	}
	.indent {
		padding-left: 1rem;
	}
	.italic {
		font-style: italic;
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
