import {
	type FOLD,
} from "rabbit-ear/types.js";
import {
	foldKeys,
} from "rabbit-ear/fold/spec.js";
import {
	validate,
} from "rabbit-ear/graph/validate/validate.js";
import {
	get,
	writable,
	derived,
} from "svelte/store";
import {
	hashCode,
} from "../general/hashCode.ts";
import {
	FileString,
	Fold,
	Frames,
	FileHash,
} from "./file.ts";

const specKeyLookup: {[key:string]:boolean} = {};
Object.values(foldKeys).flat().forEach(key => { specKeyLookup[key] = true; });

// set by validateFOLD()
export const Errors = writable<string[][]>([]);

const IsValidJSON = derived<typeof FileString, boolean>(
	FileString,
	($FileString) => {
		try {
			JSON.parse($FileString!);
			return true;
		} catch (err) {
			return false;
		}
	},
	false,
);

export const IsValid = derived<[typeof IsValidJSON, typeof Errors], boolean>(
	[IsValidJSON, Errors],
	([$IsValidJSON, $Errors]) => (
		$IsValidJSON && $Errors.every(arr => arr && arr.length === 0)
	),
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

	// set the errors array
	if (!get(FileString)) {
		Errors.set([["empty"]]);
	} else if (!get(IsValidJSON)) {
		Errors.set([[
			"invalid JSON. try:",
			"https://jsonformatter.curiousconcept.com",
		]]);
	} else if (!frames.length) {
		Errors.set([["no FOLD loaded"]]);
	} else {
		try {
			Errors.set(frames.map(validate));
		} catch (error) {
			Errors.set([["unknown error when validating the method"]]);
		}
	}

	// update the hash for this validation result
	try {
		ValidationHash.set(hashCode(JSON.stringify(get(Fold))));
	} catch (error) {
		// ValidationHash.set(Math.random());
		ValidationHash.set(-1);
	}
};

export const NonSpecKeys = derived<typeof Frames, string[]>(
	Frames,
	$Frames => Array.from(new Set($Frames
		.flatMap(frame => Object.keys(frame))
		.filter(key => !specKeyLookup[key]))),
	[],
);
