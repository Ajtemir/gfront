'use client'

import Image from 'next/image'
import { notFound } from "next/navigation";
import { ProgressLink as Link} from "@/components/progress-link";
import { useTranslations, useFormatter, useLocale } from "next-intl";
import {
  Chip,
  Box,
  Button,
  ButtonGroup,
  Container,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useMediaQuery, Theme
} from "@mui/material";
import type { Locale } from "@/i18n";
import { ArrowLeft as ArrowLeftIcon } from '@/icons/arrow-left'
import { Pencil as PencilIcon } from '@/icons/pencil'
import { useCandidate } from "@/backend-api/candidate-api";
import { PropertyList } from "@/components/property-list";
import { PropertyListItem } from "@/components/property-list-item";
import { Foreigner } from "@/types/foreigner";
import { CandidateType } from "@/types/candidate-type";
import { Entity } from "@/types/entity";
import { Mother } from "@/types/mother";
import { Gender } from "@/types/gender";
import { SxProps } from "@mui/material/styles";
import { Citizen } from "@/types/citizen";
import PersonDetailView from "@/components/person/PersonDetailView";

const CandidateImageCard = ({image, sx} : {image: string | null, sx?: SxProps}) => {
  const t = useTranslations()
  
  if (!image) {
    return null
  }
  
  return (
    <Card sx={sx}>
      <CardHeader title={t('Image')} />
      <Divider/>
      <CardContent>
        <Image
          src={`data:image/jpeg;base64,${image}`}
          alt='Candidate'
          height={600}
          width={800}
          style={{ objectFit: 'contain' }}
        />
      </CardContent>
    </Card>
  )
}

const CitizenDetail = ({citizen}: {citizen: Citizen}) => {
  const t = useTranslations()
  const formatter = useFormatter();
  const locale = useLocale() as Locale;
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const align = mdUp ? 'horizontal' : 'vertical';

  const candidateType: CandidateType = 'Citizen'
  
  return (
    <>
      <Card>
        <CardHeader title={t('Basic details')} />
        <Divider/>
        <CardContent>
          <PropertyList>
            <PropertyListItem
              align={align}
              divider
              label={t('Id')}
              value={citizen.id}
            />
            <PropertyListItem
              align={align}
              divider
              label={t('Candidate type')}
            >
              <Chip label={t(candidateType)} color='primary'/>
            </PropertyListItem>
            <PropertyListItem
              align={align}
              divider
              label={t('Last name')}
              value={citizen.lastName}
            />
            <PropertyListItem
              align={align}
              divider
              label={t('First name')}
              value={citizen.firstName}
            />
            <PropertyListItem
              align={align}
              divider
              label={t('Patronymic name')}
              value={citizen.patronymicName ?? ''}
            />
            <PropertyListItem
              align={align}
              divider
              label={t('Pin')}
              value={citizen.pin ?? ''}
            />
            <PropertyListItem
              align={align}
              divider
              label={t('Passport number')}
              value={citizen.passportNumber ?? ''}
            />
            <PropertyListItem
              align={align}
              divider
              label={t('Gender')}
              value={t(citizen.gender)}
            />
            <PropertyListItem
              align={align}
              divider
              label={t('Birth date')}
              value={formatter.dateTime(new Date(citizen.birthDate))}
            />
            <PropertyListItem
              align={align}
              divider
              label={t('Death date')}
              value={citizen.deathDate ? formatter.dateTime(new Date(citizen.deathDate)) : ''}
            />
            <PropertyListItem
              align={align}
              divider
              label={t('Registered address')}
              value={citizen.registeredAddress}
            />
            <PropertyListItem
              align={align}
              divider
              label={t('Actual address')}
              value={citizen.actualAddress ?? ''}
            />
            <PropertyListItem
              align={align}
              divider
              label={t('Education')}
              value={locale === 'kg' ? citizen.educationKg : citizen.educationRu}
            />
            <PropertyListItem
              align={align}
              divider
              label={t('Years of work in total')}
              value={citizen.yearsOfWorkTotal}
            />
            <PropertyListItem
              align={align}
              divider
              label={t('Years of work in industry')}
              value={citizen.yearsOfWorkInIndustry}
            />
            <PropertyListItem
              align={align}
              divider
              label={t('Years of work in collective')}
              value={citizen.yearsOfWorkInCollective}
            />
            <PropertyListItem
              align={align}
              divider
              label={t('Created by')}
              value={citizen.createdByUser}
            />
            <PropertyListItem
              align={align}
              divider
              label={t('Created at')}
              value={formatter.dateTime(new Date(citizen.createdAt))}
            />
            <PropertyListItem
              align={align}
              divider
              label={t('Last modified by')}
              value={citizen.modifiedByUser}
            />
            <PropertyListItem
              align={align}
              divider
              label={t('Last modified at')}
              // TODO: fix utc date mismatch. Local time in 18 june, but displays as 19 june
              value={formatter.dateTime(new Date(citizen.modifiedAt))}
            />
          </PropertyList>
        </CardContent>
      </Card>
      
      <CandidateImageCard image={citizen.image} sx={{mt: 3}} />
    </>
  )
}

