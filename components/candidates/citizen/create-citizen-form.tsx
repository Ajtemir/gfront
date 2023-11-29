'use client'

import { useFormik } from "formik";
import toast from "react-hot-toast";
import { Box, ButtonGroup, Card, CardContent, MenuItem } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'
import { FormikTextField } from "@/components/formik-text-field";
import { handlePinChange } from "@/utils/handle-pin-change";
import { Genders } from "@/types/gender";
import { useTranslations } from "next-intl";
import { ImageUploader } from "@/components/image-uploader";
import { fileToBase64 } from "@/utils/file-to-base64";
import { FileWithPath } from "react-dropzone";
import { megabytesToBytes } from "@/utils/megabytes-to-bytes";
import { SubmitButton } from "@/components/buttons/submit-button";
import { Educations } from "@/types/education";
import FormikDatePicker from "@/components/formik-date-picker";
import { useImageUploader } from "@/hooks/use-image-uploader";
import { CreateCitizen } from "@/types/citizen";
import { formatYupError } from "@/utils/format-yup-error";
import { CreateCitizenSchema } from "@/schemas";
import { useRouter } from "next/navigation";
import { useCreateCitizen } from "@/backend-api/citizen-api";
import { nameof } from "@/utils/nameof";
import {EnvironmentGuard} from "@/components/environment-guard";
import {LightBulbButton} from "@/components/buttons/light-bulb-button";
import {TrashButton} from "@/components/buttons/trash-button";

const initialValues: CreateCitizen = {
  lastName: '',
  firstName: '',
  patronymicName: '',
  pin: '',
  passportNumber: '',
  gender: '',
  birthDate: null,
  deathDate: null,
  registeredAddress: '',
  actualAddress: '',
  educationId: null,
  scienceDegree: '',
  yearsOfWorkTotal: null,
  yearsOfWorkInIndustry: null,
  yearsOfWorkInCollective: null,
  image: '',
  imageName: '',
}

