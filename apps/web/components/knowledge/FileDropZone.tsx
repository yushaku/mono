import { useUploadFile } from "@/services";
import React, { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { IconUpload } from "ui";

type Props = { onSave: (url: string, title: string) => void };

export const FileDropZone = ({ onSave }: Props) => {
  const { mutateAsync: uploadFile, isLoading } = useUploadFile();
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDragEnter = () => {
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleDropFile = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      acceptedFiles.forEach(async (file: File) => {
        const reader = new FileReader();

        reader.onabort = () => toast("file reading was aborted");
        reader.onerror = () => toast.error("file reading has failed");
        const url = await uploadFile(file);
        onSave(url, file.name);
      });
    },
    [uploadFile, onSave]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDropFile,
    maxSize: 20 * 1024 * 1024, // Maximum file size: 20MB
    accept: {
      "text/*": [".docx", ".doc", ".pdf", ".txt"],
    },
    onDragEnter: handleDragEnter,
    onDragLeave: handleDragLeave,
    onDropRejected(fileRejections) {
      handleDragLeave();
      const errMessage = fileRejections[0].errors[0].message;
      toast.error(
        errMessage ? errMessage : "File type must be text: docx, doc, pdf, txt"
      );
    },
  });
  return (
    <div className="mt-9">
      <h5 className="text-lg font-semibold">Upload</h5>
      {isLoading ? (
        <span className="flexCenter py-10">
          <p>Loading...</p>
        </span>
      ) : (
        <div
          {...getRootProps()}
          className={`flexCenter cursor-pointer flex-col py-10 mt-3 rounded-lg border border-dashed ${
            isDragActive
              ? "bg-blue-500/10 border-blue-500"
              : "border-[#ebebeb] bg-strokeColor/20"
          }`}
        >
          <input {...getInputProps()} />
          <button>
            <IconUpload color="orange" className="w-12 h-12" />
          </button>

          <span className="mt-5 text-grayColor text-sm md:text-base font-medium text-center max-w-[250px] md:max-w-[415px]">
            <span className="text-textColor underline">Click to upload</span> or
            drag and drop Up to 10 files like word, or PDF, and upto 20 MB each.
          </span>
        </div>
      )}
    </div>
  );
};
