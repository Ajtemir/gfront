'use client'

import { useState } from "react";
import { FileRejection, FileWithPath } from "react-dropzone";
import toast from "react-hot-toast";

interface UseImageUploaderProps {
  imageMaxSizeMb?: number;
  onImageAccepted?: (image: FileWithPath) => void;
  previewInitial?: string | null;
}


export const useImageUploader = ({ imageMaxSizeMb = 3, onImageAccepted, previewInitial = null }: UseImageUploaderProps) => {
  const [image, setImage] = useState<FileWithPath | null>(null);
  const [preview, setPreview] = useState<string | null>(previewInitial)
  
  const handleAccepted = (acceptedFiles: FileWithPath[]) => {
    if (!acceptedFiles || acceptedFiles.length === 0) {
      return;
    }

    let image = acceptedFiles[0]
    setPreview(URL.createObjectURL(image))
    setImage(image)
    onImageAccepted?.(image)
  }
  
  const handleRejected = (fileRejections: FileRejection[]) => {
    const rejectedFile = fileRejections[0]

    rejectedFile.errors.forEach((error) => {
      if (error.code === 'file-too-large') {
        toast.error(`Error: image is larger than ${imageMaxSizeMb}MB`)
      }
      if (error.code === 'file-invalid-type') {
        toast.error(`Error: image has invalid type.`)
      }
    })
  }
  
  return {
    image,
    preview,
    setImage,
    setPreview,
    handleAccepted,
    handleRejected,
  }
}
