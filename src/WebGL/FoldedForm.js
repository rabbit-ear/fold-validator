import ear from "rabbit-ear";
import vertexShaderV1 from "./shaders-webgl1/3d-model-100.vert?raw";
import fragmentShaderV1 from "./shaders-webgl1/3d-model-100.frag?raw";
import vertexShaderV2 from "./shaders-webgl2/3d-model-300.vert?raw";
import fragmentShaderV2 from "./shaders-webgl2/3d-model-300.frag?raw";

const triangulate = (indices) => Array.from(Array(indices.length - 2))
	.map((_, i) => [indices[0], indices[i + 1], indices[i + 2]]);

//   0 = 0
//   1 = 1
//  0  = 0
//  1  = 2
// 0   = 0
// 1   = 4
const triangulateConvexFacesVertices = ({ faces_vertices }) => {
	return {
		faces_vertices: faces_vertices
			.flatMap(vertices => (vertices.length < 4
				? [vertices]
				: triangulate(vertices))),
		// raw_edge: faces_vertices
		// 	.flatMap(vertices => (vertices.length < 4
		// 		? [7]
		// 		: Array.from(Array(vertices.length - 2)).map((_, i) => {
		// 			if (i === 0) { return 3; }
		// 			if (i === vertices.length - 2 - 1) { return 6; }
		// 			return 2;
		// 		}))),
		raw_edge: faces_vertices
			.flatMap(vertices => (vertices.length < 4
				? [[true, true, true]]
				: Array.from(Array(vertices.length - 2)).map((_, i) => {
					if (i === 0) { return [true, true, false]; }
					if (i === vertices.length - 2 - 1) { return [false, true, true]; }
					return [false, true, false];
				}))),
			map: faces_vertices.flatMap((vertices, f) => (vertices.length < 4
				? [f]
				: Array.from(Array(vertices.length - 2)).map(() => f))),
	};
};

// add two 3D vectors, store result in first parameter
const add3 = (a, b) => { a[0] += b[0]; a[1] += b[1]; a[2] += b[2]; };

const makeFacesNormal = (graph) => graph.faces_vertices.map(fv => {
	const p0 = graph.vertices_coords[fv[0]];
	const p1 = graph.vertices_coords[fv[1]];
	const p2 = graph.vertices_coords[fv[2]];
	const vec1 = ear.math.resize(3, ear.math.subtract(p1, p0));
	const vec2 = ear.math.resize(3, ear.math.subtract(p2, p0));
	return ear.math.normalize3(ear.math.cross3(vec1, vec2));
});
/**
 * get one point from each face
 */
const makeFacesPoint = (graph) => graph.faces_vertices
	.map(fv => graph.vertices_coords[fv[0]]);

const prepare = ({ vertices_coords, faces_vertices, faces_layer }) => {
	if (!vertices_coords || !faces_vertices) { return; }
	const triangulated = triangulateConvexFacesVertices({ vertices_coords, faces_vertices });
	faces_vertices = triangulated.faces_vertices;
	triangulated.invertedMap = ear.graph.invertMap(triangulated.map);
	// const polygons = graph.faces_vertices
	// 	.map(fv => fv.map(v => graph.vertices_coords[v]));
	const normals = makeFacesNormal({ vertices_coords, faces_vertices });
	const points = makeFacesPoint({ vertices_coords, faces_vertices });
	const exploded = ear.graph.explodeFaces({ vertices_coords, faces_vertices });
	const vertices_face = faces_vertices.flatMap((verts, f) => verts.map(() => f));
	exploded.faces_rawEdge = triangulated.raw_edge;
	// console.log("map", triangulated.invertedMap);
	// console.log("points", points);
	// console.log("exploded", exploded);
	// console.log("vertices_face", vertices_face);
	if (faces_layer) {
		const layers_face = ear.graph.invertMap(faces_layer);
		// console.log("layers_face", layers_face);
		layers_face.forEach((face, layer) => {
			const faces = triangulated.invertedMap[face].constructor === Array
				? triangulated.invertedMap[face]
				: [triangulated.invertedMap[face]];
			faces.forEach(f => {
				exploded.faces_vertices[f].forEach(v => {
					if (exploded.vertices_coords[v][2] === undefined) {
						exploded.vertices_coords[v][2] = 0;
					}
				});
				exploded.faces_vertices[f].forEach(v => {
					exploded.vertices_coords[v][2] += 1e-5 * layer;
				});
			});
		});
	}
	return exploded;
};

// idea zone

// from https://www.gamedev.net/forums/topic/668969-emulating-gl_primitiveid-in-opengl-es-30/5234143/

