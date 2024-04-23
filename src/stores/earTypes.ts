// moving these types here immensely reduces the build size.
// most likely, by accessing a { type } from "rabbit-ear", because
// "rabbit-ear" is not followed by a /path, these types lie in the
// top level export, pulling the entirely library.
// so, is there a way to place Rabbit Ear types in a path somewhere,
// and not at the top level?
type FOLDFrame = {
    frame_author?: string;
    frame_title?: string;
    frame_description?: string;
    frame_classes?: string[];
    frame_attributes?: string[];
    frame_unit?: string;
    vertices_coords?: [number, number][] | [number, number, number][];
    vertices_vertices?: number[][];
    vertices_edges?: number[][];
    vertices_faces?: (number | null | undefined)[][];
    edges_vertices?: [number, number][];
    edges_faces?: (number | null | undefined)[][];
    edges_assignment?: string[];
    edges_foldAngle?: number[];
    edges_length?: number[];
    faces_vertices?: number[][];
    faces_edges?: number[][];
    faces_faces?: (number | null | undefined)[][];
    faceOrders?: [number, number, number][];
    edgeOrders?: [number, number, number][];
};
type FOLDInternalFrame = FOLDFrame & {
    frame_parent?: number;
    frame_inherit?: boolean;
};
type FOLDFileMetadata = {
    file_frames?: FOLDInternalFrame[];
    file_spec?: number;
    file_creator?: string;
    file_author?: string;
    file_title?: string;
    file_description?: string;
    file_classes?: string[];
};
export type FOLD = FOLDFileMetadata & FOLDFrame;
type WebGLVertexArray = {
    location: number;
    buffer: WebGLBuffer;
    type: number;
    length: number;
    data: Float32Array;
};
type WebGLElementArray = {
    mode: number;
    buffer: WebGLBuffer;
    data: Uint16Array | Uint32Array;
};
type WebGLUniform = {
    func: string;
    value: any;
};
export type WebGLModel = {
    program: WebGLProgram;
    vertexArrays: WebGLVertexArray[];
    elementArrays: WebGLElementArray[];
    flags: number[];
    makeUniforms: (gl: WebGLRenderingContext | WebGL2RenderingContext, options: object) => ({
        [key: string]: WebGLUniform;
    });
};
