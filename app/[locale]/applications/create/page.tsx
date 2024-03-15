'use client'

import {useTranslations} from 'next-intl';
import { Box, Button, ButtonGroup, Card, CardContent, Container, MenuItem, TextField, Typography } from "@mui/material";
import {ProgressLink as Link} from "@/components/progress-link";
import { ArrowLeft as ArrowLeftIcon } from "@/icons/arrow-left";
import { useState } from "react";
import { CandidateType, CandidateTypes } from "@/types/candidate-type";
import {useSearchParams} from "next/navigation";
import CreateApplicationForm from "@/components/applications/create-application-form";

const CreateApplication = () => {
    const searchParams = useSearchParams()
    const candidateId = searchParams.get('candidateId')
    const t = useTranslations()
    // const createApplication = useCreateApplication();
    const [candidate, setCandidate] = useState<CandidateType>('Citizen');

    const defaultCandidateValue: CandidateType = 'Citizen'

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
                    {t('create a application')}
                </Typography>

                <Link href='/applications'>
                    <ButtonGroup variant='contained'>
                        <Button startIcon={<ArrowLeftIcon fontSize='small' />}>
                            {t('Applications')}
                        </Button>
                    </ButtonGroup>
                </Link>
            </Box>

            {/*<Card sx={{mb: 3}}>*/}
            {/*    <CardContent>*/}
            {/*        <TextField*/}
            {/*            select*/}
            {/*            fullWidth*/}
            {/*            defaultValue={defaultCandidateValue}*/}
            {/*            label={t('Candidate')}*/}
            {/*            onChange={e => setCandidate(e.target.value as CandidateType)}*/}
            {/*        >*/}
            {/*            {CandidateTypes.map(candidate => (*/}
            {/*                <MenuItem key={candidate.id} value={candidate.name}>*/}
            {/*                    {t(candidate.name)}*/}
            {/*                </MenuItem>*/}
            {/*            ))}*/}
            {/*        </TextField>*/}
            {/*    </CardContent>*/}
            {/*</Card>*/}

            {CreateApplicationForm()}

        </Container>
    )
}

export default CreateApplication
