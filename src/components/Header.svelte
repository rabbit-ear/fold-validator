<script lang="ts">
	import { AppMode } from "../stores/types.ts";

	export let appMode:AppMode = AppMode.Validator;

	const pressValidate = () => { appMode = AppMode.Validator; };
	const pressView = () => { appMode = AppMode.Viewer; };
</script>

<div class="header">

	<div class="left">
		<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="-0.04 -0.04 1.08 1.08" stroke-width="0.1" stroke-linecap="round">
			<g class="creasePattern" stroke="black" fill="white">
				<polygon points="0,0 1,0 1,1 0,1" class="boundary"/>
				<path d="M0 1L1 0" class="valley" stroke="#26F" stroke-dasharray="0.1 0.15" stroke-dashoffset="0.095"/>
				<path d="M0 0L1 0M1 0L1 1M1 1L0 1M0 1L0 0" class="boundary"/>
			</g>
			<g class="arrow" stroke-width="0.09" stroke="black">
				<path class="arrow-tail" stroke="none" d="M0.1,0.2L0.369,0.4L0.4214,0.1Z" visibility="visible"/>
				<path class="arrow-line" style="fill:none;" d="M0.4,0.25C0.72445,0.29635,0.89635,0.52555,0.85,0.85"/>
			</g>
		</svg>

		<h2>
			FOLD
		</h2>
		<p>
			viewer
		</p>
	</div>

	<div class="right">
		<p>
		<button on:click={pressValidate} data-highlighted={appMode === AppMode.Validator}>validate</button> / <button on:click={pressView} data-highlighted={appMode === AppMode.Viewer}>view</button>
		</p>
	</div>

</div>

<style>
	h2, p {
		color: #ccc;
	}

	svg {
		width: 1.75rem;
		height: 1.75rem;
	}

	.header {
		width: 100%;
		min-height: 3rem;
		background-color: #1b1b1b;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		border-bottom: 2px solid #555;
	}

	.header > div {
		height: 100%;
	}

	.left {
		margin: 0 1rem;
		gap: 1rem;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: left;
	}

	.right {
		margin: 0 1rem;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: right;
	}

	button {
		background-color: transparent;
		color: var(--text);
	}
	button[data-highlighted=true] {
		color: var(--bright);
	}
</style>
