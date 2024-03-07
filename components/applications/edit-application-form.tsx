'use client'

import React, {useState} from 'react';
import {useFormatter, useTranslations} from "next-intl";
import {
    Box,
    Button,
    ButtonGroup,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Input,
    MenuItem, Paper,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead, TableRow,
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
import DocumentList from "@/components/Documents/DocumentList";


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
    const [updateDocument, {data:updatedDocumentData, isLoading: updateIsLoading, error: updateDocumentError}] = useUpdateDocumentMutation()
    const {data:rewards, error:rewardsError, isLoading: rewardIsLoading} = useRewardsCandidateId(application.candidateId)
    const formatter = useFormatter()
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

                        <Grid md={6} xs={12}>
                            <TextField
                                value={application.specialAchievements}
                                label='Special Achievements'
                                fullWidth={true}
                                multiline={true}
                                rows={10}
                                InputLabelProps={{required: true}}
                            />
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
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Status Identifier</TableCell>
                                        <TableCell align="left">Status Name</TableCell>
                                        <TableCell align="left">Office</TableCell>
                                        <TableCell align="left">User</TableCell>
                                        <TableCell align="left">Change Date</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {application.statuses.map((status) => (
                                        <TableRow
                                            key={status.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {status.id}
                                            </TableCell>
                                            <TableCell align="left">{status.statusName}</TableCell>
                                            <TableCell align="left">{status.office.nameRu}({status.office.id})</TableCell>
                                            <TableCell align="left">{status.user.userName}({status.user.id})</TableCell>
                                            <TableCell align="left">{formatter.dateTime(new Date(status.changeTime))}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
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
                        <DocumentList documents={application.documents}/>
                    </Grid>

                </CardContent>
            </Card>
            <PdfViewer/>
        </Box>
    )
}

interface Props{
    children?: React.ReactNode,
    application: Application,
}
