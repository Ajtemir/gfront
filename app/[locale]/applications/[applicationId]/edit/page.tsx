'use client'
import React from 'react';
import {applicationApi, useGetApplicationByIdQuery, useUpdateApplicationMutation} from "@/backend-api/application-api";
import {useAppDispatch, useAppSelector} from "@/store/store";
import {removeNote} from "@/store/reducers/testReducer"
import {Box, Button, ButtonGroup, Container, Typography} from "@mui/material";
import {ProgressLink as Link} from "@/components/progress-link";
import {ArrowLeft as ArrowLeftIcon} from "@/icons/arrow-left";
import {InformationCircleOutlined as InformationCircleOutlinedIcon} from "@/icons/information-circle-outlined";
import {useTranslations} from "next-intl";

const EditApplicationPage = ({params}: {
    params: {
        applicationId: number
    }
}) => {
    const t = useTranslations()
    const {data:application, isLoading, error} = useGetApplicationByIdQuery(params.applicationId)
    console.log(application)
    const {notes} = useAppSelector(state => state.note)
    const dispatch = useAppDispatch();
    const [updateApplication] = applicationApi.useUpdateApplicationMutation();

    return (
        <Container maxWidth='md'>
            <Box
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                flexWrap='wrap'
                mb={3}
            >
                {/*<Typography variant='h4'>*/}
                {/*    {renderCandidateType(candidate.candidateType)}*/}
                {/*</Typography>*/}

                <div>
                    <Link href='/applications' tabIndex={-1}>
                        <ButtonGroup variant='contained'>
                            <Button startIcon={<ArrowLeftIcon fontSize='small'/>}>
                                {t('Applications')}
                            </Button>
                        </ButtonGroup>
                    </Link>

                    {/*<Link href={`/candidates/${candidateId}`} tabIndex={-1}>*/}
                    {/*    <ButtonGroup variant='contained' sx={{ml: 1}}>*/}
                    {/*        <Button startIcon={<InformationCircleOutlinedIcon fontSize='small'/>}>*/}
                    {/*            {t('Go back to details')}*/}
                    {/*        </Button>*/}
                    {/*    </ButtonGroup>*/}
                    {/*</Link>*/}
                </div>
            </Box>


        </Container>
    );
};


export default EditApplicationPage;