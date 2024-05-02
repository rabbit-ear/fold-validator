<script lang="ts">
	import {
		Fold,
		Frames,
	} from "../../stores/file.ts";
	import {
		ReportIsValid,
		NonSpecKeys,
	} from "../../stores/validate.ts";

	$: hasFrameMetadata = $Frames
		.map(frame => frame.frame_title
			|| frame.frame_author
			|| frame.frame_description
			|| frame.frame_unit
			|| frame.frame_classes
			|| frame.frame_attributes)
		.map(el => el != null)
		.reduce((a, b) => a || b, false);

	$: hasMetadata = $Fold && (
		$Fold.file_spec
		|| $Fold.file_title
		|| $Fold.file_author
		|| $Fold.file_creator
		|| $Fold.file_description
		|| $Fold.file_classes
		|| hasFrameMetadata
		|| $NonSpecKeys.length);
</script>

{#if $Fold && $ReportIsValid && hasMetadata}

	<div>
		{#if $Fold.file_spec}
			<p>FOLD spec version: <span class="value">{$Fold.file_spec}</span></p>
		{/if}

		{#if $Fold.file_title}
			<p>title: <span class="value">{$Fold.file_title}</span></p>
		{/if}

		{#if $Fold.file_author}
			<p>author: <span class="value">{$Fold.file_author}</span></p>
		{/if}

		{#if $Fold.file_creator}
			<p>creator: <span class="value">{$Fold.file_creator}</span></p>
		{/if}

		{#if $Fold.file_description}
			<p>description: <span class="value">{$Fold.file_description}</span></p>
		{/if}

		{#if $Fold.file_classes}
			<p>
				file classes:
				{#each $Fold.file_classes as str}
					<span class="pill">{str}</span>
				{/each}
			</p>
		{/if}

		{#if $Frames.length}
			{#each $Frames as frame, i}
				{#if frame.frame_title
					|| frame.frame_author
					|| frame.frame_description
					|| frame.frame_unit
					|| frame.frame_classes
					|| frame.frame_attributes}
					<p class="italic">Frame {i}</p>

					<ul>
						{#if frame.frame_title}
							<li>title: <span class="value">{frame.frame_title}</span></li>
						{/if}

						{#if frame.frame_author}
							<li>author: <span class="value">{frame.frame_author}</span></li>
						{/if}

						{#if frame.frame_description}
							<li>description: <span class="value">{frame.frame_description}</span></li>
						{/if}

						{#if frame.frame_unit}
							<li>unit: <span class="value">{frame.frame_unit}</span></li>
						{/if}

						{#if frame.frame_classes}
							<li>
								frame classes:
								{#each frame.frame_classes as str}
									<span class="pill">{str}</span>
								{/each}
							</li>
						{/if}

						{#if frame.frame_attributes}
							<li>
								attributes:
								{#each frame.frame_attributes as str}
									<span class="pill">{str}</span>
								{/each}
							</li>
						{/if}
					</ul>
				{/if}

			{/each}
		{/if}

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
	div {
		padding: 1rem;
		margin: 1rem 0;
		border: 2px solid #555;
		border-radius: 0.5rem;
		background-color: #2b2a33;
	}
	p, li {
		line-height: 1.5rem;
		word-break: break-word;
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
	ul {
		padding-left: 1rem;
	}
</style>
