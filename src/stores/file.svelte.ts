import { type FOLD } from "rabbit-ear/types.js";
import { countFrames, flattenFrame } from "rabbit-ear/fold/frames.js";
import { isFoldedForm } from "rabbit-ear/fold/spec.js";
import { hashCode } from "../general/hashCode.ts";
import { createSignal } from "./signal.svelte.ts";

/**
 * @description Literally, just the contents of the `<textarea>` as a string
 */
export let FileString = createSignal<string>("");

/**
 * @description The contents of the `<textarea>` string parsed into a JSON.
 * In the case of a parsing error, undefined.
 */
export const Fold = (() => {
  const value = $derived.by<FOLD | undefined>(() => {
    try {
      return !FileString.value ? undefined : JSON.parse(FileString.value);
    } catch (err) {
      return undefined;
    }
  });
  return {
    get value() {
      return value;
    },
  };
})();

/**
 * @description A unique hash value for the currently loaded FOLD file
 * In the case of no file loaded, or an invalid FOLD (string parse resulting
 * in undefined), the hash value will be -1.
 */
// export const FileHash = derived<typeof Fold, number>(
// 	Fold,
// 	($Fold) => {
// 		if (!$Fold) { return -1; }
// 		try {
// 			return hashCode(JSON.stringify($Fold))
// 		} catch (error) {
// 			return -1;
// 		}
// 	},
// 	Math.random(),
// );
export const FileHash = (() => {
  const value = $derived.by<number>(() => {
    if (!Fold.value) {
      return -1;
    }
    try {
      return hashCode(JSON.stringify(Fold.value));
    } catch (error) {
      return -1;
    }
  });
  return {
    get value() {
      return value;
    },
  };
})();

/**
 * @description For the Viewer. For a FOLD with multiple frames, this is
 * the current frame being rendered, chosen by the UI.
 */
// export const FrameNum = writable<number>(0);
// export let FrameNum = $state<number>(0);
export let FrameNum = createSignal<number>(0);

/**
 * @description For a FOLD with multiple frames this will contain the total
 * number of frames, or 1 if the FOLD has no file_frames (only one top level),
 * or, in the case of a bad FOLD file, this will be 0.
 */
// export const FrameCount = derived<typeof Fold, number>(
// 	Fold,
// 	($Fold) => {
// 		try {
// 			return countFrames($Fold);
// 		} catch (error) {
// 			return 0;
// 		}
// 	},
// 	0,
// );

export const FrameCount = (() => {
  const value = $derived.by<number>(() => {
    try {
      return countFrames(Fold.value);
    } catch (error) {
      return 0;
    }
  });
  return {
    get value() {
      return value;
    },
  };
})();

// file_frames, the first element [0] is the top layer frame itself.
// even if file_frames does not exist, [0] will be filled.
// export const Frames = derived<[typeof Fold, typeof FrameCount], FOLD[]>(
// 	[Fold, FrameCount],
// 	([$Fold, $FrameCount]) => {
// 		try {
// 			return Array.from(Array($FrameCount))
// 				.map((_, i) => flattenFrame($Fold, i));
// 		} catch (error) {
// 			return [$Fold];
// 		}
// 	},
// 	[],
// );

export const Frames = (() => {
  const value = $derived.by<FOLD[]>(() => {
    try {
      return Array.from(Array(FrameCount.value)).map((_, i) =>
        flattenFrame(Fold.value, i),
      );
    } catch (error) {
      return [Fold.value];
    }
  });
  return {
    get value() {
      return value;
    },
  };
})();

// FrameCount.subscribe(($FrameCount) => {
// 	if ($FrameCount === 0) { return; }
// 	if ($FrameCount <= get(FrameNum)) {
// 		FrameNum.set($FrameCount - 1);
// 	}
// });
// todo this might not work. needs testing
// $effect(() => {
// 	if (FrameCount === 0) { return; }
// 	if (FrameCount <= FrameNum) {
// 		FrameNum = FrameCount - 1;
// 	}
// });

export const Frame = (() => {
  const value = $derived.by<FOLD>(() => {
    try {
      return flattenFrame(Fold.value, FrameNum.value);
    } catch (error) {
      return {};
    }
  });
  return {
    get value() {
      return value;
    },
  };
})();

// export const FrameStyle = derived<typeof Frame, { isFolded: boolean, hasOrders: boolean}>(
// 	Frame,
// 	($Frame) => {
// 		let isFolded = false;
// 		try {
// 			isFolded = isFoldedForm($Frame);
// 		} catch (error) { }
// 		let hasOrders = false;
// 		try {
// 			hasOrders = $Frame.faceOrders != null;
// 		} catch (error) { }
// 		return { isFolded, hasOrders };
// 	},
// 	({ isFolded: false, hasOrders: false }),
// );

// { isFolded: boolean, hasOrders: boolean }
export const FrameStyle = (() => {
  const value = $derived.by<object>(() => {
    let isFolded = false;
    try {
      isFolded = isFoldedForm(Frame.value);
    } catch (error) {}
    let hasOrders = false;
    try {
      hasOrders = Frame.value.faceOrders != null;
    } catch (error) {}
    return { isFolded, hasOrders };
  });
  return {
    get value() {
      return value;
    },
  };
})();

// const FrameStyle = $derived.by<object>(() => {
//   let isFolded = false;
//   try {
//     isFolded = isFoldedForm(Frame.value);
//   } catch (error) {}
//   let hasOrders = false;
//   try {
//     hasOrders = Frame.value.faceOrders != null;
//   } catch (error) {}
//   return { isFolded, hasOrders };
// });

// export const GetFrameStyle = () => FrameStyle;
