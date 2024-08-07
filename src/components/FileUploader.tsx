"use client";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function FileUploader() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Lidar com os arquivos aqui
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="p-3 flex justify-center items-center border-current h-60 outline-2 outline-offset-2 rounded-md outline-dashed text-center"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>
          Solte os arquivos <strong className="text-primary">aqui</strong>...
        </p>
      ) : (
        <p>
          Arraste e solte alguns
          <strong className="text-primary"> arquivos aqui</strong>, ou{" "}
          <strong className="text-primary">clique</strong> para selecionar
          arquivos
        </p>
      )}
    </div>
  );
}
