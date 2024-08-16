<script lang="ts">
	import {
		Perspective,
		FrameClass,
		ViewMatrix,
	} from "../../stores/view.svelte.js";
	import {
		Frame,
		FrameStyle,
	} from "../../stores/file.svelte.js";
	import {
		RenderPerspective,
		RenderStyle,
	} from "../../general/types.js";

	const GL_IDENTITY = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -1.85, 1];

	// Frame.subscribe((_) => {
	// 	ViewMatrix.set([...GL_IDENTITY]);
	// });
	$effect(() => {
		if (Frame.value) { ViewMatrix.set([...GL_IDENTITY]); }
	});

	// FrameStyle.subscribe(({ isFolded, hasOrders }) => {
	// 	Perspective.set(isFolded
	// 		? RenderPerspective.perspective
	// 		: RenderPerspective.orthographic);
	// 	if (isFolded) {
	// 		FrameClass.set(hasOrders
	// 			? RenderStyle.foldedForm
	// 			: RenderStyle.translucent);
	// 	} else {
	// 		FrameClass.set(RenderStyle.creasePattern);
	// 	}
	// });
	$effect(() => {
		const { isFolded, hasOrders } = FrameStyle.value;
		Perspective.set(isFolded
			? RenderPerspective.perspective
			: RenderPerspective.orthographic);
		if (isFolded) {
			FrameClass.set(hasOrders
				? RenderStyle.foldedForm
				: RenderStyle.translucent);
		} else {
			FrameClass.set(RenderStyle.creasePattern);
		}
	});
</script>
