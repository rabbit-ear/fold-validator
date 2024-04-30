import {
	type FOLD,
} from "rabbit-ear/types.js";
import {
	countFrames,
	flattenFrame,
} from "rabbit-ear/fold/frames.js";
import {
	isFoldedForm,
} from "rabbit-ear/fold/spec.js";
import {
	get,
	writable,
	derived,
} from "svelte/store";
import {
	hashCode,
} from "../graph/hashCode.ts";

/**
 * @description Literally, just the contents of the `<textarea>` as a string
 */
export const FileString = writable<string|undefined>("");

/**
 * @description The contents of the `<textarea>` string parsed into a JSON.
 * In the case of a parsing error, undefined.
 */
export const Fold = derived<typeof FileString, FOLD|undefined>(
	FileString,
	($FileString) => {
		try {
			return !$FileString ? undefined : JSON.parse($FileString);
		} catch (err) {
			return undefined;
		}
	},
	undefined,
);

/**
 * @description A unique hash value for the currently loaded FOLD file
 * In the case of no file loaded, or an invalid FOLD (string parse resulting
 * in undefined), the hash value will be -1.
 */
export const FileHash = derived<typeof Fold, number>(
	Fold,
	($Fold) => {
		if (!$Fold) { return -1; }
		try {
			return hashCode(JSON.stringify($Fold))
		} catch (error) {
			return -1;
		}
	},
	Math.random(),
);

/**
 * @description For the Viewer. For a FOLD with multiple frames, this is
 * the current frame being rendered, chosen by the UI.
 */
export const FrameNum = writable<number>(0);

/**
 * @description For a FOLD with multiple frames this will contain the total
 * number of frames, or 1 if the FOLD has no file_frames (only one top level),
 * or, in the case of a bad FOLD file, this will be 0.
 */
export const FrameCount = derived<typeof Fold, number>(
	Fold,
	($Fold) => {
		try {
			return countFrames($Fold);
		} catch (error) {
			return 0;
		}
	},
	0,
);

// file_frames, the first element [0] is the top layer frame itself.
// even if file_frames does not exist, [0] will be filled.
export const Frames = derived<[typeof Fold, typeof FrameCount], FOLD[]>(
	[Fold, FrameCount],
	([$Fold, $FrameCount]) => {
		try {
			return Array.from(Array($FrameCount))
				.map((_, i) => flattenFrame($Fold, i));
		} catch (error) {
			return [$Fold];
		}
	},
	[],
);

FrameCount.subscribe(($FrameCount) => {
	if ($FrameCount === 0) { return; }
	if ($FrameCount <= get(FrameNum)) {
		FrameNum.set($FrameCount - 1);
	}
});

export const Frame = derived<[typeof Fold, typeof FrameNum], FOLD>(
	[Fold, FrameNum],
	([$Fold, $FrameNum]) => {
		try {
			return flattenFrame($Fold, $FrameNum);
		} catch (error) {
			return {};
		}
	},
	({}),
);

export const FrameStyle = derived<typeof Frame, { isFolded: boolean, hasOrders: boolean}>(
	Frame,
	($Frame) => {
		let isFolded = false;
		try {
			isFolded = isFoldedForm($Frame);
		} catch (error) { }
		let hasOrders = false;
		try {
			hasOrders = $Frame.faceOrders != null;
		} catch (error) { }
		return { isFolded, hasOrders };
	},
	({ isFolded: false, hasOrders: false }),
);
