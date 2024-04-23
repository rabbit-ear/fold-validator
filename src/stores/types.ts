export enum RenderPerspective {
	perspective = "perspective",
	orthographic = "orthographic",
};

export enum RenderStyle {
	creasePattern = "creasePattern",
	foldedForm = "foldedForm",
	translucent = "translucent",
};

export enum AppMode {
	Validator,
	Viewer,
};

export type GLCanvasUIEvent = (MouseEvent | TouchEvent) & {
	point?: [number, number],
	vector?: [number, number],
	deltaY?: number,
};
