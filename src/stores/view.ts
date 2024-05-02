import {
	writable,
} from "svelte/store";
import {
	AppScreen,
	ColorMode,
	RenderStyle,
	RenderPerspective,
} from "../general/types.ts";
import {
	Frame,
	FrameStyle,
} from "./file.ts";

// local storage default values
const DefaultAppScreen = AppScreen[
	localStorage.getItem("AppScreen") as keyof typeof AppScreen
];
const DefaultFrontColor = localStorage.getItem("FrontColor");
const DefaultBackColor = localStorage.getItem("BackColor");
const DefaultCPColorMode = ColorMode[
	localStorage.getItem("CPColorMode") as keyof typeof ColorMode
];

// which screen are we looking at
export const Screen = writable<AppScreen>(DefaultAppScreen || AppScreen.validator);

// darkmode or lightmode
export const AppColorMode = writable("dark");

// the camera's perspective: "orthographic" or "perspective"
export const Perspective = writable(RenderPerspective.orthographic);

// the camera's field of view
export const FOV = writable(30);

// flip the camera around so that we are
// looking at the model from directly behind
export const FlipCameraZ = writable(false);

// the rendering style: "foldedForm" or "creasePattern"
export const FrameClass = writable(RenderStyle.creasePattern);

// stroke width of the crease edges
export const StrokeWidth = writable(0.0025);

// opacity of the 3D model
export const Opacity = writable(1.0);

// the colors of the origami model
export const FrontColor = writable<string>(DefaultFrontColor || "#1177FF");
export const BackColor = writable<string>(DefaultBackColor || "#ffffff");
export const CPColorMode = writable<string>(DefaultCPColorMode || ColorMode.dark);

// show/hide things
export const ShowFoldedCreases = writable(false);
export const ShowFoldedFaces = writable(true);
export const ShowFoldedFaceOutlines = writable(true);

// if a 3D model comes with faceOrders, this is
// the amount of space between overlapping faces
export const LayerNudge = writable(1e-6);

// this "identity" matrix is for the ViewMatrix and positions the camera
// in the negative z axis looking directly at the model.
// This works for both perspective and orthographic.
const GL_IDENTITY = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -1.85, 1];

export const ViewMatrix = writable([...GL_IDENTITY]);

Frame.subscribe((_) => {
	ViewMatrix.set([...GL_IDENTITY]);
});

Perspective.subscribe((_) => {
	ViewMatrix.set([...GL_IDENTITY]);
});

FrameStyle.subscribe(({ isFolded, hasOrders }) => {
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

// local storage

Screen.subscribe(value => localStorage.setItem("AppScreen", value));
FrontColor.subscribe(value => localStorage.setItem("FrontColor", value));
BackColor.subscribe(value => localStorage.setItem("BackColor", value));
CPColorMode.subscribe(value => localStorage.setItem("CPColorMode", value));
