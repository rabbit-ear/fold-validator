import {
	type FOLD,
// } from "rabbit-ear";
} from "./earTypes.ts";
import {
	get,
	writable,
	derived,
} from "svelte/store";
import {
	validate,
} from "rabbit-ear/graph/validate/validate.js";
import {
	hashCode,
} from "../graph/hashCode.ts";
import {
	Fold,
	Frames,
	FileHash,
} from "./file.ts";

// set by validateFOLD()
export const Errors = writable<string[][]>([]);

export const IsValid = derived<typeof Errors, boolean>(
	Errors,
	($Errors) => $Errors.every(arr => arr && arr.length === 0),
	true,
);

// managed by validateFOLD()
export const ValidationHash = writable<number>();

// a report is "valid" if the currently loaded file matches the
// file which was fed into the rabbit-ear validator function.
// this allows us the user to 1.load a file, 2.validate, and 3.modify
// the textarea file contents, in which case, the validation report disappears
export const ReportIsValid = derived<[typeof FileHash, typeof ValidationHash], boolean>(
	[FileHash, ValidationHash],
	([$FileHash, $ValidationHash]) => $FileHash === $ValidationHash,
	false,
);

// call this method to start the validation process.
// FOLD file validation is a triggered update, not a derived update,
// this way the file can be modified (in the textarea for example)
// and validation does not fire after every character update
export const validateFOLD = () => {
	const frames:FOLD[] = get(Frames);
	try {
		Errors.set(frames.map(validate));
	} catch (error) {
		console.log("need to show error");
	}
	// update the hash for this validation result
	try {
		ValidationHash.set(hashCode(JSON.stringify(get(Fold))));
	} catch (error) {
		ValidationHash.set(Math.random());
	}
};
