import React from 'react';
import {Button, ButtonGroup, Card, CardContent, Dialog, Input, Typography} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {Pencil as PencilIcon} from "@/icons/pencil";
import {fileToBase64} from "@/utils/file-to-base64";
import {UpdateDocumentArgument, useUpdateDocumentMutation} from "@/backend-api/document-api";
import {Eye} from "@/icons/eye";
import {XCircle} from "@/icons/x-circle";
import {Document} from "@/types/document";
import {useTranslations} from "next-intl";
import {setDocument} from "@/store/reducers/documentViewReducer";
import PdfViewer from "@/components/Documents/PdfViewer";
import {AppDispatch, useAppDispatch, useAppSelector} from "@/store/store";

interface DocumentItemProps {
    document: Document
}

const DocumentItem = ({document}: DocumentItemProps) => {
    const [updateDocument] = useUpdateDocumentMutation()
    const t = useTranslations()
    const dispatch = useAppDispatch();
    console.log(dispatch)
    const setDocumentState = (document: Document) => {
        dispatch(setDocument(document))
    }
    return (
        <>
            <Grid md={6} xs={12}>
                <CardContent sx={{justifyContent: "space-between", display: "flex"}}>
                    <h3 style={{display: "flex"}}>
                        {document.id}
                        {
                            document.isRequired
                                ? <Typography style={{color: 'red'}} display={"inline"}> (*Обьязательный)</Typography>
                                : <Typography style={{color: 'green'}} display={"inline"}> (Опциональный)</Typography>
                        }
                    </h3>
                    <ButtonGroup variant='contained'>
                        {
                            <Button startIcon={<PencilIcon fontSize='small'/>} color={"success"} component="label">
                                {document.name ? t('Replace') : t('Upload')}
                                <Input type="file" style={{display: "none"}}
                                       onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                                           const argument = {
                                               documentId: document.id,
                                               file: await fileToBase64(e.target.files![0]) as string,
                                               fileName: e.target.files![0].name,
                                           } as UpdateDocumentArgument
                                           const updatedDocument = await updateDocument(argument).unwrap()
                                           setDocument(updatedDocument)
                                       }}/>
                            </Button>
                        }

                        {
                            document.name &&
                                <Button startIcon={<Eye fontSize='small'/>} onClick={(e) => {
                                    setDocumentState(document)
                                }}>
                                    {t('View')}
                                </Button>
                        }
                        {document.name && !document.isRequired &&
                            <Button startIcon={<XCircle fontSize='small'/>} color={'error'} onClick={async (e) => {
                                const argument = {
                                    documentId: document.id,
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
    );
};

export default DocumentItem;