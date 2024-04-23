// basically a polyfill for Java's hash code function
export const hashCode = (string: string): number => {
	let hash = 0;
	for (let i = 0; i < string.length; i += 1) {
		hash = ((hash << 5) - hash) + string.charCodeAt(i);
		hash |= 0; // Convert to 32bit integer
	}
	return hash;
};
