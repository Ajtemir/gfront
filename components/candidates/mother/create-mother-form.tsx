'use client'

import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { ImageUploader } from "@/components/image-uploader";
import { fileToBase64 } from "@/utils/file-to-base64";
import { FileWithPath } from "react-dropzone";
import { Box, ButtonGroup, Card, CardContent } from "@mui/material";
import { useFormik } from "formik";
import Grid from "@mui/material/Unstable_Grid2";
import { FormikTextField } from "@/components/formik-text-field";
import { handlePinChange } from "@/utils/handle-pin-change";
import FormikDatePicker from "@/components/formik-date-picker";
import { megabytesToBytes } from "@/utils/megabytes-to-bytes";
import { SubmitButton } from "@/components/buttons/submit-button";
import { useImageUploader } from "@/hooks/use-image-uploader";
import { CreateMother } from "@/types/mother";
import { useCreateMother } from "@/backend-api/mother-api";
import { CreateMotherSchema } from "@/schemas";
import { useRouter } from "next/navigation";
import { formatYupError } from "@/utils/format-yup-error";
import { nameof } from "@/utils/nameof";
import {EnvironmentGuard} from "@/components/environment-guard";
import {LightBulbButton} from "@/components/buttons/light-bulb-button";
import {TrashButton} from "@/components/buttons/trash-button";

const initialValues: CreateMother = {
  lastName: '',
  firstName: '',
  patronymicName: '',
  pin: '',
  passportNumber: '',
  registeredAddress: '',
  actualAddress: '',
  birthDate: null,
  deathDate: null,
  image: '',
  imageName: '',
}

export const CreateMotherForm = () => {
  const t = useTranslations()
  const router = useRouter()
  const createMotherMutation = useCreateMother()

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      const submitMother = async () => {
        const request = CreateMotherSchema.cast(values) as CreateMother
        const mother = await createMotherMutation.mutateAsync(request)
        router.push(`candidates/${mother.id}`)
      }
      
      await toast.promise(submitMother(), {
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
    await formik.setFieldValue(nameof<CreateMother>('image'), base64)
    await formik.setFieldValue(nameof<CreateMother>('imageName'), image.name)
  }
  const imageMaxSizeMb = 3;

  const {image, preview, handleAccepted, handleRejected} = useImageUploader({imageMaxSizeMb, onImageAccepted})

  const generateTestData = async () => {
    await Promise.all([
      formik.setFieldValue(nameof<CreateMother>('lastName'), 'Самара'),
      formik.setFieldValue(nameof<CreateMother>('firstName'), 'Каримова'),
      formik.setFieldValue(nameof<CreateMother>('patronymicName'), 'Эрмековна'),
      formik.setFieldValue(nameof<CreateMother>('pin'), '12345678901234'),
      formik.setFieldValue(nameof<CreateMother>('passportNumber'), 'ID1234567'),
      formik.setFieldValue(nameof<CreateMother>('birthDate'), new Date(1999, 6, 8)),
      formik.setFieldValue(nameof<CreateMother>('deathDate'), new Date(2022, 12, 24)),
      formik.setFieldValue(nameof<CreateMother>('registeredAddress'), 'Бишкек, пр. Чуй 1'),
      formik.setFieldValue(nameof<CreateMother>('actualAddress'), 'Бишкек, пр. Чуй 1'),
    ])
  }
  
  return (
    <Box component='form' onSubmit={formik.handleSubmit}>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid md={6} xs={12}>
              <FormikTextField
                name={nameof<CreateMother>('pin')}
                label='Pin'
                formik={formik}
                labelRequired
                onChange={e => handlePinChange(e, formik.handleChange)}
              />
            </Grid>

            <Grid md={6} xs={12}>
              <FormikTextField
                name={nameof<CreateMother>('passportNumber')}
                label='Passport number'
                formik={formik}
                labelRequired
                inputProps={{style: {textTransform: 'uppercase'}}}
              />
            </Grid>

            <Grid md={6} xs={12}>
              <FormikTextField
                name={nameof<CreateMother>('lastName')}
                label='Last name'
                formik={formik}
                labelRequired
              />
            </Grid>
            <Grid md={6} xs={12}>
              <FormikTextField
                name={nameof<CreateMother>('firstName')}
                label='First name'
                formik={formik}
                labelRequired
              />
            </Grid>
            <Grid md={6} xs={12}>
              <FormikTextField
                name={nameof<CreateMother>('patronymicName')}
                label='Patronymic name'
                formik={formik}
              />
            </Grid>

            <Grid md={6} xs={12} />
            
            <Grid md={6} xs={12}>
              <FormikTextField
                name={nameof<CreateMother>('registeredAddress')}
                label='Registered address'
                formik={formik}
                labelRequired
              />
            </Grid>

            <Grid md={6} xs={12}>
              <FormikTextField
                name={nameof<CreateMother>('actualAddress')}
                label='Actual address'
                formik={formik}
              />
            </Grid>

            <Grid md={6} xs={12}>
              <FormikDatePicker name={nameof<CreateMother>('birthDate')} label='Birth date' formik={formik} labelRequired/>
            </Grid>

            <Grid md={6} xs={12}>
              <FormikDatePicker name={nameof<CreateMother>('deathDate')} label='Death date' formik={formik}/>
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
            <ButtonGroup variant='contained' sx={{ml: 1}}>
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