const MotherDetail = ({mother}: {mother: Mother}) => {
  const t = useTranslations()
  const formatter = useFormatter();
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const align = mdUp ? 'horizontal' : 'vertical';

  const candidateType: CandidateType = 'Mother'
  const gender: Gender = 'Female'
  
  return (
    <>
      <Card>
        <CardHeader title={t('Basic details')}/>
        <Divider/>
        <CardContent>
          <PropertyList>
          <PropertyListItem
            align={align}
            divider
            label={t('Id')}
            value={mother.id}
          />
          <PropertyListItem
            align={align}
            divider
            label={t('Candidate type')}
          >
            <Chip label={t(candidateType)} color='info'/>
          </PropertyListItem>
          <PropertyListItem
            align={align}
            divider
            label={t('Last name')}
            value={mother.lastName}
          />
          <PropertyListItem
            align={align}
            divider
            label={t('First name')}
            value={mother.firstName}
          />
          <PropertyListItem
            align={align}
            divider
            label={t('Patronymic name')}
            value={mother.patronymicName ?? ''}
          />
          <PropertyListItem
            align={align}
            divider
            label={t('Pin')}
            value={mother.pin ?? ''}
          />
          <PropertyListItem
            align={align}
            divider
            label={t('Passport number')}
            value={mother.passportNumber ?? ''}
          />
          <PropertyListItem
            align={align}
            divider
            label={t('Gender')}
            value={t(gender)}
          />
          <PropertyListItem
            align={align}
            divider
            label={t('Registered address')}
            value={mother.registeredAddress}
          />
          <PropertyListItem
            align={align}
            divider
            label={t('Actual address')}
            value={mother.actualAddress ?? ''}
          />
          <PropertyListItem
            align={align}
            divider
            label={t('Created by')}
            value={mother.createdByUser}
          />
          <PropertyListItem
            align={align}
            divider
            label={t('Created at')}
            value={formatter.dateTime(new Date(mother.createdAt))}
          />
          <PropertyListItem
            align={align}
            divider
            label={t('Last modified by')}
            value={mother.modifiedByUser}
          />
          <PropertyListItem
            align={align}
            divider
            label={t('Last modified at')}
            value={formatter.dateTime(new Date(mother.modifiedAt))}
          />
        </PropertyList>
        </CardContent>
      </Card>
      
      <CandidateImageCard image={mother.image} sx={{mt: 3}} />
    </>
  )
}

const ForeignerDetail = ({foreigner}: { foreigner: Foreigner }) => {
  const t = useTranslations()
  const formatter = useFormatter();
  const locale = useLocale() as Locale;
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const align = mdUp ? 'horizontal' : 'vertical';
  
  const candidateType: CandidateType = 'Foreigner'

  return (
    <>
      <Card>
        <CardHeader title={t('Basic details')}/>
        <Divider/>
        <PropertyList>
          <PropertyListItem
            align={align}
            divider
            label={t('Id')}
            value={foreigner.id}
          />
          <PropertyListItem
            align={align}
            divider
            label={t('Candidate type')}
          >
            <Chip label={t(candidateType)} color='warning'/>
          </PropertyListItem>
          <PropertyListItem
            align={align}
            divider
            label={t('Last name')}
            value={foreigner.lastName}
          />
          <PropertyListItem
            align={align}
            divider
            label={t('First name')}
            value={foreigner.firstName}
          />
          <PropertyListItem
            align={align}
            divider
            label={t('Patronymic name')}
            value={foreigner.patronymicName ?? ''}
          />
          <PropertyListItem
            align={align}
            divider
            label={t('Gender')}
            value={t(foreigner.gender)}
          />
          <PropertyListItem
            align={align}
            divider
            label={t('Citizenship')}
            value={locale === 'kg' ? foreigner.citizenshipKg : foreigner.citizenshipRu}
          />
          <PropertyListItem
            align={align}
            divider
            label={t('Created by')}
            value={foreigner.createdByUser}
          />
          <PropertyListItem
            align={align}
            divider
            label={t('Created at')}
            value={formatter.dateTime(new Date(foreigner.createdAt))}
          />
          <PropertyListItem
            align={align}
            divider
            label={t('Last modified by')}
            value={foreigner.modifiedByUser}
          />
          <PropertyListItem
            align={align}
            divider
            label={t('Last modified at')}
            value={formatter.dateTime(new Date(foreigner.modifiedAt))}
          />
        </PropertyList>
      </Card>

      <CandidateImageCard image={foreigner.image} sx={{mt: 3}} />
    </>
  )
}

