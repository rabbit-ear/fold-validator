<script lang="ts">
	import { AppScreen } from "../general/types.ts";
	import { Screen } from "../stores/view.svelte.ts";
</script>

<div class="header">

	<div class="left">
		<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="-0.04 -0.04 1.08 1.08" stroke-width="0.1" stroke-linecap="round">
			<path
				d="M1,0.2C1,0.09 0.91,0 0.8,0L0.2,0C0.09,0 0,0.09 0,0.2L0,0.8C0,0.91 0.09,1 0.2,1L0.8,1C0.91,1 1,0.91 1,0.8L1,0.2Z"
				fill="white"
				stroke="black"
				stroke-width="0.1px" />
			<line
				x1="0.19"
				y1="0.81"
				x2="0.81"
				y2="0.19"
				stroke="#26F"
				stroke-width="0.14"
				stroke-dasharray="0.1 0.29"/>
			<path
				class="arrow-line"
				fill="none"
				stroke-width="0.09"
				stroke="black"
				d="M0.4,0.25C0.709,0.3118,0.8618,0.541,0.8,0.85"/>
			<path
				class="arrow-tail"
				stroke="none"
				fill="black"
				d="M0.1,0.19L0.36,0.4L0.425,0.1Z" />
		</svg>

		<h2>FOLD</h2>
		<p>{$Screen}</p>
	</div>

	<div class="right">
		<p>
		<button
			onclick={() => $Screen = AppScreen.validator}
			data-highlighted={$Screen === AppScreen.validator}
			>validate</button>
		<span>/</span>
		<button
			onclick={() => $Screen = AppScreen.viewer}
			data-highlighted={$Screen === AppScreen.viewer}
			>view</button>
		</p>
	</div>

</div>

<style>
	span {
		margin: 0 0.5rem;
	}
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
