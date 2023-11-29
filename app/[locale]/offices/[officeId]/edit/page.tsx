'use client'

import {notFound} from "next/navigation";
import {Box, Button, ButtonGroup, Card, CardContent, Container, Typography} from "@mui/material";
import {useTranslations} from "next-intl";
import {ProgressLink as Link} from "@/components/progress-link";
import {ArrowLeft as ArrowLeftIcon} from "@/icons/arrow-left";
import {useOffice, useUpdateOfficeDetails} from "@/backend-api/office-api";
import {Office, UpdateOfficeDetails} from "@/types/office";
import {useFormik} from "formik";
import {UpdateOfficeDetailsSchema} from "@/schemas";
import toast from 'react-hot-toast'
import {formatYupError} from "@/utils/format-yup-error";
import Grid from '@mui/material/Unstable_Grid2'
import {FormikTextField} from "@/components/formik-text-field";
import {nameof} from "@/utils/nameof";
import {SubmitButton} from "@/components/buttons/submit-button";
import {InformationCircleOutlined as InformationCircleOutlinedIcon} from "@/icons/information-circle-outlined";

const EditOfficeForm = ({office}: {office: Office}) => {
  const t = useTranslations()
  const updateOfficeDetailsMutation = useUpdateOfficeDetails()

  const initialValues: UpdateOfficeDetails = {
    id: office.id,
    nameRu: office.nameRu,
    nameKg: office.nameKg
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: UpdateOfficeDetailsSchema,
    onSubmit: async (values) => {
      const tryUpdate = async () => {
        const request = UpdateOfficeDetailsSchema.cast(values) as UpdateOfficeDetails
        await updateOfficeDetailsMutation.mutateAsync(request)
      }

      await toast.promise(tryUpdate(), {
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
    <Card sx={{mt: 3}}>
      <CardContent>
        <Grid
          container
          spacing={3}
          component='form'
          onSubmit={formik.handleSubmit}
        >
          <Grid md={6} xs={12}>
            <FormikTextField
              name={nameof<UpdateOfficeDetails>('id')}
              label='Id'
              formik={formik}
              labelRequired
            />
          </Grid>

          <Grid/>
          <Grid md={6} xs={12}>
            <FormikTextField
              name={nameof<UpdateOfficeDetails>('nameRu')}
              label='Name (ru)'
              formik={formik}
              labelRequired
            />
          </Grid>
          <Grid md={6} xs={12}>
            <FormikTextField
              name={nameof<UpdateOfficeDetails>('nameKg')}
              label='Name (kg)'
              formik={formik}
              labelRequired
            />
          </Grid>

          <Grid md={12} xs={12}>
            <ButtonGroup variant='contained'>
              <SubmitButton>
                {t('Save')}
              </SubmitButton>
            </ButtonGroup>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

const FetchOffice = ({officeId}: {officeId: number}) => {
  const {data: office, isLoading} = useOffice(officeId)

  if (!office || isLoading) {
    return null
  }

  return <EditOfficeForm office={office}/>
}

const EditOfficePage = ({params}:  {params: { officeId: number }}) => {
  const {officeId} = params;
  const t = useTranslations()

  if (officeId <= 0) {
    notFound()
    return null
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
          {t('Office')}
        </Typography>
        <div>
          <Link href='/offices' tabIndex={-1}>
            <ButtonGroup variant='contained'>
              <Button startIcon={<ArrowLeftIcon fontSize='small'/>}>
                {t('Offices')}
              </Button>
            </ButtonGroup>
          </Link>

          <Link href={`/offices/${officeId}`}>
            <ButtonGroup variant='contained' sx={{ ml: 1 }}>
              <Button startIcon={<InformationCircleOutlinedIcon fontSize='small'/>} color='info'>
                {t('Details')}
              </Button>
            </ButtonGroup>
          </Link>
        </div>
      </Box>

      <FetchOffice officeId={officeId}/>
    </Container>
  )
}

export default EditOfficePage
