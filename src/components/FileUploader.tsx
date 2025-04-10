import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import { FileItem } from '../types';

interface FileUploaderProps {
  onUploadComplete: (files: FileItem[]) => void;
}

export function FileUploader({ onUploadComplete }: FileUploaderProps) {
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const newFiles: FileItem[] = acceptedFiles.map((file) => {
        const objectUrl = URL.createObjectURL(file);
        return {
          id: `${Date.now()}-${file.name}`,
          name: file.name,
          size: file.size,
          type: file.type,
          url: objectUrl,
          created_at: new Date().toISOString(),
          folderId: null
        };
      });

      onUploadComplete(newFiles);
      toast.success(`Uploaded ${acceptedFiles.length} file(s)`);
    },
    [onUploadComplete]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
    >
      <input {...getInputProps()} />
      <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
      {isDragActive ? (
        <p className="text-lg text-blue-500">Drop the files here...</p>
      ) : (
        <div>
          <p className="text-lg mb-2">Drag & drop files here, or click to select files</p>
          <p className="text-sm text-gray-500">Supports any file type, including .jar files</p>
        </div>
      )}
    </div>
  );
}