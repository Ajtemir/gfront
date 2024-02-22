'use client'

import React, {useState} from 'react';
import {useTranslations} from "next-intl";
import {
    Box,
    Button,
    ButtonGroup,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Input,
    MenuItem,
    TextField,
    Typography
} from "@mui/material";
import Chip from '@mui/material/Chip';
import Grid from "@mui/material/Unstable_Grid2";
import {FormikTextField} from "@/components/formik-text-field";
import {nameof} from "@/utils/nameof";
import {UpdateReward} from "@/types/reward";
import {ImageUploader} from "@/components/image-uploader";
import {megabytesToBytes} from "@/utils/megabytes-to-bytes";
import {SubmitButton} from "@/components/buttons/submit-button";
import {useFormik} from "formik";
import {UpdateEntityDetailsSchema, UpdateRewardSchema} from "@/schemas";
import toast from "react-hot-toast";
import {Application} from "@/types/application";
import {useUpdateApplicationMutation} from "@/backend-api/application-api";
import {Pencil as PencilIcon} from "@/icons/pencil";
import {ProgressLink as Link} from "@/components/progress-link";
import {Eye} from "@/icons/eye";
import {XCircle} from "@/icons/x-circle";
import PdfViewer from '../Documents/PdfViewer';
import {Document} from "@/types/document"
import {Upload, UploadFile} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import {fileToBase64} from "@/utils/file-to-base64";
import {UpdateDocumentArgument, useUpdateDocumentMutation} from "@/backend-api/document-api";
import {UpdateEntityDetails} from "@/types/entity";
import {formatYupError} from "@/utils/format-yup-error";
import {useRewardsCandidateId} from "@/backend-api/reward-api";
import {ArrowLeft as ArrowLeftIcon} from "@/icons/arrow-left";
import {ArrowRight} from "@/icons/arrow-right";
import {Plus as PlusIcon} from "@/icons/plus";


interface DocumentProps {
    id: number
    name: string | undefined
    documentTypeName: string
    isRequired: boolean
}
export const EditApplicationForm = ({children, application} : Props) => {
    const t = useTranslations()
    const [documentState, setDocument] = React.useState<Document | null>(null)
    const initialValues = application
    const [updateApplication, {isLoading, error}] = useUpdateApplicationMutation()
    const [updateDocument, {isLoading: updateIsLoading, error: UpdateDocument}] = useUpdateDocumentMutation()
    const {data:rewards, error:rewardsError, isLoading: rewardIsLoading} = useRewardsCandidateId(application.candidateId)
    const formik = useFormik({
        initialValues: initialValues,
        // validationSchema: UpdateEntityDetailsSchema,
        onSubmit: async (values) => {
            const tryUpdateEntity = async () => {
                await updateApplication(values)
            }

            await toast.promise(tryUpdateEntity(), {
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
                            <FormikTextField
                                name={nameof<Application>('id')}
                                label='Identifier'
                                formik={formik}
                                labelRequired
                                disabled={true}
                            />
                        </Grid>
                        <Grid md={6} xs={12}>
                            <TextField
                                label='Reward Name'
                                InputLabelProps={{required: true}}
                                disabled={true}
                                value={application.reward.nameRu}
                                fullWidth={true}
                            />
                        </Grid>
                        <Grid md={6} xs={12}>
                            <TextField
                                label='Candidate Identifier'
                                InputLabelProps={{required: true}}
                                disabled={true}
                                value={application.candidateId}
                            />
                            <Link href={`/candidates/${application.candidateId}`}>
                                <Button startIcon={<ArrowRight fontSize='small'/>}>
                                    {t("Go to candidate's detail")}
                                </Button>
                            </Link>
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
                        <SubmitButton color='error'>
                            {('Delete')}
                        </SubmitButton>
                    </ButtonGroup>
                </CardContent>
            </Card>

            <Card sx={{mt: 3}}>
                <CardHeader title={('Statuses')}/>
                <Divider/>
                <CardContent>
                    <Grid
                        container
                        spacing={3}
                    >

                    </Grid>
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
                                                {
                                                        <Button startIcon={<PencilIcon fontSize='small' />} color={"success"} component="label">
                                                            {document.name ? t('Replace') : t('Upload')}
                                                            <Input type="file" style={{display:"none"}}
                                                                   onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                                                                       const argument = {
                                                                           documentId : document.id,
                                                                           file : await fileToBase64(e.target.files![0]) as string,
                                                                           fileName : e.target.files![0].name,
                                                                       } as UpdateDocumentArgument
                                                                       updateDocument(argument)

                                                                   }}/>
                                                        </Button>
                                                }

                                                {
                                                    document.name &&
                                                    <Button startIcon={<Eye fontSize='small' />} onClick={(e) => {setDocument(document)}}>
                                                        {t('View')}
                                                    </Button>
                                                }
                                                {!document.isRequired &&
                                                    <Button startIcon={<XCircle fontSize='small' />} color={'error'} onClick={async (e) => {
                                                        const argument = {
                                                            documentId : document.id,
                                                        } as UpdateDocumentArgument
                                                        updateDocument(argument)
                                                    }}>
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
            <PdfViewer document={documentState!}/>
        </Box>
    )
}

interface Props{
    children?: React.ReactNode,
    application: Application,
}
