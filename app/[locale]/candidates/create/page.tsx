'use client'

import {useTranslations} from 'next-intl';
import { Box, Button, ButtonGroup, Card, CardContent, Container, MenuItem, TextField, Typography } from "@mui/material";
import {ProgressLink as Link} from "@/components/progress-link";
import { ArrowLeft as ArrowLeftIcon } from "@/icons/arrow-left";
import { useState } from "react";
import { CandidateType, CandidateTypes } from "@/types/candidate-type";
import { CreateEntityForm } from "@/components/candidates/entity/create-entity-form";
import { CreateForeignerPage } from "@/components/candidates/foreigner/create-foreigner-page";
import { CreateMotherForm } from "@/components/candidates/mother/create-mother-form";
import { CreateCitizenForm } from "@/components/candidates/citizen/create-citizen-form";

const CreateCandidate = () => {
  const t = useTranslations()
  const [candidate, setCandidate] = useState<CandidateType>('Citizen');
  
  const defaultCandidateValue: CandidateType = 'Citizen'
  
  const renderCandidateForm = () => {
    switch (candidate) {
      case "Citizen":
        return <CreateCitizenForm/>;
      case "Mother":
        return <CreateMotherForm/>;
      case "Foreigner":
        return <CreateForeignerPage/>;
      case "Entity":
        return <CreateEntityForm/>;
      default:
        throw new Error(`Invalid 'candidate' value: ${candidate}`);
    }
  }

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
      
      <Card sx={{mb: 3}}>
        <CardContent>
          <TextField
            select
            fullWidth
            defaultValue={defaultCandidateValue}
            label={t('Candidate')}
            onChange={e => setCandidate(e.target.value as CandidateType)}
          >
            {CandidateTypes.map(candidate => (
              <MenuItem key={candidate.id} value={candidate.name}>
                {t(candidate.name)}
              </MenuItem>
            ))}
          </TextField>
        </CardContent>
      </Card>

      {renderCandidateForm()}
      
    </Container>
  )
}

export default CreateCandidate
