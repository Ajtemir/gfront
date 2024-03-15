'use client'

import { Mother, UpdateMotherDetails, UpdateMotherImage } from "@/types/mother";
import { useTranslations } from "next-intl";
import { ButtonGroup, Card, CardContent, CardHeader, Divider } from "@mui/material";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { formatYupError } from "@/utils/format-yup-error";
import Grid from '@mui/material/Unstable_Grid2'
import { nameof } from "@/utils/nameof";
import { FormikTextField } from "@/components/formik-text-field";
import { SubmitButton } from "@/components/buttons/submit-button";
import FormikDatePicker from "@/components/formik-date-picker";
import { useUpdateMotherDetails, useUpdateMotherImage } from "@/backend-api/mother-api";
import { UpdateMotherDetailsSchema, UpdateMotherImageSchema } from "@/schemas";
import { FileWithPath } from "react-dropzone";
import { fileToBase64 } from "@/utils/file-to-base64";
import { useImageUploader } from "@/hooks/use-image-uploader";
import { megabytesToBytes } from "@/utils/megabytes-to-bytes";
import { ImageUploader } from "@/components/image-uploader";
import ChildrenContainer from "@/components/children/ChildrenContainer";
import PersonDetailView from "@/components/person/PersonDetailView";

const UpdateMotherImage = ({mother}: { mother: Mother }) => {
  const t = useTranslations()
  const updateMotherImageMutation = useUpdateMotherImage()
  const initialValues: UpdateMotherImage = {
    id: mother.id,
    imageName: mother.imageName,
    image: mother.image,
  }
  
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: UpdateMotherImageSchema,
    onSubmit: async(values) => {
      const tryUpdateMother = async () => {
        const request = UpdateMotherImageSchema.cast(values) as UpdateMotherImage
        await updateMotherImageMutation.mutateAsync(request)
      }
      
      await toast.promise(tryUpdateMother(), {
        loading: t('Loading'),
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

    await formik.setFieldValue(nameof<UpdateMotherImage>('image'), base64)
    await formik.setFieldValue(nameof<UpdateMotherImage>('imageName'), image.name);
  }
  const {image, preview, handleAccepted, handleRejected} = useImageUploader({
    imageMaxSizeMb,
    onImageAccepted,
    previewInitial: mother.image ? `data:image/jpeg;base64,${mother.image}` : null
  })
  
  return (
    <Card sx={{mt: 3}}>
      <CardHeader title={t('Image')}/>
      <Divider/>
      <CardContent>
        <form onSubmit={formik.handleSubmit}>
          <ImageUploader
            image={image}
            imageName={mother.imageName}
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

export const UpdateMother = ({mother}: { mother: Mother }) => {
  const t = useTranslations()
  const updateMotherDetailsMutation = useUpdateMotherDetails()

  const initialValues: UpdateMotherDetails = {
    id: mother.id,
    lastName: mother.lastName,
    firstName: mother.firstName,
    patronymicName: mother.patronymicName,
    pin: mother.pin,
    passportNumber: mother.passportNumber,
    birthDate: mother.birthDate,
    deathDate: mother.deathDate,
    registeredAddress: mother.registeredAddress,
    actualAddress: mother.actualAddress,
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: UpdateMotherDetailsSchema,
    onSubmit: async (values) => {
      const tryUpdateMother = async () => {
        const request = UpdateMotherDetailsSchema.cast(values) as UpdateMotherDetails
        await updateMotherDetailsMutation.mutateAsync(request)
      }

      await toast.promise(tryUpdateMother(), {
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
      <PersonDetailView person={mother.person}/>

      <Card sx={{mt:3}}>
        <CardHeader title={t('Basic details')}/>
        <Divider/>
        <CardContent>
          <Grid
            container
            spacing={3}
            component='form'
            onSubmit={formik.handleSubmit}
          >
            <Grid md={6} xs={12}>
              <FormikTextField
                name={nameof<UpdateMotherDetails>('lastName')}
                label={'Last name'}
                formik={formik}
                labelRequired
              />
            </Grid>
            <Grid md={6} xs={12}>
              <FormikTextField
                name={nameof<UpdateMotherDetails>('firstName')}
                label={'First name'}
                formik={formik}
                labelRequired
              />
            </Grid>
            <Grid md={6} xs={12}>
              <FormikTextField
                name={nameof<UpdateMotherDetails>('patronymicName')}
                label={'Patronymic name'}
                formik={formik}
              />
            </Grid>

            <Grid/>

            <Grid md={6} xs={12}>
              <FormikTextField
                name={nameof<UpdateMotherDetails>('pin')}
                label={'Pin'}
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
      <ChildrenContainer motherId={mother.id} />
      <UpdateMotherImage mother={mother}/>
    </>
  )
}
