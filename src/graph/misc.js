// import ear from "rabbit-ear";

// const geometryKeys = [
// 	"vertices_coords",
// 	"vertices_vertices",
// 	"vertices_faces",
// 	"edges_vertices",
// 	"edges_faces",
// 	"edges_assignment",
// 	"edges_foldAngle",
// 	"edges_length",
// 	"faces_vertices",
// 	"faces_edges",
// 	// as of now, these are not described in the spec, but their behavior
// 	// can be inferred, except faces_faces which could be edge-adjacent or
// 	// face-adjacent. this library uses as EDGE-ADJACENT.
// 	"vertices_edges",
// 	"edges_edges",
// 	"faces_faces",
// ];
// const orderKeys = [
// 	"edgeOrders",
// 	"faceOrders",
// ];

// export const findNonSpecKeys = (fold) => {
// 	if (!fold) { return []; }
// 	const map = {};
// 	ear.graph.foldKeys.forEach(key => { map[key] = true; });
// 	return Object.keys(fold).filter(key => !map[key]);
// };

// export const findSpecGeometryKeys = (fold) => {
// 	if (!fold) { return []; }
// 	const map = {};
// 	geometryKeys.forEach(key => { map[key] = true; });
// 	return Object.keys(fold).filter(key => map[key]);
// };

// export const findSpecOrderKeys = (fold) => {
// 	if (!fold) { return []; }
// 	const map = {};
// 	orderKeys.forEach(key => { map[key] = true; });
// 	return Object.keys(fold).filter(key => map[key]);
// };

// export const findRenderStyle = (graph) => {
// 	if (!graph) { return undefined; }
// 	if (graph.frame_classes && graph.frame_classes.length) {
// 		if (graph.frame_classes.includes("foldedForm")) { return "foldedForm"; }
// 		if (graph.frame_classes.includes("creasePattern")) { return "creasePattern"; }
// 	}
// 	if (graph.vertices_coords && graph.vertices_coords.length) {
// 		// if the graph is 3D, check the Z components,
// 		// if they are all zero, creasePattern. otherwise foldedForm
// 		if (graph.vertices_coords[0].length === 3) {
// 			for (let i = 0; i < graph.vertices_coords.length; i++) {
// 				if (Math.abs(graph.vertices_coords[2]) > 1e-5) {
// 					return "creasePattern";
// 				}
// 			}
// 			return "foldedForm";
// 		}
// 		if (graph.vertices_coords[0].length === 2) {
// 			return "creasePattern";
// 		}
// 	}
// 	return undefined;
// };
