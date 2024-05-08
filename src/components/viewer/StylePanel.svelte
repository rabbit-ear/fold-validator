<script lang="ts">
	import {
		untrack,
	} from "svelte";
	import {
		getStrokeWidth,
	} from "rabbit-ear/convert/general/svg.js";
	import {
		boundingBox,
	} from "rabbit-ear/graph/boundary.js";
	import {
		RenderPerspective,
		RenderStyle,
		ColorMode,
	} from "../../general/types.ts";
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
		CPColorMode,
		ShowFoldedCreases,
		ShowFoldedFaces,
		ShowFoldedFaceOutlines,
		LayerNudge,
	} from "../../stores/view.ts";

	let isFolded = $derived(
		$FrameClass === RenderStyle.foldedForm
		|| $FrameClass === RenderStyle.translucent
	);

	const setFrameClassFolded = () => {
		if ($FrameClass === RenderStyle.creasePattern) {
			$FrameClass = RenderStyle.foldedForm;
		}
	};

	let strokeWidthSlider = $state(5);
	let layerNudgeSlider = $state(6);

	$effect(() => {
		$StrokeWidth = Math.pow(2, strokeWidthSlider) / 1e5;
	});

	$effect(() => {
		$LayerNudge = Math.pow(2, layerNudgeSlider) / 1e6;
	});

	$effect(() => {
		const bounds = boundingBox($Frame);
		const strokeWidthGuess = bounds && bounds.span
			? getStrokeWidth($Frame, Math.max(...bounds.span))
			: getStrokeWidth($Frame);

		//
		let newStrokeWidth: number = 0;
		untrack(() => {
			// invert this: Math.pow(2, strokeWidthSlider) / 1e5;
			strokeWidthSlider = Math.log2(strokeWidthGuess * 1e5);
			newStrokeWidth = Math.pow(2, strokeWidthSlider) / 1e5;
		});
		$StrokeWidth = newStrokeWidth;

		// find a decent spacing between layers (LayerNudge)
		if (bounds && bounds.span) {
			const maxSpan = Math.max(...bounds.span);
			let newLayerNudge: number = 0;
			untrack(() => {
				layerNudgeSlider = Math.log2((maxSpan * 0.001) * 1e5);
				newLayerNudge = Math.pow(2, layerNudgeSlider) / 1e6;
			});
			$LayerNudge = newLayerNudge;
		}
	});
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
			onclick={() => $Perspective = RenderPerspective.orthographic}
			data-highlighted={$Perspective === RenderPerspective.orthographic}
			>2D</button>
		<button
			class="radio"
			onclick={() => $Perspective = RenderPerspective.perspective}
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
			onclick={() => setFrameClassFolded()}
			data-highlighted={isFolded}
			>folded</button>
		<button
			class="radio"
			onclick={() => $FrameClass = RenderStyle.creasePattern}
			data-highlighted={$FrameClass === RenderStyle.creasePattern}
			>CP</button>
	</div>

	{#if $FrameClass === RenderStyle.creasePattern}
		<div class="radio-row">
			<button
				class="radio"
				onclick={() => $CPColorMode = ColorMode.dark}
				data-highlighted={$CPColorMode === ColorMode.dark}
				>dark</button>
			<button
				class="radio"
				onclick={() => $CPColorMode = ColorMode.light}
				data-highlighted={$CPColorMode === ColorMode.light}
				>light</button>
		</div>

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
				onclick={() => $FrameClass = RenderStyle.foldedForm}
				data-highlighted={$FrameClass !== RenderStyle.translucent}
				>solid</button>
			<button
				class="radio"
				onclick={() => $FrameClass = RenderStyle.translucent}
				data-highlighted={$FrameClass === RenderStyle.translucent}
				>clear</button>
		</div>

		<h2>paper color</h2>
		<div class="row">
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
			<button class="swap" onclick={() => [$FrontColor, $BackColor] = [$BackColor, $FrontColor]}>
				<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
					<path d="M17.87,54.839C21.262,55.828 29.583,57.569 37.011,56.599C42.415,55.894 47.313,53.752 50.418,49.723C52.556,46.95 53.953,43.241 53.871,38.234C53.866,37.909 53.867,37.312 53.871,36.523L53.906,31.218L43.296,31.151L43.263,36.455C43.257,37.355 43.257,38.036 43.263,38.407C43.296,40.492 42.723,41.969 42.016,43.246C40.918,45.227 38.163,47.804 35.663,49.082C31.976,50.968 25.214,52.638 21.139,52.969C13.82,53.564 12.778,53.354 12.778,53.354L17.87,54.839Z"/>
					<path d="M29.558,23.098L14.917,46.804L1.054,22.773L29.558,23.098Z"/>
					<path d="M34.182,41.144L48.822,17.438L62.685,41.469L34.182,41.144Z"/>
					<path d="M45.938,9.359C42.546,8.37 34.226,6.629 26.797,7.598C21.393,8.304 16.496,10.446 13.391,14.475C11.252,17.248 9.856,20.957 9.938,25.964C9.942,26.289 9.941,26.886 9.937,27.675L9.903,32.98L20.512,33.047L20.545,27.743C20.552,26.843 20.552,26.162 20.545,25.791C20.512,23.706 21.086,22.229 21.792,20.952C22.89,18.971 25.645,16.394 28.145,15.115C31.832,13.23 38.594,11.56 42.67,11.229C49.989,10.634 51.03,10.844 51.03,10.844L45.938,9.359Z"/>
				</svg>
			</button>
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
	button.swap {
		width: 1.5rem;
		height: 1.5rem;
		margin: 0;
		padding: 2px;
		border-radius: 0.5rem;
		background-color: #fff3;
	}
	button.swap svg {
		fill: var(--bright);
	}
	.row {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.25rem;
	}
</style>
