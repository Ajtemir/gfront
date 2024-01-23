'use client'

import { notFound } from "next/navigation";
import { ProgressLink as Link} from "@/components/progress-link";
import { useCandidate } from "@/backend-api/candidate-api";
import { useTranslations } from "next-intl";
import { Box, Button, ButtonGroup, Container, Typography } from "@mui/material";
import { CandidateType } from "@/types/candidate-type";
import { ArrowLeft as ArrowLeftIcon } from "@/icons/arrow-left";
import { InformationCircleOutlined as InformationCircleOutlinedIcon } from "@/icons/information-circle-outlined";
import { Entity } from "@/types/entity";
import { UpdateEntity } from "@/components/candidates/entity/update-entity";
import { UpdateMother } from "@/components/candidates/mother/update-mother";
import { Mother } from "@/types/mother";
import { UpdateForeigner } from "@/components/candidates/foreigner/update-foreigner";
import { Foreigner } from "@/types/foreigner";
import { UpdateCitizen } from "@/components/candidates/citizen/update-citizen";
import { Citizen } from "@/types/citizen";


const LoadCandidate = ({candidateId}: { candidateId: number }) => {
  const t = useTranslations()
  const {data: candidate, isLoading} = useCandidate(candidateId)

  if (!candidate || isLoading) {
    return null
  }

  const renderCandidateType = (type: CandidateType) => {
    switch (type) {
      case 'Citizen':
        return t('Citizen')
      case 'Mother':
        return t('Mother')
      case 'Foreigner':
        return t('Foreigner')
      case 'Entity':
        return t('Entity')
      default:
        return t('Candidate');
    }
  }

  const renderEditCandidate = (type: CandidateType) => {
    switch (type) {
      case 'Citizen':
        return <UpdateCitizen citizen={candidate as Citizen}/>
      case 'Mother':
        return <UpdateMother mother={candidate as Mother}/>
      case 'Foreigner':
        return <UpdateForeigner foreigner={candidate as Foreigner}/>
      case 'Entity':
        return <UpdateEntity entity={candidate as Entity}/>
      default:
        return null;
    }
  }

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
          {renderCandidateType(candidate.candidateType)}
        </Typography>

        <div>
          <Link href='/candidates' tabIndex={-1}>
            <ButtonGroup variant='contained'>
              <Button startIcon={<ArrowLeftIcon fontSize='small'/>}>
                {t('Candidates')}
              </Button>
            </ButtonGroup>
          </Link>

          <Link href={`/candidates/${candidateId}`} tabIndex={-1}>
            <ButtonGroup variant='contained' sx={{ml: 1}}>
              <Button startIcon={<InformationCircleOutlinedIcon fontSize='small'/>}>
                {t('Go back to details')}
              </Button>
            </ButtonGroup>
          </Link>
        </div>
      </Box>

      {renderEditCandidate(candidate.candidateType)}
    </Container>
  )
}

const EditCandidatePage = ({params}: {
  params: {
    candidateId: number
  }
}) => {
  const {candidateId} = params
  if (candidateId <= 0) {
    notFound()
    return null
  }

  return <LoadCandidate candidateId={candidateId}/>
}

export default EditCandidatePage
