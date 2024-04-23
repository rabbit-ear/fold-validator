// import ear from "rabbit-ear";

// // const getSortedEdgesLength = (graph) => {
// // 	const lengths = ear.graph.makeEdgesLength(graph).sort();
// // };

// const getVerticesDimensions = (graph) => {
// 	if (!graph || !graph.vertices_coords) { return []; }
// 	const map = {};
// 	graph.vertices_coords.forEach(arr => { map[arr.length] = true; });
// 	return Object.keys(map)
// 		.sort()
// 		.map(str => parseInt(str, 10));
// };

// const inspectFrame = (graph, epsilon) => {
// 	const bounds = ear.graph.boundingBox(graph);
// 	// vmin is the minimum of only the 2D coordinates
// 	const vmin = bounds ? Math.min(bounds.span[0], bounds.span[1]) : 0;
// 	const duplicateEdges = ear.graph.duplicateEdges(graph);
// 	const circularEdges = ear.graph.circularEdges(graph);
// 	const isolatedVertices = ear.graph.isolatedVertices(graph);
// 	const duplicateVertices = []; // ear.graph.getDuplicateVertices(graph, epsilon);
// 	const count = {
// 		vertices: ear.graph.countVertices(graph),
// 		edges: ear.graph.countEdges(graph),
// 		faces: ear.graph.countFaces(graph),
// 		faceOrders: (graph.faceOrders ? graph.faceOrders.length : 0),
// 		edgeOrders: (graph.edgeOrders ? graph.edgeOrders.length : 0),
// 	};
// 	const references = {
// 		vertices: count.vertices >= ear.graph.countImpliedVertices(graph),
// 		edges: count.edges >= ear.graph.countImpliedEdges(graph),
// 		faces: count.faces >= ear.graph.countImpliedFaces(graph),
// 	};

// 	return {
// 		bounds,
// 		vmin,
// 		count,
// 		references,
// 		duplicateEdges,
// 		circularEdges,
// 		isolatedVertices,
// 		duplicateVertices,
// 		verticesDimensions: getVerticesDimensions(graph),
// 		// isFoldedForm: getIsFoldedForm(graph),
// 	};
// };

// // {
// // 	summary,
// // 	vertices: {
// // 		isolated: isolated_vertices,
// // 		duplicate: duplicate_vertices,
// // 		references: references.vertices,
// // 	},
// // 	edges: {
// // 		circular: circular_edges,
// // 		duplicate: duplicate_edges,
// // 		references: references.edges,
// // 	},
// // 	faces: {
// // 		references: references.faces,
// // 	},
// // }

// export default inspectFrame;
