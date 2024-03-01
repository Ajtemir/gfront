'use client'
import React, {useEffect} from 'react';
import {applicationApi, useGetApplicationByIdQuery, useUpdateApplicationMutation} from "@/backend-api/application-api";
import {useAppDispatch, useAppSelector} from "@/store/store";
import {removeNote} from "@/store/reducers/testReducer"
import {Box, Button, ButtonGroup, Card, Container, Typography} from "@mui/material";
import {ProgressLink as Link} from "@/components/progress-link";
import {ArrowLeft as ArrowLeftIcon} from "@/icons/arrow-left";
import {InformationCircleOutlined as InformationCircleOutlinedIcon} from "@/icons/information-circle-outlined";
import {useTranslations} from "next-intl";
import {EditApplicationForm} from "@/components/applications/edit-application-form";

const EditApplicationPage = ({params}: {
    params: {
        applicationId: number
    }
}) => {
    const t = useTranslations()
    const {data:application, isLoading, error} = useGetApplicationByIdQuery(params.applicationId)
    console.log(application)
    const {notes} = useAppSelector(state => state.note)
    const [updateApplication] = applicationApi.useUpdateApplicationMutation();
    const dispatch = useAppDispatch();

    return (
        <Container maxWidth='md'>
            <Box
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                flexWrap='wrap'
                mb={3}
            >
                <Typography variant='h4'>
                    {t('Application')}
                </Typography>

                <div>
                    <Link href='/applications' tabIndex={-1}>
                        <ButtonGroup variant='contained'>
                            <Button startIcon={<ArrowLeftIcon fontSize='small'/>}>
                                {t('Applications')}
                            </Button>
                        </ButtonGroup>
                    </Link>
                </div>

            </Box>

            {isLoading && <h1>Идет загрузка...</h1>}
            {error && <h1>Произошла ошибка при загрузке...</h1>}
            {application && <EditApplicationForm application={application}/>}
        </Container>
    );
};


export default EditApplicationPage;