'use client'

import { ImageUploader } from "@/components/image-uploader";
import { useTranslations } from "next-intl";
import { useFormik } from "formik";
import { Box, ButtonGroup, Card, CardContent } from "@mui/material";
import { megabytesToBytes } from "@/utils/megabytes-to-bytes";
import { SubmitButton } from "@/components/buttons/submit-button";
import { fileToBase64 } from "@/utils/file-to-base64";
import { FileWithPath } from "react-dropzone";
import toast from "react-hot-toast";
import Grid from "@mui/material/Unstable_Grid2";
import { FormikTextField } from "@/components/formik-text-field";
import { useImageUploader } from "@/hooks/use-image-uploader";
import { CreateEntity } from "@/types/entity";
import { CreateEntitySchema } from "@/schemas";
import { useCreateEntity } from "@/backend-api/entity-api";
import { useRouter } from "next/navigation";
import { formatYupError } from "@/utils/format-yup-error";
import { nameof } from "@/utils/nameof";
import {EnvironmentGuard} from "@/components/environment-guard";
import {LightBulbButton} from "@/components/buttons/light-bulb-button";
import {TrashButton} from "@/components/buttons/trash-button";

const initialValues: CreateEntity = {
  nameRu: '',
  nameKg: '',
  image: '',
  imageName: '',
}

export const CreateEntityForm = () => {
  const t = useTranslations()
  const router = useRouter()
  const createEntityMutation = useCreateEntity();
  
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: CreateEntitySchema,
    onSubmit: async (values) => {
      const submitEntityPromise = async () => {
        const request = CreateEntitySchema.cast(values) as CreateEntity;
        const entity = await createEntityMutation.mutateAsync(request);
        router.push(`candidates/${entity.id}`)
      }
      
      await toast.promise(submitEntityPromise(), {
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
    
    await formik.setFieldValue(nameof<CreateEntity>('image'), base64)
    await formik.setFieldValue(nameof<CreateEntity>('imageName'), image.name)
  }
  const imageMaxSizeMb = 3;
  const {image, preview, handleAccepted, handleRejected} = useImageUploader({imageMaxSizeMb, onImageAccepted})

  const generateTestData = async () => {
    await Promise.all([
      formik.setFieldValue(nameof<CreateEntity>('nameRu'), 'Infocom'),
      formik.setFieldValue(nameof<CreateEntity>('nameKg'), 'Infocom'),
    ])
  }
  
  return (
    <Box component='form' onSubmit={formik.handleSubmit}
    >
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid md={6} xs={12}>
              <FormikTextField
                name={nameof<CreateEntity>('nameRu')}
                label='Name (ru)'
                formik={formik}
                labelRequired
              />
            </Grid>
            
            <Grid md={6} xs={12}>
              <FormikTextField
                name={nameof<CreateEntity>('nameKg')}
                label='Name (kg)'
                formik={formik}
                labelRequired
              />
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
