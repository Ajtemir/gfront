'use client'

import React from 'react';
import {useTranslations} from "next-intl";
import {Box, Button, ButtonGroup, Card, CardContent, CardHeader, Divider, Input} from "@mui/material";
import Chip from '@mui/material/Chip';
import Grid from "@mui/material/Unstable_Grid2";
import {FormikTextField} from "@/components/formik-text-field";
import {nameof} from "@/utils/nameof";
import {UpdateReward} from "@/types/reward";
import {ImageUploader} from "@/components/image-uploader";
import {megabytesToBytes} from "@/utils/megabytes-to-bytes";
import {SubmitButton} from "@/components/buttons/submit-button";
import {useFormik} from "formik";
import {UpdateRewardSchema} from "@/schemas";
import toast from "react-hot-toast";
import {Application} from "@/types/application";
import {useUpdateApplicationMutation} from "@/backend-api/application-api";
import {Pencil as PencilIcon} from "@/icons/pencil";
import {ProgressLink as Link} from "@/components/progress-link";
import {Eye} from "@/icons/eye";
import {XCircle} from "@/icons/x-circle";
import PdfViewer from '../Documents/PdfViewer';


interface DocumentProps {
    id: number
    name: string | undefined
    documentTypeName: string
    isRequired: boolean
}
export const EditApplicationForm = ({children, application} : Props) => {
    const t = useTranslations()
    const initialValues = application
    const [updateApplication, {isLoading, error}] = useUpdateApplicationMutation()
    // const formik = useFormik({
    //     initialValues: initialValues,
    //     onSubmit: async (values) => {
    //         try {
    //             // await updateApplication(values)
    //             toast.success(('Success'))
    //         } catch (err) {
    //             console.error(err)
    //             toast.error(('Could not perform update'))
    //         }
    //     }
    // })

    const document = {
        name: 'Паспорт',
        documentTypeName: 'Выписки из постановлений или распоряжений полномочного представителя Президента Кыргызской Республики в области, мэрий городов Бишкек и Ош',
        id:1,
        isRequired: false,
    } as DocumentProps
    return (
        <Box
            component='form'
            // onSubmit={formik.handleSubmit}
        >
            <Card sx={{mt: 3}}>
                <CardHeader title={('Basic details')}/>
                <Divider/>
                <CardContent>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid md={6} xs={12}>

                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Card sx={{mt: 3}}>
                <CardContent>
                    <ButtonGroup variant='contained'>
                        <SubmitButton color='success'>
                            {('Save')}
                        </SubmitButton>
                    </ButtonGroup>
                </CardContent>
            </Card>

            <Card sx={{mt: 3}}>
                <CardHeader title={('Documents')}/>
                <Divider/>
                <CardContent>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid md={6} xs={12}>


                            <CardContent sx={{justifyContent: "space-between", display: "flex"}}>

                                    <h3>Id: {document.id} ({document.isRequired ? 'Required': 'Optional'})</h3>

                                    <Link href='account/edit'>
                                        <ButtonGroup variant='contained'>
                                            <Button startIcon={<PencilIcon fontSize='small' />}>
                                                {t('Replace')}
                                            </Button>
                                        </ButtonGroup>
                                    </Link>

                                    {/*<Link href='account/edit'>*/}
                                    {/*    <ButtonGroup variant='contained'>*/}
                                    {/*        <Button startIcon={<Eye fontSize='small' />} style={{marginTop:'20px'}}>*/}
                                    {/*            {t('View')}*/}
                                    {/*        </Button>*/}
                                    {/*    </ButtonGroup>*/}
                                    {/*</Link>*/}

                                    <Link href='account/edit'>
                                        <ButtonGroup variant='contained'>
                                            <Button startIcon={<XCircle fontSize='small' />}>
                                                {t('Delete')}
                                            </Button>
                                        </ButtonGroup>
                                    </Link>



                                {/*</div>*/}


                            </CardContent>
                            {/*<FormikTextField*/}
                            {/*    name={nameof<UpdateReward>('nameKg')}*/}
                            {/*    label='Name (kg)'*/}
                            {/*/>*/}
                        </Grid>
                        <Grid md={6} xs={12}>
                            <CardContent sx={{justifyContent: "space-between", display: "flex"}}>
                                <header>{document.documentTypeName}</header>
                            </CardContent>
                        </Grid>

                    </Grid>
                </CardContent>
            </Card>
            <PdfViewer/>

            {/*<Card sx={{mt: 3}}>*/}
            {/*    <CardHeader title={t('Documents')} />*/}
            {/*    <CardContent>*/}
            {/*        <ImageUploader*/}
            {/*            image={image}*/}
            {/*            imageName={reward.imageName}*/}
            {/*            preview={preview}*/}
            {/*            multiple={false}*/}
            {/*            onDropAccepted={handleAccepted}*/}
            {/*            onDropRejected={handleRejected}*/}
            {/*            imageWidth={640}*/}
            {/*            imageHeight={400}*/}
            {/*            uploadIconSize={32}*/}
            {/*            maxSize={megabytesToBytes(imageMaxSizeMb)}*/}
            {/*        />*/}
            {/*    </CardContent>*/}
            {/*</Card>*/}



        </Box>
    )
}

interface Props{
    children?: React.ReactNode,
    application: Application,
}
