export enum RenderPerspective {
	perspective = "perspective",
	orthographic = "orthographic",
};

export enum RenderStyle {
	creasePattern = "creasePattern",
	foldedForm = "foldedForm",
	translucent = "translucent",
};

export enum AppScreen {
	validator = "validator",
	viewer = "viewer",
};

export enum ColorMode {
	dark = "dark",
	light = "light",
};

export type GLCanvasUIEvent = (MouseEvent | TouchEvent) & {
	point?: [number, number],
	vector?: [number, number],
	deltaY?: number,
};
