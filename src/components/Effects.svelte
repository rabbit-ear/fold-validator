<script lang="ts">
	import { FrameCount, FrameNum } from "../stores/file.svelte.ts";

	// FrameCount.subscribe(($FrameCount) => {
	// 	if ($FrameCount === 0) { return; }
	// 	if ($FrameCount <= get(FrameNum)) {
	// 		FrameNum.set($FrameCount - 1);
	// 	}
	// });
	$effect(() => {
		if (FrameCount.value === 0) { return; }
		if (FrameCount.value <= FrameNum.value) {
			FrameNum.value = FrameCount.value - 1;
		}
	});
</script>