const EntityDetail = ({entity} : {entity: Entity}) => {
  const t = useTranslations()
  const formatter = useFormatter();
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const align = mdUp ? 'horizontal' : 'vertical';

  const candidateType: CandidateType = 'Entity'
  
  return (
    <>
      <Card>
        <CardHeader title={t('Basic details')}/>
        <Divider/>
        <CardContent>
          <PropertyList>
            <PropertyListItem
              align={align}
              divider
              label={t('Id')}
              value={entity.id}
            />
            <PropertyListItem
              align={align}
              divider
              label={t('Candidate type')}
            >
              <Chip label={t(candidateType)} color='secondary' />
            </PropertyListItem>
            <PropertyListItem
              align={align}
              divider
              label={t('Name (ru)')}
              value={entity.nameRu}
            />
            <PropertyListItem
              align={align}
              divider
              label={t('Name (kg)')}
              value={entity.nameKg}
            />
            <PropertyListItem
              align={align}
              divider
              label={t('Created by')}
              value={entity.createdByUser}
            />
            <PropertyListItem
              align={align}
              divider
              label={t('Created at')}
              value={formatter.dateTime(new Date(entity.createdAt))}
            />
            <PropertyListItem
              align={align}
              divider
              label={t('Last modified by')}
              value={entity.modifiedByUser}
            />
            <PropertyListItem
              align={align}
              divider
              label={t('Last modified at')}
              value={formatter.dateTime(new Date(entity.modifiedAt))}
            />
          </PropertyList>
        </CardContent>
      </Card>
      
      <CandidateImageCard image={entity.image} sx={{mt: 3}} />
    </>
  )
}

const LoadCandidate = ({candidateId}: { candidateId: number }) => {
  const t = useTranslations()
  const {data: candidate, isLoading} = useCandidate(candidateId)

  if (isLoading || !candidate) {
    return null;
  }
  
  const renderCandidateType = (candidateType: CandidateType) => {
    switch (candidateType) {
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
  
  const renderCandidate = (candidateType: CandidateType) => {
    switch (candidateType) {
      case 'Citizen':
        return <CitizenDetail citizen={candidate as Citizen}/>
      case 'Mother':
        return <MotherDetail mother={candidate as Mother}/>
      case 'Foreigner':
        return <ForeignerDetail foreigner={candidate as Foreigner}/>
      case 'Entity':
        return <EntityDetail entity={candidate as Entity}/>
      default:
        return null;
    }
  }
  
  return (
    <Container maxWidth='md'>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        sx={{mb: 3}}
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

          <Link href={`/candidates/${candidateId}/edit`} tabIndex={-1}>
            <ButtonGroup variant='contained' sx={{ml: 1}}>
              <Button startIcon={<PencilIcon fontSize='small'/>}>
                {t('Edit')}
              </Button>
            </ButtonGroup>
          </Link>
        </div>
      </Box>

      {renderCandidate(candidate.candidateType)}
    </Container>   
  )
}

const CandidateDetailPage = ({params}: {
  params: {
    candidateId: number
  }
}) => {
  const {candidateId} = params;
  
  if (candidateId <= 0) {
    notFound()
    return null
  }
  
  return <LoadCandidate candidateId={candidateId}/>
}

export default CandidateDetailPage
