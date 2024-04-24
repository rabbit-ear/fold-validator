<script lang="ts">
	import {
		type FOLD,
	} from "rabbit-ear/types.js";
	import {
		getStrokeWidth,
	} from "rabbit-ear/convert/general/svg.js";
	import {
		boundingBox,
	} from "rabbit-ear/graph/boundary.js";
	import {
		RenderPerspective,
		RenderStyle,
	} from "../../stores/types.ts";
	import {
		Frame,
		FrameNum,
		FrameCount,
	} from "../../stores/file.ts";
	import {
		Perspective,
		FOV,
		FlipCameraZ,
		FrameClass,
		StrokeWidth,
		Opacity,
		FrontColor,
		BackColor,
		ShowFoldedCreases,
		ShowFoldedFaces,
		ShowFoldedFaceOutlines,
		LayerNudge,
	} from "../../stores/view.ts";

	$: isFolded = (
		$FrameClass === RenderStyle.foldedForm
		|| $FrameClass === RenderStyle.translucent
	);

	const setFrameClassFolded = () => {
		if ($FrameClass === RenderStyle.creasePattern) {
			$FrameClass = RenderStyle.foldedForm;
		}
	};

	let strokeWidthSlider = 5;
	$: $StrokeWidth = Math.pow(2, strokeWidthSlider) / 1e5;

	let layerNudgeSlider = 6;
	$: $LayerNudge = Math.pow(2, layerNudgeSlider) / 1e6;

	const updateSliders = (graph: FOLD) => {
		const bounds = boundingBox(graph);
		const strokeWidthGuess = bounds && bounds.span
			? getStrokeWidth(graph, Math.max(...bounds.span))
			: getStrokeWidth(graph);
		// invert this: Math.pow(2, strokeWidthSlider) / 1e5;
		strokeWidthSlider = Math.log2(strokeWidthGuess * 1e5);
		$StrokeWidth = Math.pow(2, strokeWidthSlider) / 1e5;
		// find a decent spacing between layers (LayerNudge)
		if (bounds && bounds.span) {
			const maxSpan = Math.max(...bounds.span);
			layerNudgeSlider = Math.log2((maxSpan * 0.001) * 1e5);
			$LayerNudge = Math.pow(2, layerNudgeSlider) / 1e6;
		}
	};

	$: updateSliders($Frame);
</script>

<div class="container">

	{#if $FrameCount > 1}
		<h2>frame: <span class="value">{$FrameNum+1}/{$FrameCount}</span></h2>
		<input
			type="range"
			min=0
			max={$FrameCount - 1}
			step=1
			bind:value={$FrameNum}/>
	{/if}

	<h2>viewport</h2>

	<div class="radio-row">
		<button
			class="radio"
			on:click={() => $Perspective = RenderPerspective.orthographic}
			data-highlighted={$Perspective === RenderPerspective.orthographic}
			>2D</button>
		<button
			class="radio"
			on:click={() => $Perspective = RenderPerspective.perspective}
			data-highlighted={$Perspective === RenderPerspective.perspective}
			>3D</button>
	</div>

	<!-- {#if $Perspective === RenderPerspective.perspective}
		<span>field of view:</span>
		<input type="text" placeholder="field of view" bind:value={$FOV}>
		<br/>
	{/if} -->

	<!-- <input id="checkbox-flip-over" type="checkbox" bind:checked={$FlipCameraZ} />
	<label for="checkbox-flip-over">flip over</label> -->

	<h2>style</h2>
	<div class="radio-row">
		<button
			class="radio"
			on:click={() => setFrameClassFolded()}
			data-highlighted={isFolded}
			>folded</button>
		<button
			class="radio"
			on:click={() => $FrameClass = RenderStyle.creasePattern}
			data-highlighted={$FrameClass === RenderStyle.creasePattern}
			>CP</button>
	</div>

	{#if $FrameClass === RenderStyle.creasePattern}
		<h2>stroke width</h2>
		<input
			type="range"
			min="1"
			max="20"
			step="0.01"
			bind:value={strokeWidthSlider} />
	{/if}

	{#if isFolded}
		<div class="radio-row">
			<button
				class="radio"
				on:click={() => $FrameClass = RenderStyle.foldedForm}
				data-highlighted={$FrameClass !== RenderStyle.translucent}
				>solid</button>
			<button
				class="radio"
				on:click={() => $FrameClass = RenderStyle.translucent}
				data-highlighted={$FrameClass === RenderStyle.translucent}
				>clear</button>
		</div>

		<h2>paper color</h2>
		<div>
			<input
				type="color"
				id="color-paper-front"
				title="paper-front"
				bind:value={$FrontColor} />
			<input
				type="color"
				id="color-paper-back"
				title="paper-back"
				bind:value={$BackColor} />
		</div>

		<!--
		<span>opacity</span><input
			type="range"
			min="0"
			max="1"
			step="0.01"
			bind:value={$opacity} />
		-->
	{/if}

	{#if isFolded}
		<div>
			<input
				type="checkbox"
				id="checkbox-show-folded-faces"
				bind:checked={$ShowFoldedFaces} />
			<label for="checkbox-show-folded-faces">faces</label>
		</div>
		<div>
			<input
				type="checkbox"
				id="checkbox-show-folded-faces-outlines"
				bind:checked={$ShowFoldedFaceOutlines}
				disabled={!$ShowFoldedFaces} />
			<label for="checkbox-show-folded-faces-outlines">face outlines</label>
		</div>
		<div>
			<input
				type="checkbox"
				id="show-folded-creases"
				bind:checked={$ShowFoldedCreases} />
			<label for="show-folded-creases">creases</label>
		</div>

		<h2>stroke</h2>
		<input
			type="range"
			min="1"
			max="20"
			step="0.01"
			id="slider-stroke-width"
			bind:value={strokeWidthSlider}
			disabled={!$ShowFoldedCreases} />
	{/if}

	{#if isFolded
		&& $Frame !== undefined
		&& ($Frame.faceOrders || $Frame.faces_layer)}
		<h2>layers</h2>
		<div>
			<input
				type="range"
				min="1"
				max="20"
				step="0.01"
				id="slider-layer-nudge"
				bind:value={layerNudgeSlider} />
		</div>
		<div>
			<input
				type="text"
				class="long-input"
				bind:value={$LayerNudge} />
		</div>
	{/if}
</div>

<style>
	h2 {
		font-size: 1.2rem;
	}
	input[type=text] {
		width: 4rem;
	}
	input[type=text].long-input {
		width: 10rem;
	}
</style>