// convert indexed triangle list into a non-indexed list
// - add a vertex attribute that is the triangle ID
// - use flat interpolation on that attribute.

// Flat interpolation uses the attribute from the so called provoking vertex.
// - if you reorder indices, you can keep using indexed triangles, using an extra vertex attribute
// - works for meshes where each vertex had at most 3 triangles using it, not sure about cases with more.

// If you don’t use an index buffer, gl_PrimitiveID can be derived in the vertex shader as (gl_VertexID / 3) (for triangles) in the vertex shader and sent to the pixel shader.

const makeVertexNormals = (graph) => {
	const faces_normals = ear.graph.makeFacesNormal(graph);
	const vertices_normals = graph.vertices_coords.map(() => [0, 0, 0]);
	graph.faces_vertices
		.forEach((vertices, f) => vertices
			.forEach(v => add3(vertices_normals[v], faces_normals[f])));
	return vertices_normals.map(v => ear.math.normalize3(v));
}

const makeVertexArrays = (gl, graph, program) => {
	if (!graph || !graph.vertices_coords || !graph.faces_vertices) { return []; }
	const vertices_coords = graph.vertices_coords
		.map(coord => [...coord].concat(Array(3 - coord.length).fill(0)));
	const vertices_normals = makeVertexNormals(graph);
	const barycentric = vertices_coords
		.map((_, i) => i % 3)
		.map(n => [n === 0 ? 1 : 0, n === 1 ? 1 : 0, n === 2 ? 1 : 0]);
	// const rawEdges = graph.faces_rawEdge.flatMap(n => [n, n, n]);
	const rawEdges = graph.faces_rawEdge;
	// console.log("bary", barycentric, rawEdges);
	for (let i = 0; i < rawEdges.length; i += 1) {
		if (!rawEdges[i][0]) {
			barycentric[i * 3 + 0][2] = barycentric[i * 3 + 1][2] = 100;
		}
		if (!rawEdges[i][1]) {
			barycentric[i * 3 + 1][0] = barycentric[i * 3 + 2][0] = 100;
		}
		if (!rawEdges[i][2]) {
			barycentric[i * 3 + 0][1] = barycentric[i * 3 + 2][1] = 100;
		}
	}
	// console.log("rawEdges.flat()", new Uint32Array(rawEdges.flat()));
	return [
		{ location: gl.getAttribLocation(program, "v_position"),
			buffer: gl.createBuffer(),
			type: gl.FLOAT,
			length: vertices_coords[0].length,
			data: new Float32Array(vertices_coords.flat()) },
		{ location: gl.getAttribLocation(program, "v_normal"),
			buffer: gl.createBuffer(),
			type: gl.FLOAT,
			length: vertices_normals[0].length,
			data: new Float32Array(vertices_normals.flat()) },
		{ location: gl.getAttribLocation(program, "v_barycentric"),
			buffer: gl.createBuffer(),
			type: gl.FLOAT,
			length: 3,
			data: new Float32Array(barycentric.flat()) },
		// { location: gl.getAttribLocation(program, "v_rawEdge"),
		// 	buffer: gl.createBuffer(),
		// 	type: gl.FLOAT,
		// 	// type: gl.INT,
		// 	// type: gl.UNSIGNED_BYTE,
		// 	length: 1,
		// 	data: new Float32Array(rawEdges.flat()) },
	];
};
/**
 * WebGL 2 can handle Uint32Array. WebGL 1 cannot and must use 16 bit.
 */
const makeElementArrays = (gl, version = 1, graph = {}) => {
	if (!graph || !graph.vertices_coords || !graph.faces_vertices) { return []; }
	return [{
		mode: gl.TRIANGLES,
		buffer: gl.createBuffer(),
		data: version === 2
			? new Uint32Array(graph.faces_vertices.flat())
			: new Uint16Array(graph.faces_vertices.flat()),
	}];
};

const WebGLFoldedForm = (gl, version = 1, graph = {}) => {
	const exploded = prepare(graph);
	// console.log("WebGLFoldedForm", exploded);
	const program = version == 2
		? ear.webgl.createProgram(gl, vertexShaderV2, fragmentShaderV2)
		: ear.webgl.createProgram(gl, vertexShaderV1, fragmentShaderV1);
	return [{
		program,
		vertexArrays: makeVertexArrays(gl, exploded, program),
		elementArrays: makeElementArrays(gl, version, exploded),
		flags: [gl.DEPTH_TEST],
	}];
};

export default WebGLFoldedForm;
