<script lang="ts">
	import {
		AppSettings,
		Renderer,
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
		if (Frame.value) { Renderer.ViewMatrix = [...GL_IDENTITY]; }
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
	// $effect(() => {
	// 	const { isFolded, hasOrders } = FrameStyle.value;
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
		Renderer.Perspective = (isFolded
			? RenderPerspective.perspective
			: RenderPerspective.orthographic);
		if (isFolded) {
			Renderer.FrameClass = (hasOrders
				? RenderStyle.foldedForm
				: RenderStyle.translucent);
		} else {
			Renderer.FrameClass = (RenderStyle.creasePattern);
		}
	});

	// local storage

	$effect(() => localStorage.setItem("AppScreen", AppSettings.Screen));
	$effect(() => localStorage.setItem("FrontColor", Renderer.FrontColor));
	$effect(() => localStorage.setItem("BackColor", Renderer.BackColor));
	$effect(() => localStorage.setItem("CPColorMode", Renderer.CPColorMode));

	// Screen.subscribe((value) => localStorage.setItem("AppScreen", value));
	// FrontColor.subscribe((value) => localStorage.setItem("FrontColor", value));
	// BackColor.subscribe((value) => localStorage.setItem("BackColor", value));
	// CPColorMode.subscribe((value) => localStorage.setItem("CPColorMode", value));
</script>
