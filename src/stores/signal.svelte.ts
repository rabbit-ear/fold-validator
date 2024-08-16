/**
 * @description create and return a writable Svelte rune
 */
export const createSignal = <T>(val: T) => {
	let value = $state(val);
	return {
		get value(): T {
			return value;
		},
		set value(v: T) {
			value = v;
		},
	};
};
