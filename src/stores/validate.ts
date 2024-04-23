import { type FOLD } from "rabbit-ear";
import { get, writable, derived } from "svelte/store";
import { validate } from "rabbit-ear/graph/validate/validate.js";
import { hashCode } from "../graph/hashCode.ts";
import {
	Fold,
	FileHash,
} from "./file.ts";

export const Errors = writable<string[]>([]);

export const ValidationHash = writable<number>();

export const ReportIsValid = derived<[typeof FileHash, typeof ValidationHash], boolean>(
	[FileHash, ValidationHash],
	([$FileHash, $ValidationHash]) => $FileHash === $ValidationHash,
	false,
);

export const validateFOLD = () => {
	const fold:FOLD = get(Fold);
	try {
		Errors.set(validate(fold));
	} catch (error) {
		console.log("need to show error");
	}
	// update the hash for this validation result
	try {
		ValidationHash.set(hashCode(JSON.stringify(fold)));
	} catch (error) {
		ValidationHash.set(Math.random());
	}
};
