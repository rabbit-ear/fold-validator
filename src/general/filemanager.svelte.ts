import { FileString } from "../stores/file.svelte.ts";

/**
 * @description bind a variable "files" to the input element like:
 * `<input type="file" bind:files>`
 * and pass the variable into this method on change.
 */
export const fileDialogDidUpdate = (files: FileList | null | undefined) => {
  if (!files) {
    return;
  }

  let filename: string;
  let mimeType: string;

  const reader = new FileReader();
  reader.onload = (loadEvent) => {
    const string = loadEvent.target?.result;
    if (typeof string === "string") {
      FileString.value = string;
    }
  };

  if (files.length) {
    mimeType = files[0].type;
    filename = files[0].name;
    reader.readAsText(files[0]);
  }
};

/**
 * @description bind an "ondrop" event handler and when it fires
 * pass in the result event object into this method.
 */
export const fileDropDidUpdate = (event: DragEvent) => {
  // drag and drop file event object does not contain
  // the filename, we have to store it here and re-match later.
  let filename: string;
  let mimeType: string;

  const fileOnLoad = (event: ProgressEvent<FileReader>) => {
    if (
      event.target &&
      event.target.result &&
      typeof event.target.result === "string"
    ) {
      FileString.value = event.target.result;
    }
  };

  if (event.dataTransfer && event.dataTransfer.items) {
    const filenames = [...event.dataTransfer.files].map((el) => el.name);

    const transferFile = [...event.dataTransfer.items]
      .map((item, i) => ({ item, filename: filenames[i] }))
      .filter((el) => el.item.kind === "file")
      .map((el) => ({ ...el, contents: el.item.getAsFile() }))
      .shift();

    if (transferFile) {
      const reader = new FileReader();
      reader.onload = fileOnLoad;
      filename = transferFile.filename;
      if (transferFile.contents) {
        reader.readAsText(transferFile.contents);
      }
      return reader;
    }
  }
};
