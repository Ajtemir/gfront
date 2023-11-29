'use client'

import { Autocomplete, ButtonGroup, Card, CardContent, CardHeader, Divider, MenuItem, TextField } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import { SubmitButton } from "@/components/buttons/submit-button";
import { Foreigner, UpdateForeignerDetails, UpdateForeignerImage } from "@/types/foreigner";
import { useFormik } from "formik";
import { FileWithPath } from "react-dropzone";
import { fileToBase64 } from "@/utils/file-to-base64";
import { nameof } from "@/utils/nameof";
import { useImageUploader } from "@/hooks/use-image-uploader";
import { UpdateForeignerDetailsSchema, UpdateForeignerImageSchema } from "@/schemas";
import toast from "react-hot-toast";
import { formatYupError } from "@/utils/format-yup-error";
import { useUpdateForeignerDetails, useUpdateForeignerImage } from "@/backend-api/foreigner-api";
import { megabytesToBytes } from "@/utils/megabytes-to-bytes";
import { ImageUploader } from "@/components/image-uploader";
import Grid from '@mui/material/Unstable_Grid2'
import { Genders } from "@/types/gender";
import { FormikTextField } from "@/components/formik-text-field";
import FormikDatePicker from "@/components/formik-date-picker";
import { Citizenship } from "@/types/citizenship";
import type {Locale} from '@/i18n'
import { translateYupError } from "@/components/formik-interface";
import { notFound, useParams } from "next/navigation";
import { useCitizenships } from "@/backend-api/dictionary-api";

const UpdateForeignerImage = ({foreigner}: {foreigner: Foreigner}) => {
  const t = useTranslations()
  const updateForeignerImageMutation = useUpdateForeignerImage()
    
  const initialValues: UpdateForeignerImage = {
    id: foreigner.id,
    imageName: foreigner.imageName,
    image: foreigner.image,
  }
  
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: UpdateForeignerImageSchema,
    onSubmit: async (values) => {
      const tryUpdateForeigner = async () => {
        const request = UpdateForeignerImageSchema.cast(values) as UpdateForeignerImage
        await updateForeignerImageMutation.mutateAsync(request)
      }

      await toast.promise(tryUpdateForeigner(), {
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

    await formik.setFieldValue(nameof<UpdateForeignerImage>('image'), base64)
    await formik.setFieldValue(nameof<UpdateForeignerImage>('imageName'), image.name);
  }
  const {image, preview, handleAccepted, handleRejected} = useImageUploader({
    imageMaxSizeMb,
    onImageAccepted,
    previewInitial: foreigner.image ? `data:image/jpeg;base64,${foreigner.image}` : null
  })
  
  return (
    <Card sx={{mt: 3}}>
      <CardHeader title={t('Image')}/>
      <Divider/>
      <CardContent>
        <form onSubmit={formik.handleSubmit}>
          <ImageUploader
            image={image}
            imageName={foreigner.imageName}
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

const UpdateForeignerDetails = ({foreigner, citizenships}: {foreigner: Foreigner, citizenships: Citizenship[]}) => {
  const t = useTranslations()
  const updateForeignerDetailsMutation = useUpdateForeignerDetails()
  
  const initialValues: UpdateForeignerDetails = {
    id: foreigner.id,
    lastName: foreigner.lastName,
    firstName: foreigner.firstName,
    patronymicName: foreigner.patronymicName,
    gender: foreigner.gender,
    citizenshipId: foreigner.citizenshipId,
    citizenshipRu: foreigner.citizenshipRu,
    citizenshipKg: foreigner.citizenshipKg,
    birthDate: foreigner.birthDate,
    deathDate: foreigner.deathDate,
  }
  
  const locale = useLocale() as Locale
  
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: UpdateForeignerDetailsSchema,
    onSubmit: async (values) => {

      const tryUpdateForeigner = async () => {
        const request = UpdateForeignerDetailsSchema.cast(values) as UpdateForeignerDetails
        await updateForeignerDetailsMutation.mutateAsync(request)
      }

      await toast.promise(tryUpdateForeigner(), {
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
                name={nameof<UpdateForeignerDetails>('lastName')}
                label='Last name'
                formik={formik}
                labelRequired
              />
            </Grid>
            <Grid md={6} xs={12}>
              <FormikTextField
                name={nameof<UpdateForeignerDetails>('firstName')}
                label='First name'
                formik={formik}
                labelRequired
              />
            </Grid>
            <Grid md={6} xs={12}>
              <FormikTextField
                name={nameof<UpdateForeignerDetails>('patronymicName')}
                label='Patronymic name'
                formik={formik}
              />
            </Grid>
            
            <Grid md={6} xs={12}>
              <FormikTextField
                name={nameof<UpdateForeignerDetails>('gender')}
                label='Gender'
                formik={formik}
                select
                labelRequired
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
              <Autocomplete
                options={citizenships}
                defaultValue={{ id: initialValues.citizenshipId, nameRu: initialValues.citizenshipRu, nameKg: initialValues.citizenshipKg }}
                getOptionLabel={(option: Citizenship) => locale === 'kg' ? option.nameKg : option.nameRu}
                onChange={(e, foreigner) => formik.setFieldValue(nameof<UpdateForeignerDetails>('citizenshipId'), foreigner?.id ?? '')}
                renderOption={(props, option) => (
                  <li {...props} key={option.id.toString()}>
                    {locale === 'kg' ? option.nameKg : option.nameRu}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name={nameof<UpdateForeignerDetails>('citizenshipId')}
                    label={t('Citizenship')}
                    value={formik.values.citizenshipId ?? ''}
                    error={formik.touched.citizenshipId && Boolean(formik.errors.citizenshipId)}
                    // @ts-ignore
                    helperText={formik.touched.citizenshipId && formik.errors.citizenshipId && (<>{translateYupError(formik.errors.citizenshipId)}</>)}
                    onChange={formik.handleChange}
                    fullWidth
                    InputLabelProps={{required: true}}
                  />
                )}
              />
            </Grid>
            
            <Grid md={6} xs={12}>
              <FormikDatePicker
                name={nameof<UpdateForeignerDetails>('birthDate')}
                label='Birth date'
                formik={formik}
                labelRequired
              />
            </Grid>
            <Grid md={6} xs={12}>
              <FormikDatePicker
                name={nameof<UpdateForeignerDetails>('deathDate')}
                label='Death date'
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
      
      <UpdateForeignerImage foreigner={foreigner}/>
    </>
  )
}

export const UpdateForeigner = ({foreigner}: {foreigner: Foreigner}) => {
  const params = useParams()
  const locale = params.locale as Locale
  const {data: citizenships = [], isLoading} = useCitizenships()

  if (isLoading || !citizenships) return null

  if (!locale) {
    notFound()
    return null
  }

  return <UpdateForeignerDetails foreigner={foreigner} citizenships={citizenships} />
}