export const CreateCitizenForm = () => {
  const t = useTranslations()
  const router = useRouter()
  const createCitizenMutation = useCreateCitizen()
  
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: CreateCitizenSchema,
    onSubmit: async (values) => {
      const submitCitizen = async () => {
        const request = CreateCitizenSchema.cast(values) as CreateCitizen
        const citizen = await createCitizenMutation.mutateAsync(request)
        router.push(`candidates/${citizen.id}`)
      }
      
      await toast.promise(submitCitizen(), {
        loading: t('Pending'),
        success: t('Success'),
        error: (err) => {
          console.error(formatYupError(err))
          return t('Failed')
        }
      })
    }
  })


  const onImageAccepted = async (image: FileWithPath) => {
    let base64 = await fileToBase64(image) as string;
    base64 = base64.split(',')[1]
    await formik.setFieldValue(nameof<CreateCitizen>('image'), base64)
    await formik.setFieldValue(nameof<CreateCitizen>('imageName'), image.name)
  }
  
  const imageMaxSizeMb = 3;
  const {image, preview, handleAccepted, handleRejected} = useImageUploader({imageMaxSizeMb, onImageAccepted})

  const generateTestData = async () => {
    await Promise.all([
      formik.setFieldValue(nameof<CreateCitizen>('lastName'), 'Айтматов'),
      formik.setFieldValue(nameof<CreateCitizen>('firstName'), 'Чингиз'),
      formik.setFieldValue(nameof<CreateCitizen>('patronymicName'), 'Торекулович'),
      formik.setFieldValue(nameof<CreateCitizen>('gender'), 'Male'),
      formik.setFieldValue(nameof<CreateCitizen>('pin'), '12345678901234'),
      formik.setFieldValue(nameof<CreateCitizen>('passportNumber'), 'ID1234567'),
      formik.setFieldValue(nameof<CreateCitizen>('birthDate'), new Date(1928, 11, 12)),
      formik.setFieldValue(nameof<CreateCitizen>('deathDate'), new Date(2008,5, 10)),
      formik.setFieldValue(nameof<CreateCitizen>('registeredAddress'), 'Бишкек, пр. Чуй 1'),
      formik.setFieldValue(nameof<CreateCitizen>('actualAddress'), 'Бишкек, пр. Чуй 1'),
      formik.setFieldValue(nameof<CreateCitizen>('scienceDegree'), 'Писатель'),
      formik.setFieldValue(nameof<CreateCitizen>('educationId'), Educations['5']?.id || null),
      formik.setFieldValue(nameof<CreateCitizen>('yearsOfWorkTotal'), '56'),
      formik.setFieldValue(nameof<CreateCitizen>('yearsOfWorkInIndustry'), '56'),
      formik.setFieldValue(nameof<CreateCitizen>('yearsOfWorkInCollective'), '56'),
    ])
  }

  return (
    <Box component='form' onSubmit={formik.handleSubmit}>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid md={6} xs={12}>
              <FormikTextField
                name={nameof<CreateCitizen>('pin')}
                label='Pin'
                formik={formik}
                labelRequired
                onChange={e => handlePinChange(e, formik.handleChange)}
              />
            </Grid>

            <Grid md={6} xs={12}>
              <FormikTextField
                name={nameof<CreateCitizen>('passportNumber')}
                label='Passport number'
                formik={formik}
                labelRequired
                inputProps={{style: {textTransform: 'uppercase'}}}
              />
            </Grid>

            <Grid md={6} xs={12}>
              <FormikTextField
                name={nameof<CreateCitizen>('lastName')}
                label='Last name'
                formik={formik}
                labelRequired
              />
            </Grid>
            <Grid md={6} xs={12}>
              <FormikTextField
                name={nameof<CreateCitizen>('firstName')}
                label='First name'
                formik={formik}
                labelRequired
              />
            </Grid>
            <Grid md={6} xs={12}>
              <FormikTextField
                name={nameof<CreateCitizen>('patronymicName')}
                label='Patronymic name'
                formik={formik}
              />
            </Grid>

            <Grid md={6} xs={12}>
              <FormikTextField
                name={nameof<CreateCitizen>('gender')}
                label='Gender'
                formik={formik}
                select
                labelRequired
              >
                <MenuItem value=''>
                  {t('Not selected')}
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
                name={nameof<CreateCitizen>('registeredAddress')}
                label='Registered address'
                formik={formik}
                labelRequired
              />
            </Grid>

            <Grid md={6} xs={12}>
              <FormikTextField
                name={nameof<CreateCitizen>('actualAddress')}
                label='Actual address'
                formik={formik}
              />
            </Grid>

            <Grid md={6} xs={12}>
              <FormikTextField
                name={nameof<CreateCitizen>('educationId')}
                label='Education'
                formik={formik}
                select
                labelRequired
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
                name={nameof<CreateCitizen>('scienceDegree')}
                label='Science degree'
                formik={formik}
              />
            </Grid>
            
            <Grid md={4} xs={12}>
              <FormikTextField
                name={nameof<CreateCitizen>('yearsOfWorkTotal')}
                label='Years of work in total'
                formik={formik}
                type='tel'
                labelRequired
              />
            </Grid>
            <Grid md={4} xs={12}>
              <FormikTextField
                name={nameof<CreateCitizen>('yearsOfWorkInIndustry')}
                label='Years of work in industry'
                formik={formik}
                type='tel'
                labelRequired
              />
            </Grid>
            <Grid md={4} xs={12}>
              <FormikTextField
                name={nameof<CreateCitizen>('yearsOfWorkInCollective')}
                label='Years of work in collective'
                formik={formik}
                type='tel'
                labelRequired
              />
            </Grid>

            <Grid md={6} xs={12}>
              <FormikDatePicker name={nameof<CreateCitizen>('birthDate')} label='Birth date' formik={formik} labelRequired/>
            </Grid>

            <Grid md={6} xs={12}>
              <FormikDatePicker name={nameof<CreateCitizen>('deathDate')} label='Death date' formik={formik}/>
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
            <ButtonGroup variant='contained' sx={{ml:1}}>
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
