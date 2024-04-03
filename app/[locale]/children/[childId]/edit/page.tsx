'use client'
import React from 'react';
import {
    Box,
    Button,
    ButtonGroup,
    Card,
    CardContent,
    CardHeader,
    Container,
    Divider,
    LinearProgress,
    Typography
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import DocumentList from "@/components/Documents/DocumentList";
import {useGetDocumentsByChildIdQuery} from "@/backend-api/document-api";
import PdfViewer from "@/components/Documents/PdfViewer";
import {ProgressLink as Link} from "@/components/progress-link";
import {ArrowLeft as ArrowLeftIcon} from "@/icons/arrow-left";
import {useTranslations} from "next-intl";
import {setDocument} from "@/store/reducers/documentViewReducer";
import PersonDetailView from "@/components/person/PersonDetailView";
import {useGetChildByIdQuery} from "@/backend-api/children-api";

interface UpdateChildProps {
    params:{
        childId: number
    }
}
const UpdateChild = ({params}:UpdateChildProps) => {
    const t = useTranslations()
    const {data:child, isLoading:isLoadingChild, error:errorChild} = useGetChildByIdQuery(params.childId)
    const {data:documents, isLoading, error} = useGetDocumentsByChildIdQuery(params.childId)
    setDocument(null)
    return (
        <Container>
            <Box
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                flexWrap='wrap'
                my={1}
                mb={3}
            >
                <Typography variant='h4'>
                    {t('Edit child')}
                </Typography>

                {child &&
                    <Link href={`/candidates/${child.motherId}/edit`}>
                        <ButtonGroup variant='contained'>
                            <Button startIcon={<ArrowLeftIcon fontSize='small' />}>
                                {t('Go to mother')}
                            </Button>
                        </ButtonGroup>
                    </Link>
                }
            </Box>
            {child && <PersonDetailView person={child.person}/>}
            <Card sx={{mt: 3}}>
                <CardHeader title={('Documents')}/>
                <Divider/>
                <CardContent>

                    <Grid
                        container
                        spacing={3}
                    >
                        {isLoading && <LinearProgress variant="indeterminate" />}
                        {error && <>Ошибка</>}
                        {documents && <DocumentList documents={documents}/>}
                    </Grid>

                </CardContent>
            </Card>
        <PdfViewer/>
        </Container>

    );
};

export default UpdateChild;