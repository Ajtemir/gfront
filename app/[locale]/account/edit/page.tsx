'use client'

import { AuthGuard } from "@/components/auth-guard";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  CardProps,
  Container,
  Divider,
  Typography
} from "@mui/material";
import { useTranslations } from "next-intl";
import {ProgressLink as Link} from "@/components/progress-link";
import { ArrowLeft as ArrowLeftIcon } from "@/icons/arrow-left";
import { useAuth } from "@/hooks/use-auth";
import { UpdateUserDetails, User } from "@/types/user";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import Grid from '@mui/material/Unstable_Grid2'
import { FormikTextField } from "@/components/formik-text-field";
import { SubmitButton } from "@/components/buttons/submit-button";
import { ImageUploader } from "@/components/image-uploader";
import { megabytesToBytes } from "@/utils/megabytes-to-bytes";
import { useImageUploader } from "@/hooks/use-image-uploader";
import { handlePinChange } from "@/utils/handle-pin-change";
import { updateUserDetails, updateUserImage } from "@/backend-api/account-api";
import { SxProps } from "@mui/material/styles";
import { fileToBase64 } from "@/utils/file-to-base64";
import { FileWithPath } from "react-dropzone";
import { formatYupError } from "@/utils/format-yup-error";
import { nameof } from "@/utils/nameof";

interface EditAccountBasicDetailsProps extends CardProps {
  user: User;
  sx?: SxProps;
}

interface UpdateAccountPhotoProps {
  id: number;
  accountImage: string | null;
  sx?: SxProps;
}

const EditAccountBasicDetails = ({user, sx}: EditAccountBasicDetailsProps) => {
  const t = useTranslations()
  const {updateUser} = useAuth()
  
  const initialValues: UpdateUserDetails = {
    id: user.id,
    userName: user.userName,
    lastName: user.lastName,
    firstName: user.firstName,
    patronymicName: user.patronymicName,
    pin: user.pin,
    email: user.email,
  }
  
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      try {
        const update = values as UpdateUserDetails
        const userWithUpdatedDetails = await updateUserDetails(update)
        updateUser(userWithUpdatedDetails)
        
        toast.success('Success')
      } catch (err) {
        console.error(formatYupError(err))
        toast.error('Failed to update account data.')
      }
    }
  })
  
  return (
    <Card sx={sx}>
      <CardHeader title={t('Basic details')}/>
      <Divider/>
      <CardContent>
        <Grid container spacing={2} component='form' onSubmit={formik.handleSubmit}>
          <Grid md={6} xs={12}>
            <FormikTextField
              name={nameof<UpdateUserDetails>('userName')}
              label='UserName'
              formik={formik}
            />
          </Grid>
          <Grid md={6} xs={12}>
            <FormikTextField
              name={nameof<UpdateUserDetails>('pin')}
              label='Pin'
              formik={formik}
              onChange={e => handlePinChange(e, formik.handleChange)}
            />
          </Grid>
          <Grid md={6} xs={12}>
            <FormikTextField
              name={nameof<UpdateUserDetails>('lastName')}
              label='Last name'
              formik={formik}
            />
          </Grid>
          <Grid md={6} xs={12}>
            <FormikTextField
              name={nameof<UpdateUserDetails>('firstName')}
              label='First name'
              formik={formik}
            />
          </Grid>
          <Grid md={6} xs={12}>
            <FormikTextField
              name={nameof<UpdateUserDetails>('patronymicName')}
              label='Patronymic name'
              formik={formik}
            />
          </Grid>
          <Grid md={6} xs={12}>
            <FormikTextField
              name={nameof<UpdateUserDetails>('email')}
              label='Email'
              formik={formik}
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
  )
}

const UpdateAccountPhoto = ({id, accountImage, sx}: UpdateAccountPhotoProps) => {
  const imageMaxSizeMb = 3;
  const t = useTranslations()
  const {updateUser} = useAuth()
  
  const previewInitial = accountImage ? `data:image/jpeg;base64,${accountImage}` : null
  const {
    image,
    preview,
    handleAccepted,
    handleRejected} = useImageUploader({imageMaxSizeMb, previewInitial})
  
  const imageToBase64 = async (image: FileWithPath | null) => {
    if (!image) return null
    
    let base64 = await fileToBase64(image) as string;
    base64 = base64.split(',')[1]
    return base64
  }
  
  const handleImageUpdate = async () => {
    const tryToUpdateImage = async () => {
      const imageBase64 = await imageToBase64(image)
      const updatedImage = await updateUserImage({id, image: imageBase64})

      updateUser(prev => {
        if (!prev) return null;

        return {
          ...prev,
          image: updatedImage
        }
      })
    }
    
    await toast.promise(tryToUpdateImage(), {
      loading: 'Loading',
      success: 'Success',
      error: (err) => {
        console.error(err)
        return `Could not perform update: ${err}`;
      }
    })
  }

  return (
    <Card sx={sx}>
      <CardHeader title={t('Image')}/>
      <Divider/>
      <CardContent>
        <ImageUploader
          image={image}
          preview={preview}
          onDropAccepted={handleAccepted}
          onDropRejected={handleRejected}
          imageWidth={640}
          multiple={false}
          imageHeight={400}
          uploadIconSize={32}
          maxSize={megabytesToBytes(imageMaxSizeMb)}
        />
        
        <ButtonGroup variant='contained' sx={{ mt: 2}}>
          <SubmitButton color='success' onClick={handleImageUpdate}>
            {t('Save')}
          </SubmitButton>
        </ButtonGroup>
      </CardContent>
    </Card>
  )
}


const EditAccount = () => {
  const t = useTranslations()
  const {user} = useAuth()
  
  if (!user) return null
  
  return (
    <AuthGuard>
      <Container maxWidth='md'>
        <Box
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          flexWrap='wrap'
        >
          <Typography variant='h4'>
            {t('Account')}

          </Typography>
          <Link href='/account'>
            <ButtonGroup variant='contained'>
              <Button startIcon={<ArrowLeftIcon fontSize='small' />}>
                {t('Details')}
              </Button>
            </ButtonGroup>
          </Link>
        </Box>
        
        <EditAccountBasicDetails user={user} sx={{ mt: 3}} />
        <UpdateAccountPhoto id={user.id} accountImage={user.image} sx={{mt:3}} />
        
      </Container>
    </AuthGuard>
  )
}

export default EditAccount
