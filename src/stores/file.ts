import { type FOLD } from "rabbit-ear";
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

export const FileString = writable<string|undefined>(undefined);

export const Fold = derived<typeof FileString, FOLD>(
	FileString,
	($FileString) => {
		try {
			return !$FileString ? undefined : JSON.parse($FileString);
		} catch (err) {
			return "";
		}
	},
	undefined,
);

export const FileHash = derived<typeof Fold, number>(
	Fold,
	($Fold) => {
		if (!$Fold) { return Math.random(); }
		try {
			return hashCode(JSON.stringify($Fold))
			// return hashCode($FileString);
		} catch (error) {
			return Math.random();
		}
	},
	Math.random(),
);

export const FrameNum = writable<number>(0);

// file_frames, the first element [0] is the top layer frame itself.
// even if file_frames does not exist, [0] will be filled.
export const Frames = derived<typeof Fold, FOLD>(
	Fold,
	($Fold) => {

	},
	({}),
);

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
