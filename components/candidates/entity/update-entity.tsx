'use client'

import { Entity, UpdateEntityDetails, UpdateEntityImage } from "@/types/entity";
import { useUpdateEntityDetails, useUpdateEntityImage } from "@/backend-api/entity-api";
import { useFormik } from "formik";
import { UpdateEntityDetailsSchema, UpdateEntityImageSchema } from "@/schemas";
import toast from "react-hot-toast";
import { formatYupError } from "@/utils/format-yup-error";
import { ButtonGroup, Card, CardContent, CardHeader, Divider } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { FormikTextField } from "@/components/formik-text-field";
import { nameof } from "@/utils/nameof";
import { SubmitButton } from "@/components/buttons/submit-button";
import { FileWithPath } from "react-dropzone";
import { fileToBase64 } from "@/utils/file-to-base64";
import { useImageUploader } from "@/hooks/use-image-uploader";
import { ImageUploader } from "@/components/image-uploader";
import { megabytesToBytes } from "@/utils/megabytes-to-bytes";
import { useTranslations } from "next-intl";

const UpdateEntityImage = ({entity}: { entity: Entity }) => {
  const t = useTranslations()
  const updateEntityImageMutation = useUpdateEntityImage()
  const initialValues: UpdateEntityImage = {
    id: entity.id,
    imageName: entity.imageName,
    image: entity.image,
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: UpdateEntityImageSchema,
    onSubmit: async (values) => {
      const tryUpdateEntity = async () => {
        const request = UpdateEntityImageSchema.cast(values) as UpdateEntityImage
        await updateEntityImageMutation.mutateAsync(request)
      }

      await toast.promise(tryUpdateEntity(), {
        loading: t('Pending'),
        success: t('Success'),
        error: (err) => {
          console.error(formatYupError(err))
          return t('Failed')
        }
      })
    }
  })

  const imageMaxSizeMb = 3
  const onImageAccepted = async (image: FileWithPath) => {
    let base64 = await fileToBase64(image) as string;
    base64 = base64.split(',')[1]

    await formik.setFieldValue(nameof<UpdateEntityImage>('image'), base64)
    await formik.setFieldValue(nameof<UpdateEntityImage>('imageName'), image.name);
  }
  const {image, preview, handleAccepted, handleRejected} = useImageUploader({
    imageMaxSizeMb,
    onImageAccepted,
    previewInitial: entity.image ? `data:image/jpeg;base64,${entity.image}` : null
  })

  return (
    <Card sx={{mt: 3}}>
      <CardHeader title={t('Image')}/>
      <Divider/>
      <CardContent>
        <form onSubmit={formik.handleSubmit}>
          <ImageUploader
            image={image}
            imageName={entity.imageName}
            preview={preview}
            multiple={false}
            onDropAccepted={handleAccepted}
            onDropRejected={handleRejected}
            imageWidth={640}
            imageHeight={400}
            uploadIconSize={32}
            maxSize={megabytesToBytes(imageMaxSizeMb)}
          />

          <ButtonGroup variant='contained' sx={{mt: 3}}>
            <SubmitButton color='success'>
              {t('Save')}
            </SubmitButton>
          </ButtonGroup>
        </form>
      </CardContent>
    </Card>
  )
}

export const UpdateEntity = ({entity}: { entity: Entity }) => {
  const t = useTranslations()
  const updateEntityDetailsMutation = useUpdateEntityDetails()

  const initialValues: UpdateEntityDetails = {
    id: entity.id,
    nameRu: entity.nameRu,
    nameKg: entity.nameKg
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: UpdateEntityDetailsSchema,
    onSubmit: async (values) => {
      const tryUpdateEntity = async () => {
        const request = UpdateEntityDetailsSchema.cast(values) as UpdateEntityDetails
        await updateEntityDetailsMutation.mutateAsync(request)
      }

      await toast.promise(tryUpdateEntity(), {
        loading: t('Pending'),
        success: t('Success'),
        error: (err) => {
          console.error(formatYupError(err))
          return t('Failed')
        }
      })
    }
  })

  return (
    <>
      <Card>
        <CardHeader title={t('Basic details')}/>
        <Divider/>
        <CardContent>
          <Grid
            component='form'
            onSubmit={formik.handleSubmit}
            container
            spacing={3}
          >
            <Grid md={6} xs={12}>
              <FormikTextField
                name={nameof<UpdateEntityDetails>('nameRu')}
                label='Name (ru)'
                formik={formik}
                labelRequired
              />
            </Grid>

            <Grid md={6} xs={12}>
              <FormikTextField
                name={nameof<UpdateEntityDetails>('nameKg')}
                label='Name (kg)'
                formik={formik}
                labelRequired
              />
            </Grid>

            <Grid md={12} xs={12}>
              <ButtonGroup variant='contained'>
                <SubmitButton color='success'>
                  {t('Save')}
                </SubmitButton>
              </ButtonGroup>
            </Grid>

          </Grid>
        </CardContent>
      </Card>

      <UpdateEntityImage entity={entity}/>
    </>
  )
}
