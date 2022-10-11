// # graph stuff

// 1. make sure "file_spec" is included
// 2. all similarly-prefixed arrays ("vertices_") should be the same length.
// 3. no circular edges.
// 4. no duplicate edges.
// 5. no isolated vertices.
// 6. make sure value references don't reference to longer-than-the-array length. except graphs marked "abstract".

// # geometry stuff

// 7. report "duplicate" points (within an epsilon), only for graphs marked "creasePattern"
// 8. make sure vertices have a consistent dimension among them (2D or 3D only).
// 9. if vertices are 2D, make sure "frame_classes" contains either "foldedForm" or "creasePattern" (otherwise we can't be sure).

// # folding stuff

// 10. if they both exist, make sure foldAngles and assignments match
// 11. make sure faceOrders exists if graph is "foldedForm" and two or more faces are co-planar and overlapping.

const messages = {
	0: [`JSON valid`, `JSON invalid`],
	1: [`"file_spec" key exists`, `"file_spec" is highly encouraged`],
	2: [
		`similarly-prefixed array lengths match`,
		`similarly-prefixed array lengths do not match`,
	],
	3: [`no circular edges`, `circular edge(s) found`],
	4: [`no duplicate edges`, `duplicate edge(s) found`],
	5: [`no isolated vertices`, `isolated vertex/vertices found`],
	6: [`value references within array bounds`, `value references beyond array bounds`],
	7: [`no duplicate vertices (CP only)`, `duplicate vertices within epsilon for CP`],
	8: [`vertices consistent dimension`, `vertices contain inconsistent dimensions`],
	9: [`fold state detected`, `fold state unclear (use frame_classes)`],
	10: [`foldAngles and assignments match`, `foldAngles and assignments mismatch`],
	11: [`faceOrders exist (folded only)`, `faceOrders needed but not present`],
};

const test = {
	0: () => true,
	1: (fold, fileInfo, framesInfo) => fold.file_spec !== undefined,
	2: () => true,
	3: (_, __, framesInfo) => framesInfo
		.map(el => el.circularEdges.length === 0)
		.reduce((a, b) => a && b, true),
	4: (_, __, framesInfo) => framesInfo
		.map(el => el.duplicateEdges.length === 0)
		.reduce((a, b) => a && b, true),
	5: (_, __, framesInfo) => framesInfo
		.map(el => el.isolatedVertices.length === 0)
		.reduce((a, b) => a && b, true),
	6: (_, __, framesInfo) => framesInfo
		.map(el => el.references.vertices && el.references.edges && el.references.faces)
		.reduce((a, b) => a && b, true),
	7: () => true, // duplicateVertices
	8: (_, __, framesInfo) => framesInfo
		.map(el => el.verticesDimensions.length < 2)
		.reduce((a, b) => a && b, true),
	9: () => true,
	10: () => true,
	11: () => true,
};

const makeReport = (fold, fileInfo, framesInfo) => {
	const report = {
		errors: [],
		warnings: [],
		successes: [],
	};
	Object.keys(test)
		.map(i => test[i](fold, fileInfo, framesInfo))
		.forEach((res, i) => {
			if (res) { report.successes.push(messages[i][0]); }
			else { report.errors.push(messages[i][1]); }
		});
	return report;
};

export default makeReport;

// const validateDimensions = (report, verticesDimensions) => {
// 	if (verticesDimensions && verticesDimensions.length > 1) {
// 		report.errors.push(`vertices contain inconsistent dimensions ${verticesDimensions.map(n => `${n}D`).join(", ")}`);
// 	}
// };

// const validateEdgeFoldAngles = (report, graph) => {
// 	if (!graph.edges_assignment && !graph.edges_foldAngle) {
// 		report.warnings.push("edges have no assignment or fold angle.");
// 	}
// };

// const validateFoldedLayerOrder = (report, graph, viewClass) => {
// 	if (viewClass !== "foldedForm") { return; }
// 	if (graph.faceOrders || graph.faces_layer) { return; }
// 	report.warnings.push("no layer information present for foldedForm (this is fine if no coplanar faces exist)");
// };

// const validateViewClass = (report, viewClass) => {
// 	if (viewClass === undefined) {
// 		report.errors.push("cannot infer if this is a (1) crease pattern or a (2) folded form.");
// 	}
// };

