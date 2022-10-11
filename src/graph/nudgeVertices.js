import ear from "rabbit-ear";

export const nudgeVerticesWithFacesLayer2 = ({ vertices_coords, faces_vertices, faces_layer }, change) => {
	const layers_face = ear.graph.invertMap(faces_layer);
	const invertedFaceMap = ear.graph.invertMap(change.faces.map);
	// console.log("layers_face", layers_face);
	layers_face.forEach((face, layer) => {
		const faces = invertedFaceMap[face].constructor === Array
			? invertedFaceMap[face]
			: [invertedFaceMap[face]];
		faces.forEach(f => {
			faces_vertices[f].forEach(v => {
				if (vertices_coords[v][2] === undefined) {
					vertices_coords[v][2] = 0;
				}
			});
			faces_vertices[f].forEach(v => {
				vertices_coords[v][2] += 1e-5 * layer;
			});
		});
	});
};

export const nudgeVerticesWithFacesLayer = ({ vertices_coords, faces_vertices, faces_layer }, triangulated, exploded) => {
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
};

export const nudgeVerticesWithFaceOrders = ({ vertices_coords, faces_vertices, faceOrders }, normals) => {
	const sets_faces = ear.graph.getDisjointedVertices({ edges_vertices: faceOrders.map(tri => [tri[0], tri[1]]) });
	const sets_single_face = sets_faces.map(faces => faces[0]);
	const sets_normal = sets_single_face.map(face => normals[face]);
	console.log("sets_faces", sets_faces);
	console.log("sets_normal", sets_normal);
	const faces_set_hash = {};
	sets_faces.forEach((faces, i) => faces.forEach(f => {
		faces_set_hash[f] = i;
	}));
	const faces_set = [];
	Object.keys(faces_set_hash).map(n => parseInt(n, 10)).forEach(f => {
		faces_set[f] = faces_set_hash[f];
	});
	console.log("faces_set", faces_set);
};
