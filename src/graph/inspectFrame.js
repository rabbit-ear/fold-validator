import ear from "rabbit-ear";

const getSortedEdgesLength = (graph) => {
	const lengths = ear.graph.makeEdgesLength(graph).sort();
}

const getVerticesDimensions = (graph) => {
	if (!graph || !graph.vertices_coords) { return []; }
	const map = {};
	graph.vertices_coords.forEach(arr => { map[arr.length] = true; });
	return Object.keys(map)
		.sort()
		.map(str => parseInt(str, 10));
};

const getViewClass = (graph) => {
	if (graph.frame_classes && graph.frame_classes.length) {
		if (graph.frame_classes.includes("foldedForm")) { return "foldedForm"; }
		if (graph.frame_classes.includes("creasePattern")) { return "creasePattern"; }
	}
	if (graph.vertices_coords && graph.vertices_coords.length) {
		// if the graph is 3D, check the Z components,
		// if they are all zero, creasePattern. otherwise foldedForm
		if (graph.vertices_coords[0].length === 3) {
			for (let i = 0; i < graph.vertices_coords.length; i++) {
				if (Math.abs(graph.vertices_coords[2]) > 1e-5) {
					return "creasePattern";
				}
			}
			return "foldedForm";
		}
		if (graph.vertices_coords[0].length === 2) {
			return "creasePattern";
		}
	}
	return undefined;
};

const inspectFrame = (graph, epsilon) => {
	const bounds = ear.graph.getBoundingBox(graph);
	// vmin is the minimum of only the 2D coordinates
	const vmin = bounds ? Math.min(bounds.span[0], bounds.span[1]) : 0;
	return {
		bounds,
		vmin,
		count: {
			vertices: ear.graph.count.vertices(graph),
			edges: ear.graph.count.edges(graph),
			faces: ear.graph.count.faces(graph),
			faceOrders: (graph.faceOrders ? graph.faceOrders.length : 0),
		},
		graph: ear.graph.validate(graph, epsilon),
		verticesDimensions: getVerticesDimensions(graph),
		viewClass: getViewClass(graph),// foldedForm or creasePattern
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
