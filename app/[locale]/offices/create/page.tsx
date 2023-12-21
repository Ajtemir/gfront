'use client'

import {Box, ButtonGroup, Card, CardContent, Container, Typography} from "@mui/material";
import {ProgressLink as Link} from "@/components/progress-link";
import {useTranslations, AbstractIntlMessages} from "next-intl";
import {ArrowLeftButton} from "@/components/buttons/arrow-left-button";
import Grid from '@mui/material/Unstable_Grid2'
import {CreateOffice} from "@/types/office";
import {useFormik} from "formik";
import {CreateOfficeSchema} from "@/schemas";
import toast from 'react-hot-toast'
import {formatYupError} from "@/utils/format-yup-error";
import {FormikTextField} from "@/components/formik-text-field";
import {nameof} from "@/utils/nameof";
import {SubmitButton} from "@/components/buttons/submit-button";
import {FileWithPath} from "react-dropzone";
import {fileToBase64} from "@/utils/file-to-base64";
import {useImageUploader} from "@/hooks/use-image-uploader";
import {ImageUploader} from "@/components/image-uploader";
import {megabytesToBytes} from "@/utils/megabytes-to-bytes";
import {TrashButton} from "@/components/buttons/trash-button";
import {useCreateOffice, useOffices} from "@/backend-api/office-api";
import {useRouter} from "next/navigation";
import {ChangeEvent, useEffect} from "react";
import MultiSelect, {MultiselectOption} from "@/components/multi-select";

const initialValues: CreateOffice = {
  id: null,
  nameRu: '',
  nameKg: '',
  parentOffices: [],
}

const CreateOfficePage = () => {
  const t = useTranslations()
  const router = useRouter()
  const createOfficeMutation = useCreateOffice()
  const {data: offices = [], isLoading} = useOffices()
  const officesOptions = offices.map(office => {
    return {
      id : office.id,
      value : `${office.id} => ${office.nameKg}`,
      selected: false
    } as MultiselectOption
  }
);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: CreateOfficeSchema,
    onSubmit: async (values) => {
      const trySubmit = async () => {
        const request = CreateOfficeSchema.cast(values) as CreateOffice
        const office = await createOfficeMutation.mutateAsync(request)
        router.push(`/offices/${office.id}`)
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

  const handleIdChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.value = e.target.value.replace(/\D*/g, '')
    formik.handleChange(e)
  }

  return (
    <Container
      maxWidth='md'
      component='form'
      onSubmit={formik.handleSubmit}
    >
      <Box
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        flexWrap='wrap'
        my={1}
        mb={3}
      >
        <Typography variant='h4'>
          {t('Create an office')}
        </Typography>

        <Link href='/offices'>
          <ButtonGroup variant='contained'>
            <ArrowLeftButton>
              {t('Offices')}
            </ArrowLeftButton>
          </ButtonGroup>
        </Link>
      </Box>

      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid md={6} xs={12}>
              <FormikTextField
                name={nameof<CreateOffice>('id')}
                label='Id'
                formik={formik}
                labelRequired
                onChange={handleIdChange}
              />
            </Grid>
            <Grid/>

            <Grid md={6} xs={12}>
              <FormikTextField
                name={nameof<CreateOffice>('nameRu')}
                label='Name (ru)'
                formik={formik}
                labelRequired
              />
            </Grid>
            <Grid md={6} xs={12}>
              <FormikTextField
                name={nameof<CreateOffice>('nameKg')}
                label='Name (kg)'
                formik={formik}
                labelRequired
              />
            </Grid>

              <Grid md={6} xs={12}>
                  <MultiSelect
                      values={officesOptions}
                      onChange={formik.setFieldValue}
                      name={nameof<CreateOffice>('parentOffices')}
                      formik={formik}/>
              </Grid>

            <Grid md={12} xs={12}>
              <ButtonGroup variant='contained'>
                <SubmitButton>
                  {t('Submit')}
                </SubmitButton>
              </ButtonGroup>

              <ButtonGroup sx={{ml: 1}} variant='contained'>
                <TrashButton onClick={() => formik.resetForm()}>
                  {t('Clear')}
                </TrashButton>
              </ButtonGroup>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  )
}

export default CreateOfficePage
