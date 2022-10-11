import ear from "rabbit-ear";

const getSortedEdgesLength = (graph) => {
	const lengths = ear.graph.makeEdgesLength(graph).sort();
};

const getVerticesDimensions = (graph) => {
	if (!graph || !graph.vertices_coords) { return []; }
	const map = {};
	graph.vertices_coords.forEach(arr => { map[arr.length] = true; });
	return Object.keys(map)
		.sort()
		.map(str => parseInt(str, 10));
};

const inspectFrame = (graph, epsilon) => {
	const bounds = ear.graph.getBoundingBox(graph);
	// vmin is the minimum of only the 2D coordinates
	const vmin = bounds ? Math.min(bounds.span[0], bounds.span[1]) : 0;
	const duplicateEdges = ear.graph.getDuplicateEdges(graph);
	const circularEdges = ear.graph.getCircularEdges(graph);
	const isolatedVertices = ear.graph.getIsolatedVertices(graph);
	const duplicateVertices = ear.graph.getDuplicateVertices(graph, epsilon);
	const count = {
		vertices: ear.graph.count.vertices(graph),
		edges: ear.graph.count.edges(graph),
		faces: ear.graph.count.faces(graph),
		faceOrders: (graph.faceOrders ? graph.faceOrders.length : 0),
	};
	const references = {
		vertices: count.vertices >= ear.graph.countImplied.vertices(graph),
		edges: count.edges >= ear.graph.countImplied.edges(graph),
		faces: count.faces >= ear.graph.countImplied.faces(graph),
	};

	return {
		bounds,
		vmin,
		count,
		references,
		duplicateEdges,
		circularEdges,
		isolatedVertices,
		duplicateVertices,
		verticesDimensions: getVerticesDimensions(graph),
		// isFoldedForm: getIsFoldedForm(graph),
	};
};

// {
// 	summary,
// 	vertices: {
// 		isolated: isolated_vertices,
// 		duplicate: duplicate_vertices,
// 		references: references.vertices,
// 	},
// 	edges: {
// 		circular: circular_edges,
// 		duplicate: duplicate_edges,
// 		references: references.edges,
// 	},
// 	faces: {
// 		references: references.faces,
// 	},
// }

export default inspectFrame;
