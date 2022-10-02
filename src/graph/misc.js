import ear from "rabbit-ear";

export const findNonSpecKeys = (fold) => {
	const map = {};
	ear.graph.foldKeys.forEach(key => { map[key] = true; });
	return Object.keys(fold).filter(key => !map[key]);
};
