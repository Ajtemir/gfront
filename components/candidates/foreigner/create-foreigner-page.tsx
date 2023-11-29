'use client'

import {Autocomplete, Box, ButtonGroup, Card, CardContent, MenuItem, TextField} from "@mui/material";
import { ImageUploader } from "@/components/image-uploader";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { fileToBase64 } from "@/utils/file-to-base64";
import { FileWithPath } from "react-dropzone";
import Grid from "@mui/material/Unstable_Grid2";
import { FormikTextField } from "@/components/formik-text-field";
import { Genders } from "@/types/gender";
import FormikDatePicker from "@/components/formik-date-picker";
import { megabytesToBytes } from "@/utils/megabytes-to-bytes";
import { SubmitButton } from "@/components/buttons/submit-button";
import { useTranslations } from "next-intl";
import { useImageUploader } from "@/hooks/use-image-uploader";
import { CreateForeigner } from "@/types/foreigner";
import { CreateForeignerSchema } from "@/schemas";
import { useCitizenships } from "@/backend-api/dictionary-api";
import { Citizenship } from "@/types/citizenship";
import type { Locale } from "@/i18n";
import { notFound, useParams, useRouter } from "next/navigation";
import { useCreateForeigner } from "@/backend-api/foreigner-api";
import { formatYupError } from "@/utils/format-yup-error";
import {translateYupError} from "@/components/formik-interface";
import { nameof } from "@/utils/nameof";
import {TrashButton} from "@/components/buttons/trash-button";
import {LightBulbButton} from "@/components/buttons/light-bulb-button";
import {EnvironmentGuard} from "@/components/environment-guard";

const initialValues: CreateForeigner = {
  lastName: '',
  firstName: '',
  patronymicName: '',
  gender: '',
  citizenshipId: null,
  birthDate: null,
  deathDate: null,
  image: '',
  imageName: '',
}

export const CreateForeignerPage = () => {
  const params = useParams()
  const locale = params.locale as Locale
  const {data: citizenships = [], isLoading} = useCitizenships()

  if (isLoading || !citizenships) return null
  
  if (!locale) {
    notFound()
    return null
  }

  return <CreateForeignerForm citizenships={citizenships} locale={locale}/>
}

const CreateForeignerForm = ({
  citizenships,
  locale,
}: {
  citizenships: Citizenship[],
  locale: Locale,
}) => {
  const t = useTranslations()
  const router = useRouter()
  const createForeignerMutation = useCreateForeigner();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: CreateForeignerSchema,
    onSubmit: async (values) => {
      const submitForeigner = async () => {
        const request = CreateForeignerSchema.cast(values) as CreateForeigner
        const foreigner = await createForeignerMutation.mutateAsync(request)
        router.push(`candidates/${foreigner.id}`)
      }

      await toast.promise(submitForeigner(), {
        loading: t('Pending'),
        success: t('Success'),
        error: (err) => {
          console.error(formatYupError(err))
          return t('Failed')
        }
      })
    }
  })

  const imageMaxSizeMb = 3;
  const onImageAccepted = async (image: FileWithPath) => {
    let base64 = await fileToBase64(image) as string;
    base64 = base64.split(',')[1]
    await formik.setFieldValue(nameof<CreateForeigner>('image'), base64)
    await formik.setFieldValue(nameof<CreateForeigner>('imageName'), image.name)
  }
  const {image, preview, handleAccepted, handleRejected} = useImageUploader({imageMaxSizeMb, onImageAccepted})

  const generateTestData = async () => {
    await Promise.all([
      formik.setFieldValue(nameof<CreateForeigner>('lastName'), 'Smith'),
      formik.setFieldValue(nameof<CreateForeigner>('firstName'), 'Will'),
      formik.setFieldValue(nameof<CreateForeigner>('patronymicName'), 'Junior'),
      formik.setFieldValue(nameof<CreateForeigner>('gender'), 'Male'),
      formik.setFieldValue(nameof<CreateForeigner>('birthDate'), new Date(1999, 6, 8)),
      formik.setFieldValue(nameof<CreateForeigner>('deathDate'), new Date(2022, 12, 24)),
    ])
  }

  return (
    <Box component='form' onSubmit={formik.handleSubmit}>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid md={6} xs={12}>
              <FormikTextField
                name={nameof<CreateForeigner>('lastName')}
                label='Last name'
                formik={formik}
                labelRequired
              />
            </Grid>

            <Grid md={6} xs={12}>
              <FormikTextField
                name={nameof<CreateForeigner>('firstName')}
                label='First name'
                formik={formik}
                labelRequired
              />
            </Grid>

            <Grid md={6} xs={12}>
              <FormikTextField
                name={nameof<CreateForeigner>('patronymicName')}
                label='Patronymic name'
                formik={formik}
              />
            </Grid>

            <Grid md={6} xs={12}>
              <FormikTextField
                name={nameof<CreateForeigner>('gender')}
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
                getOptionLabel={(option: Citizenship) => locale === 'kg' ? option.nameKg : option.nameRu}
                onChange={(e, foreigner) => formik.setFieldValue(nameof<CreateForeigner>('citizenshipId'), foreigner?.id ?? '')}
                renderOption={(props, option) => (
                    <li {...props} key={option.id.toString()}>
                      {locale === 'kg' ? option.nameKg : option.nameRu}
                    </li>
                  )}
                renderInput={(params) => (
                    <TextField
                      {...params}
                      name={nameof<CreateForeigner>('citizenshipId')}
                      label={t('Citizenship')}
                      value={formik.values.citizenshipId ?? ''}
                      error={formik.touched.citizenshipId && Boolean(formik.errors.citizenshipId)}
                      // @ts-ignore
                      helperText={formik.touched.citizenshipId && formik.errors.citizenshipId && (<>{translateYupError(formik.errors.citizenshipId, t)}</>)}
                      onChange={formik.handleChange}
                      fullWidth
                      InputLabelProps={{required: true}}
                    />
                  )}
              />
            </Grid>

            <Grid/>

            <Grid md={6} xs={12}>
              <FormikDatePicker name={nameof<CreateForeigner>('birthDate')} label='Birth date' formik={formik} labelRequired/>
            </Grid>

            <Grid md={6} xs={12}>
              <FormikDatePicker name={nameof<CreateForeigner>('deathDate')} label='Death date' formik={formik}/>
            </Grid>

          </Grid>
        </CardContent>
      </Card>

      <Card sx={{mt: 3}}>
        <CardContent>
          <ImageUploader
            image={image}
            preview={preview}
            onDropAccepted={handleAccepted}
            onDropRejected={handleRejected}
            imageWidth={640}
            imageHeight={400}
            uploadIconSize={32}
            maxSize={megabytesToBytes(imageMaxSizeMb)}
          />
        </CardContent>
      </Card>

      <Card sx={{mt: 3}}>
        <CardContent>
          <ButtonGroup variant='contained'>
            <SubmitButton>
              {t('Submit')}
            </SubmitButton>
          </ButtonGroup>

          <EnvironmentGuard>
            <ButtonGroup variant="contained" sx={{ml: 1}}>
              <LightBulbButton onClick={generateTestData}>
                {t('Generate')}
              </LightBulbButton>
              <TrashButton onClick={() => formik.resetForm()}>
                {t('Clear')}
              </TrashButton>
            </ButtonGroup>
          </EnvironmentGuard>

        </CardContent>
      </Card>
    </Box>
  )
}
