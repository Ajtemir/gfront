'use client'

import { Citizen, UpdateCitizenDetails, UpdateCitizenImage } from "@/types/citizen";
import { ButtonGroup, Card, CardContent, CardHeader, Divider, MenuItem } from "@mui/material";
import { useTranslations } from "next-intl";
import Grid from '@mui/material/Unstable_Grid2'
import { SubmitButton } from "@/components/buttons/submit-button";
import { useUpdateCitizenDetails, useUpdateCitizenImage } from "@/backend-api/citizen-api";
import { useFormik } from "formik";
import { UpdateCitizenDetailsSchema, UpdateCitizenImageSchema } from "@/schemas";
import toast from "react-hot-toast";
import { formatYupError } from "@/utils/format-yup-error";
import { FileWithPath } from "react-dropzone";
import { fileToBase64 } from "@/utils/file-to-base64";
import { nameof } from "@/utils/nameof";
import { useImageUploader } from "@/hooks/use-image-uploader";
import { ImageUploader } from "@/components/image-uploader";
import { megabytesToBytes } from "@/utils/megabytes-to-bytes";
import { Genders } from "@/types/gender";
import { FormikTextField } from "@/components/formik-text-field";
import FormikDatePicker from "@/components/formik-date-picker";
import { Educations } from "@/types/education";

