<script lang="ts">
	import StylePanel from "./StylePanel.svelte";
	let showStyle = true;
</script>

<div class="settings">
	<button on:click={() => showStyle = !showStyle}>
		<span class={showStyle ? "triangle" : "triangle rotated"}>▼</span>
	</button>
	{#if showStyle}
		<StylePanel />
	{/if}
</div>

<style>
	.settings {
		z-index: 2;
		position: absolute;
		top: 3.5rem;
		left: 0.5rem;
		padding: 0.5rem;
		overflow-y: auto;
		max-height: 100vh;
		background-color: transparent;
		border-radius: 0.5rem;
		border: 1px solid #888;
	}
	button {
		all: unset;
		width: 100%;
		border: none;
		display: flex;
		flex-direction: row;
		cursor: pointer;
		transition: all 0.2s;
		border-radius: 0.25rem;
	}
	button:hover {
		color: var(--bright);
	}
	button:focus {
		outline: var(--focus-outline);
	}
	span {
		font-size: 1.5rem;
		transition: all 0.25s;
	}
	span.rotated {
		transform: rotate(-90deg);
	}
</style>
