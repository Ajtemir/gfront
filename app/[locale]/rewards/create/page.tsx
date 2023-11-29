'use client'

import { Box, Button, ButtonGroup, Card, CardContent, Container, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import Grid from '@mui/material/Unstable_Grid2'
import { FormikTextField } from "@/components/formik-text-field";
import { useFormik } from "formik";
import { ArrowLeft as ArrowLeftIcon } from "@/icons/arrow-left";
import { SubmitButton } from "@/components/buttons/submit-button";
import { ImageUploader } from "@/components/image-uploader";
import { fileToBase64 } from "@/utils/file-to-base64";
import { FileWithPath } from "react-dropzone";
import { megabytesToBytes } from "@/utils/megabytes-to-bytes";
import { CreateRewardSchema } from "@/schemas";
import { useImageUploader } from "@/hooks/use-image-uploader";
import {useCreateReward} from "@/backend-api/reward-api";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast'
import { CreateReward } from "@/types/reward";
import { nameof } from "@/utils/nameof";
import {formatYupError} from "@/utils/format-yup-error";
import {ProgressLink as Link} from "@/components/progress-link";

const initialValues: CreateReward = {
  nameRu: '',
  nameKg: '',
  image: '',
  imageName: '',
}

const CreateRewardPage = () => {
  const t = useTranslations()
  const createRewardMutation = useCreateReward()
  const router = useRouter()

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: CreateRewardSchema,
    onSubmit: async (values) => {
      const trySubmit = async () => {
        const request = CreateRewardSchema.cast(values) as CreateReward
        const reward = await createRewardMutation.mutateAsync(request)
        router.push(`/rewards/${reward.id}`)
      }

      await toast.promise(trySubmit(), {
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
    await formik.setFieldValue(nameof<CreateReward>('image'), base64)
    await formik.setFieldValue(nameof<CreateReward>('imageName'), image.name);
  }

  const {image, preview, handleAccepted, handleRejected} = useImageUploader({imageMaxSizeMb, onImageAccepted})

  return (
    <Container maxWidth='md' component='form' onSubmit={formik.handleSubmit}>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        flexWrap='wrap'
        my={1}
        mb={3}
      >
        <Typography variant='h4'>
          {t('Create a reward')}
        </Typography>

        <Link href='/rewards'>
          <ButtonGroup variant='contained'>
            <Button startIcon={<ArrowLeftIcon fontSize='small'/>}>
              {t('Rewards')}
            </Button>
          </ButtonGroup>
        </Link>
      </Box>

      <Card>
        <CardContent>
          <Grid container spacing={3}>

            <Grid md={6} xs={12}>
              <FormikTextField
                name={nameof<CreateReward>('nameRu')}
                label='Name (ru)'
                formik={formik}
                labelRequired
              />
            </Grid>

            <Grid md={6} xs={12}>
              <FormikTextField
                name={nameof<CreateReward>('nameKg')}
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
            multiple={false}
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
        </CardContent>
      </Card>
    </Container>
  )
}

export default CreateRewardPage
