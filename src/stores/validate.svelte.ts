import { type FOLD } from "rabbit-ear/types.js";
import { foldKeys } from "rabbit-ear/fold/spec.js";
import { validate } from "rabbit-ear/graph/validate/validate.js";
import { hashCode } from "../general/hashCode.ts";
import { FileString, Fold, Frames, FileHash } from "./file.svelte.ts";
import { createSignal } from "./signal.svelte.ts";

const specKeyLookup: { [key: string]: boolean } = {};
Object.values(foldKeys)
  .flat()
  .forEach((key) => {
    specKeyLookup[key] = true;
  });

// set by validateFOLD()
// export const Errors = writable<string[][]>([]);
export const Errors = createSignal<string[][]>([]);

const IsValidJSON = $derived.by<boolean>(() => {
  try {
    JSON.parse(FileString.value);
    return true;
  } catch (err) {
    return false;
  }
});

// const IsValid = $derived<boolean>(
//   IsValidJSON && get(Errors).every((arr) => arr && arr.length === 0),
// );
const IsValid = $derived<boolean>(
  IsValidJSON && Errors.value.every((arr) => arr && arr.length === 0),
);
export const GetIsValid = () => IsValid;

// managed by validateFOLD()
// export const ValidationHash = writable<number>();
export const ValidationHash = createSignal<number>(0);

// a report is "valid" if the currently loaded file matches the
// file which was fed into the rabbit-ear validator function.
// this allows us the user to 1.load a file, 2.validate, and 3.modify
// the textarea file contents, in which case, the validation report disappears
const ReportIsValid = $derived<boolean>(
  $state.is(FileHash.value, ValidationHash.value),
);
export const GetReportIsValid = () => ReportIsValid;

// call this method to start the validation process.
// FOLD file validation is a triggered update, not a derived update,
// this way the file can be modified (in the textarea for example)
// and validation does not fire after every character update
export const validateFOLD = () => {
  const frames: FOLD[] = Frames.value;

  // set the errors array
  if (!FileString.value) {
    Errors.value = [["empty"]];
  } else if (!IsValidJSON) {
    Errors.value = [
      ["invalid JSON. try:", "https://jsonformatter.curiousconcept.com"],
    ];
  } else if (!frames.length) {
    Errors.value = [["no FOLD loaded"]];
  } else {
    try {
      Errors.value = frames.map(validate);
    } catch (error) {
      Errors.value = [["unknown error when validating the method"]];
    }
  }

  // update the hash for this validation result
  try {
    ValidationHash.value = hashCode(JSON.stringify(Fold.value));
  } catch (error) {
    // ValidationHash.set(Math.random());
    ValidationHash.value = -1;
  }
};

const NonSpecKeys = $derived<string[]>(
  Array.from(
    new Set(
      Frames.value
        .flatMap((frame) => Object.keys(frame))
        .filter((key) => !specKeyLookup[key]),
    ),
  ),
);
export const GetNonSpecKeys = () => NonSpecKeys;
