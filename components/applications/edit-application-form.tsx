'use client'

import React, {useState} from 'react';
import {useTranslations} from "next-intl";
import {Box, Button, ButtonGroup, Card, CardContent, CardHeader, Divider, Input, Typography} from "@mui/material";
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
import Document from "@/types/document"


interface DocumentProps {
    id: number
    name: string | undefined
    documentTypeName: string
    isRequired: boolean
}
export const EditApplicationForm = ({children, application} : Props) => {
    const t = useTranslations()
    const [documentState, setDocument] = useState<Document>(null)
    const initialValues = application
    const [updateApplication, {isLoading, error}] = useUpdateApplicationMutation()
    return (
        <Box
            component='form'
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
                        {application.documents.map((document) =>
                            (
                                <>
                                    <Grid md={6} xs={12}>
                                        <CardContent sx={{justifyContent: "space-between", display: "flex"}}>
                                            <h3 style={{display:"flex"}}>
                                                {document.id}
                                                {
                                                    document.isRequired
                                                    ? <Typography style={{color: 'red'}} display={"inline"}>(*Обьязательный)</Typography>
                                                    : <Typography style={{color: 'green'}} display={"inline"}>(Опциональный)</Typography>
                                                }
                                            </h3>
                                            <ButtonGroup variant='contained'>
                                                <Button startIcon={<PencilIcon fontSize='small' />} color={"success"}>

                                                    {document.name ? t('Replace') : t('Upload')}
                                                </Button>
                                                {
                                                    document.name &&
                                                    <Button startIcon={<Eye fontSize='small' />} onClick={(e) => {setDocument(document)}}>
                                                        {t('View')}
                                                    </Button>
                                                }
                                                {!document.isRequired &&
                                                    <Button startIcon={<XCircle fontSize='small' />} color={'error'}>
                                                        {t('Delete')}
                                                    </Button>
                                                }
                                            </ButtonGroup>
                                        </CardContent>
                                    </Grid>
                                    <Grid md={6} xs={12}>
                                        <CardContent sx={{justifyContent: "space-between", display: "flex"}}>
                                            <header>{document.documentTypeName}</header>
                                        </CardContent>
                                    </Grid>
                                </>
                            )
                        )}
                    </Grid>

                </CardContent>
            </Card>
            <PdfViewer document={documentState}/>
        </Box>
    )
}

interface Props{
    children?: React.ReactNode,
    application: Application,
}
