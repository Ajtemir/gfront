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

interface UpdateChildProps {
    params:{
        childId: number
    }
}
const UpdateChild = ({params}:UpdateChildProps) => {
    const t = useTranslations()
    const {data:documents, isLoading, error} = useGetDocumentsByChildIdQuery(params.childId)
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
                    {t('create a candidate')}
                </Typography>

                <Link href='/candidates'>
                    <ButtonGroup variant='contained'>
                        <Button startIcon={<ArrowLeftIcon fontSize='small' />}>
                            {t('Candidates')}
                        </Button>
                    </ButtonGroup>
                </Link>
            </Box>

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