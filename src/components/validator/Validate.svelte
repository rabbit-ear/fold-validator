<script lang="ts">
	import {
		validateFOLD,
	} from "../../stores/validate.ts";
</script>

<button onclick={validateFOLD}>validate</button>

<style>
	button {
	  border-radius: 0.5rem;
	  border: 1px solid transparent;
	  padding: 0.6em 1.2em;
	  font-size: 1em;
	  font-weight: 500;
	  font-family: inherit;
	  background-color: #2650ca;
	  /* background-color: var(--primary); */
	  cursor: pointer;
	  transition: border-color 0.25s;
		margin: 1rem 0;
	}
	button:hover {
	  border-color: #38f;
	}
	button:focus,
	button:focus-visible {
	  outline: 4px auto -webkit-focus-ring-color;
	}
</style>
