
const validateGraphComponentArrayLengths = (report, graph) => {

};

const validateEdgeFoldAngles = (report, graph) => {
	if (!graph.edges_assignment && !graph.edges_foldAngle) {
		report.warnings.push("edges have no assignment or fold angle.");
	}
};

const validateDimensions = (report, verticesDimensions) => {
	if (verticesDimensions && verticesDimensions.length > 1) {
		report.errors.push(`vertices contain inconsistent dimensions ${verticesDimensions.map(n => `${n}D`).join(", ")}`);
	}
};

const validateFoldedLayerOrder = (report, graph, viewClass) => {
	if (viewClass !== "foldedForm") { return; }
	if (graph.faceOrders || graph.faces_layer) { return; }
	report.warnings.push("no layer information present for foldedForm (this is fine if no coplanar faces exist)");
};

const validateGraph = (report, validate) => {
	if (validate.vertices.duplicate && validate.vertices.duplicate.length) {
		report.errors.push(`duplicate vertices found within __ epsilon: ${validate.vertices.duplicate.join(", ")}`);
	} else {
		report.successes.push("no duplicate vertices within __ epsilon");
	}
	if (validate.vertices.isolated && validate.vertices.isolated.length) {
		report.warnings.push(`isolated vertices found: ${validate.vertices.isolated.join(", ")}`);
	} else {
		report.successes.push("no isolated vertices");
	}
	// if (validate.vertices.references && validate.vertices.references.length) {
	// 	report.errors.push("");
	// } else {
	// 	report.successes.push("");
	// }
	if (validate.edges.circular && validate.edges.circular.length) {
		report.errors.push(`circular edges found: ${validate.edges.circular.join(", ")}`);
	} else {
		report.successes.push("no circular edges");
	}
	if (validate.edges.duplicate && validate.edges.duplicate.length) {
		report.errors.push(`duplicate edges found: ${validate.edges.duplicate.join(", ")}`);
	} else {
		report.successes.push("no duplicate edges");
	}
	// if (validate.edges.references && validate.edges.references.length) {
	// 	report.errors.push("");
	// } else {
	// 	report.successes.push("");
	// }
};

const validateViewClass = (report, viewClass) => {
	if (viewClass === undefined) {
		report.errors.push("cannot infer if this is a (1) crease pattern or a (2) folded form.");
	}
};

const validateFileMetadata = (report, fileInfo) => {
	if (fileInfo.file_spec === undefined) {
		report.warnings.push(`the FOLD file format specification version "file_spec" is highly encouraged.`);
	}
}

const makeReport = (fold, fileInfo, framesInfo) => {
	const report = {
		errors: [],
		warnings: [],
		successes: [],
	};
	validateFileMetadata(report, fileInfo);
	framesInfo.forEach(frameInfo => {
		validateViewClass(report, frameInfo.viewClass);
		validateDimensions(report, frameInfo.verticesDimensions);
		// validateGraph(report, frameInfo.graph);
		// validateFoldedLayerOrder(report, fold, frameInfo.viewClass);
	})
	return report;
};

export default makeReport;
