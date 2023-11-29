import {DropzoneOptions, FileWithPath, useDropzone} from "react-dropzone";
import {FC} from "react";
import {Box, Typography} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'
import Image from "next/image";
import {bytesToSize} from "@/utils/bytes-to-size";
import { useTranslations } from "next-intl";

export type FilePreview = FileWithPath

interface ImageUploaderProps extends DropzoneOptions {
  image?: FilePreview | null;
  imageName?: string | null;
  required?: boolean;
  preview: string | null;
  imageWidth?: number | null;
  imageHeight?: number | null;
  uploadIconSize?: number | null;
  onUpload?: () => void;
}

export const ImageUploader: FC<ImageUploaderProps> = (props) => {
  const {
    /// Own props
    image,
    imageName,
    required,
    preview,
    imageWidth,
    imageHeight,
    uploadIconSize,
    onUpload,
    // DropzoneOptions props
    accept,
    disabled,
    getFilesFromEvent,
    maxSize,
    minSize,
    multiple,
    maxFiles,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDrop,
    onDropAccepted,
    onDropRejected,
    onFileDialogCancel,
    onFileDialogOpen,
    useFsAccessApi,
    autoFocus,
    preventDropOnDocument,
    noClick,
    noKeyboard,
    noDrag,
    noDragEventsBubbling,
    onError,
    validator,
    ...other
  } = props;
  
  const t = useTranslations();
  
  const acceptFileType = props.accept || {
    'image/jpeg': ['.jpg', '.jpeg']
  }
  
  const defaultProps = Object.assign({}, props, {
    accept: acceptFileType
  })
  
  const {getRootProps, getInputProps, isDragActive} = useDropzone(defaultProps);

  return (
    <div {...other}>
      <Grid
        container
        sx={{
          mx: 0,
          border: 1,
          borderRadius: 1,
          borderStyle: 'dashed',
          borderColor: 'divider',
          outline: 'none',
          ...(
            isDragActive && {
              backgroundColor: 'action.active',
              opacity: 0.5
            }
          ),
          '&:hover': {
            backgroundColor: 'action.hover',
            cursor: 'pointer',
            opacity: 0.5
          }
        }}
        {...getRootProps()}
      >
        <Grid
          md={6}
          sm={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <input {...getInputProps()} />
          <Box
            sx={{
              '& img': {
                width: 100
              }
            }}
          >
            <Image
              alt="Select file"
              src="/undraw_add_file2_gvbb.svg"
              width={uploadIconSize ?? 128}
              height={uploadIconSize ?? 128}
            />
          </Box>
          <Box sx={{p: 2}}>
            <Typography variant="h6">
              {
                image ? image.name : imageName ||
                required
                  ? t('Select an image')
                  : `${t('Select an image')} (${t('optional')})`
              }
            </Typography>
            <Typography variant="subtitle2">
              {image && bytesToSize(image.size)}
            </Typography>
          </Box>
        </Grid>
        <Grid
          md={6}
          sm={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {preview && (
            <Image
              // @ts-ignore
              src={preview}
              alt="File preview"
              width={imageWidth ?? 300}
              height={imageHeight ?? 300}
              style={{objectFit: 'contain', overflow: 'auto'}}
            />
          )}
        </Grid>
      </Grid>
    </div>
  )
}