const UpdateCitizenImage = ({citizen}: {citizen: Citizen}) => {
  const t = useTranslations()
  const updateCitizenImageMutation = useUpdateCitizenImage()
  
  const initialValues: UpdateCitizenImage = {
    id: citizen.id,
    imageName: citizen.imageName,
    image: citizen.image,
  }
  
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: UpdateCitizenImageSchema,
    onSubmit: async (values) => {
      const tryUpdateCitizen = async () => {
        const request = UpdateCitizenImageSchema.cast(values) as UpdateCitizenImage
        await updateCitizenImageMutation.mutateAsync(request)
      }
      
      await toast.promise(tryUpdateCitizen(), {
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

    await formik.setFieldValue(nameof<UpdateCitizenImage>('image'), base64)
    await formik.setFieldValue(nameof<UpdateCitizenImage>('imageName'), image.name);
  }
  const {image, preview, handleAccepted, handleRejected} = useImageUploader({
    imageMaxSizeMb,
    onImageAccepted,
    previewInitial: citizen.image ? `data:image/jpeg;base64,${citizen.image}` : null
  })
  
  return (
    <Card sx={{mt: 3}}>
      <CardHeader title={t('Image')} />
      <Divider/>
      <CardContent>
        <form onSubmit={formik.handleSubmit}>
          <ImageUploader
            image={image}
            imageName={citizen.imageName}
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

export const UpdateCitizen = ({citizen}: {citizen: Citizen}) => {
  const t = useTranslations()
  const updateCitizenDetailsMutation = useUpdateCitizenDetails()
  
  const initialValues: UpdateCitizenDetails = {
    id: citizen.id,
    lastName: citizen.lastName,
    firstName: citizen.firstName,
    patronymicName: citizen.patronymicName,
    pin: citizen.pin,
    passportNumber: citizen.passportNumber,
    gender: citizen.gender,
    birthDate: citizen.birthDate,
    deathDate: citizen.deathDate,
    registeredAddress: citizen.registeredAddress,
    actualAddress: citizen.actualAddress,
    educationId: citizen.educationId,
    scienceDegree: citizen.scienceDegree,
    yearsOfWorkTotal: citizen.yearsOfWorkTotal,
    yearsOfWorkInIndustry: citizen.yearsOfWorkInIndustry,
    yearsOfWorkInCollective: citizen.yearsOfWorkInCollective,
  }
  
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: UpdateCitizenDetailsSchema,
    onSubmit: async (values) => {
      const tryUpdateCitizen = async () => {
        const request = UpdateCitizenDetailsSchema.cast(values) as UpdateCitizenDetails
        await updateCitizenDetailsMutation.mutateAsync(request)
      }
      
      await toast.promise(tryUpdateCitizen(), {
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
        <CardHeader title={t('Basic details')} />
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
                name={nameof<UpdateCitizenDetails>('pin')}
                label='Pin'
                formik={formik}
                labelRequired
              />
            </Grid>
            <Grid md={6} xs={12}>
              <FormikTextField
                name={nameof<UpdateCitizenDetails>('passportNumber')}
                label='Passport number'
                formik={formik}
                labelRequired
              />
            </Grid>
            
            <Grid md={6} xs={12}>
              <FormikTextField
                name={nameof<UpdateCitizenDetails>('lastName')}
                label='Last name'
                formik={formik}
                labelRequired
              />
            </Grid>
            <Grid md={6} xs={12}>
              <FormikTextField
                name={nameof<UpdateCitizenDetails>('firstName')}
                label='First name'
                formik={formik}
                labelRequired
              />
            </Grid>
            <Grid md={6} xs={12}>
              <FormikTextField
                name={nameof<UpdateCitizenDetails>('patronymicName')}
                label='Patronymic name'
                formik={formik}
              />
            </Grid>
            <Grid md={6} xs={12}>
              <FormikTextField
                name={nameof<UpdateCitizenDetails>('gender')}
                label='Gender'
                formik={formik}
                labelRequired
                select
              >
                <MenuItem value=''>
                  {t("Not selected")}
                </MenuItem>
                {Genders.map(gender => (
                  <MenuItem key={gender.id} value={gender.name}>
                    {t(gender.name)}
                  </MenuItem>
                ))}
              </FormikTextField>
            </Grid>
            
            
            <Grid md={6} xs={12}>
              <FormikTextField
                name={nameof<UpdateCitizenDetails>('registeredAddress')}
                label='Registered address'
                formik={formik}
                labelRequired
              />
            </Grid>
            <Grid md={6} xs={12}>
              <FormikTextField
                name={nameof<UpdateCitizenDetails>('actualAddress')}
                label='Actual address'
                formik={formik}
              />
            </Grid>
            
            <Grid md={6} xs={12}>
              <FormikTextField
                name={nameof<UpdateCitizenDetails>('educationId')}
                label='Education'
                formik={formik}
                labelRequired
                select
              >
                <MenuItem value=''>
                  {t('Not selected')}
                </MenuItem>
                {Educations.map(education => (
                  <MenuItem key={education.id} value={education.id}>
                    {t(education.name)}
                  </MenuItem>
                ))}
              </FormikTextField>
            </Grid>
            
            <Grid md={6} xs={12}>
              <FormikTextField
                name={nameof<UpdateCitizenDetails>('scienceDegree')}
                label='Science degree'
                formik={formik}
              />
            </Grid>
            
            <Grid md={6} xs={12}>
              <FormikDatePicker
                name={nameof<UpdateCitizenDetails>('birthDate')}
                label='Birth date'
                formik={formik}
                labelRequired
              />
            </Grid>

            <Grid md={6} xs={12}>
              <FormikDatePicker
                name={nameof<UpdateCitizenDetails>('deathDate')}
                label='Death date'
                formik={formik}
                labelRequired
              />
            </Grid>

            <Grid md={4} xs={12}>
              <FormikTextField
                name={nameof<UpdateCitizenDetails>('yearsOfWorkTotal')}
                label='Years of work in total'
                formik={formik}
                type='tel'
                labelRequired
              />
            </Grid>
            <Grid md={4} xs={12}>
              <FormikTextField
                name={nameof<UpdateCitizenDetails>('yearsOfWorkInIndustry')}
                label='Years of work in industry'
                formik={formik}
                type='tel'
                labelRequired
              />
            </Grid>
            <Grid md={4} xs={12}>
              <FormikTextField
                name={nameof<UpdateCitizenDetails>('yearsOfWorkInCollective')}
                label='Years of work in collective'
                formik={formik}
                type='tel'
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
      
      <UpdateCitizenImage citizen={citizen}/>
    </>
  )
}
