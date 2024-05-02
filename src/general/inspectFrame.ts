import { type FOLD } from "rabbit-ear/types.js";
import {
	boundingBox,
} from "rabbit-ear/graph/boundary.js";
import {
	duplicateEdges,
} from "rabbit-ear/graph/edges/duplicate.js";
import {
	circularEdges,
} from "rabbit-ear/graph/edges/circular.js";
import {
	isolatedVertices,
} from "rabbit-ear/graph/vertices/isolated.js";
import {
	countVertices,
	countEdges,
	countFaces,
	countImpliedVertices,
	countImpliedEdges,
	countImpliedFaces,
} from "rabbit-ear/graph/count.js";

// const getSortedEdgesLength = (graph) => {
// 	const lengths = ear.graph.makeEdgesLength(graph).sort();
// };

const getVerticesDimensions = (graph: FOLD) => {
	if (!graph || !graph.vertices_coords) { return []; }
	const map: {[key:string]: boolean} = {};
	graph.vertices_coords.forEach(arr => { map[arr.length] = true; });
	return Object.keys(map)
		.sort()
		.map(str => parseInt(str, 10));
};

const inspectFrame = (graph: FOLD) => {
	const bounds = boundingBox(graph);
	// vmin is the minimum of only the 2D coordinates
	const vmin = bounds ? Math.min(bounds.span[0], bounds.span[1]) : 0;
	const count = {
		vertices: countVertices(graph),
		edges: countEdges(graph),
		faces: countFaces(graph),
		faceOrders: (graph.faceOrders ? graph.faceOrders.length : 0),
		edgeOrders: (graph.edgeOrders ? graph.edgeOrders.length : 0),
	};
	const references = {
		vertices: count.vertices >= countImpliedVertices(graph),
		edges: count.edges >= countImpliedEdges(graph),
		faces: count.faces >= countImpliedFaces(graph),
	};

	return {
		bounds,
		vmin,
		count,
		references,
		duplicateEdges: duplicateEdges(graph),
		circularEdges: circularEdges(graph),
		isolatedVertices: isolatedVertices(graph),
		// duplicateVertices: getDuplicateVertices(graph, epsilon),
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
