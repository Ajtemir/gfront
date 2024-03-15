'use client'
import React from 'react';
import {Box, Button, ButtonGroup, Card, CardContent, Container, MenuItem, TextField, Typography} from "@mui/material";
import {ProgressLink as Link} from "@/components/progress-link";
import {ArrowLeft as ArrowLeftIcon} from "@/icons/arrow-left";
import {CandidateType, CandidateTypes} from "@/types/candidate-type";
import {useTranslations} from "next-intl";
import CreateChildForm from "@/components/children/CreateChildForm";


const CreateChild = ({params}: {
    params: {
        motherId: number
    }
}) => {
    const t = useTranslations()
    return (
        <Container maxWidth='md' component='main'>
            <Box
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                flexWrap='wrap'
                my={1}
                mb={3}
            >
                <Typography variant='h4'>
                    {t('create a child')}
                </Typography>

                <Link href={`/candidates/${params.motherId}/edit`}>
                    <ButtonGroup variant='contained'>
                        <Button startIcon={<ArrowLeftIcon fontSize='small' />}>
                            {t('Go to mother')}
                        </Button>
                    </ButtonGroup>
                </Link>
            </Box>

            <CreateChildForm motherId={params.motherId}/>



        </Container>
    );
};

export default CreateChild;