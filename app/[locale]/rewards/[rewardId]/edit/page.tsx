'use client'

import { useTranslations } from "next-intl";
import {ProgressLink as Link} from "@/components/progress-link";
import { notFound } from "next/navigation";
import { Divider, Box, Button, ButtonGroup, Card, CardContent, CardHeader, Container, Typography } from "@mui/material";
import { InformationCircleOutlined } from "@/icons/information-circle-outlined";
import { ArrowLeft as ArrowLeftIcon } from "@/icons/arrow-left";
import { useReward, useUpdateReward } from "@/backend-api/reward-api";
import { Reward, UpdateReward } from "@/types/reward";
import Grid from '@mui/material/Unstable_Grid2'
import { useFormik } from "formik";
import toast from 'react-hot-toast'
import { FormikTextField } from "@/components/formik-text-field";
import { useImageUploader } from "@/hooks/use-image-uploader";
import { FileWithPath } from "react-dropzone";
import { fileToBase64 } from "@/utils/file-to-base64";
import { megabytesToBytes } from "@/utils/megabytes-to-bytes";
import { ImageUploader } from "@/components/image-uploader";
import { SubmitButton } from "@/components/buttons/submit-button";
import { UpdateRewardSchema } from "@/schemas";
import { nameof } from "@/utils/nameof";

const RewardEditDetails = ({reward}: {reward: Reward}) => {
  const imageMaxSizeMb = 3;
  const t = useTranslations()
  const updateRewardMutation = useUpdateReward()
  
  const initialValues: UpdateReward = {
    id: reward.id,
    nameRu: reward.nameRu,
    nameKg: reward.nameKg,
    imageName: reward.imageName,
    image: reward.image,
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: UpdateRewardSchema,
    onSubmit: async (values) => {
      try {
        const updateReward = UpdateRewardSchema.cast(values) as UpdateReward
        await updateRewardMutation.mutateAsync(updateReward)
        
        toast.success(t('Success'))
      } catch (err) {
        console.error(err)
        toast.error(t('Could not perform update'))
      }
    }
  })

  const previewInitial = `data:image/jpeg;base64,${reward.image}`
  const onImageAccepted = async (image: FileWithPath) => {
    let base64 = await fileToBase64(image) as string;
    base64 = base64.split(',')[1]
    
    await formik.setFieldValue(nameof<UpdateReward>('image'), base64)
    await formik.setFieldValue(nameof<UpdateReward>('imageName'), image.name);
  }
  
  const {image, preview, handleAccepted, handleRejected} = useImageUploader({imageMaxSizeMb, onImageAccepted, previewInitial})
  
  return (
    <Box
      component='form'
      onSubmit={formik.handleSubmit}
    >
      <Card sx={{mt: 3}}>
        <CardHeader title={t('Basic details')}/>
        <Divider/>
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid md={6} xs={12}>
              <FormikTextField
                name={nameof<UpdateReward>('nameRu')}
                label='Name (ru)'
                formik={formik}
              />
            </Grid>
            <Grid md={6} xs={12}>
              <FormikTextField
                name={nameof<UpdateReward>('nameKg')}
                label='Name (kg)'
                formik={formik}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      
      <Card sx={{mt: 3}}>
        <CardHeader title={t('Image')} />
        <CardContent>
          <ImageUploader
            image={image}
            imageName={reward.imageName}
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
            <SubmitButton color='success'>
              {t('Save')}
            </SubmitButton>
          </ButtonGroup>  
        </CardContent>
      </Card>
    </Box>
  )
}

const RewardFetch = ({id} : {id: number}) => {
  const {data: reward, isError} = useReward(id)
  if (isError || !reward) {
    return null
  }
  
  return (
    <RewardEditDetails reward={reward} />
  )
}

const RewardEditPage = ({params}: {
  params: {
    rewardId: number;
  }
}) => {
  const { rewardId } = params;
  const t = useTranslations();

  if (rewardId <= 0) {
    notFound();
    return null;
  }
  
  return (
    <Container maxWidth='md'>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
      >
        <Typography variant='h4'>
          {t('Reward')}
        </Typography>
        
        <div>
          <Link href={`rewards/`}>
            <ButtonGroup variant='contained'>
              <Button startIcon={<ArrowLeftIcon fontSize='small' />}>
                {t('Rewards')}
              </Button>
            </ButtonGroup>
          </Link>
          
          <Link href={`rewards/${rewardId}`}>
            <ButtonGroup variant='contained' sx={{ml: 1}}>
              <Button startIcon={<InformationCircleOutlined fontSize='small' />} color='info'>
                {t('Details')}
              </Button>
            </ButtonGroup>
          </Link>  
        </div>
      </Box>
      
      <RewardFetch id={rewardId}/>
    </Container>
  )
}

export default RewardEditPage
