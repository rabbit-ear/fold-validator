import {
  AppScreen,
  ColorMode,
  RenderStyle,
  RenderPerspective,
} from "../general/types.ts";

// this "identity" matrix is for the ViewMatrix and positions the camera
// in the negative z axis looking directly at the model.
// This works for both perspective and orthographic.
const GL_IDENTITY = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -1.85, 1];

// local storage default values
const DefaultAppScreen =
  AppScreen[localStorage.getItem("AppScreen") as keyof typeof AppScreen];
const DefaultFrontColor = localStorage.getItem("FrontColor");
const DefaultBackColor = localStorage.getItem("BackColor");
const DefaultCPColorMode =
  ColorMode[localStorage.getItem("CPColorMode") as keyof typeof ColorMode];

export const AppSettings = $state({
  // which screen are we looking at
  Screen: DefaultAppScreen || AppScreen.validator,
  // darkmode or lightmode
  ColorMode: "dark",
});

export const Renderer = $state({
  // the camera's perspective: "orthographic" or "perspective"
  Perspective: RenderPerspective.orthographic,
  // the camera's field of view
  FOV: 30,
  // flip the camera around so that we are
  // looking at the model from directly behind
  FlipCameraZ: false,
  // the rendering style: "foldedForm" or "creasePattern"
  FrameClass: RenderStyle.creasePattern,
  // stroke width of the crease edges
  StrokeWidth: 0.0025,
  // opacity of the 3D model
  Opacity: 1.0,
  // the colors of the origami model
  FrontColor: DefaultFrontColor || "#1177FF",
  BackColor: DefaultBackColor || "#ffffff",
  CPColorMode: DefaultCPColorMode || ColorMode.dark,
  // show/hide things
  ShowFoldedCreases: false,
  ShowFoldedFaces: true,
  ShowFoldedFaceOutlines: true,
  // if a 3D model comes with faceOrders, this is
  // the amount of space between overlapping faces
  LayerNudge: 1e-6,
  ViewMatrix: [...GL_IDENTITY],
});
