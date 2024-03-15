'use client'

import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Chip,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography, Skeleton
} from "@mui/material";
import { SxProps, Theme } from '@mui/material/styles'
import { useFormatter, useTranslations } from "next-intl";
import { Plus as PlusIcon } from '@/icons/plus'
import { useCandidates } from "@/backend-api/candidate-api";
import { CandidateWithoutImage } from "@/types/candidate";
import { CandidateType } from "@/types/candidate-type";
import { OverridableStringUnion } from "@mui/types";
import { ChipPropsColorOverrides } from "@mui/material/Chip/Chip";
import {ProgressLink as Link} from "@/components/progress-link";
import {ArrowRightIconButton} from "@/components/buttons/arrow-right-icon-button";
import {PencilIconButton} from "@/components/buttons/pencil-icon-button";

// colSpan={0} is not working
const RowSkeleton = ({colSpan}: {colSpan: number}) => (
  <tr>
    <td colSpan={colSpan}>
      <Skeleton variant='text' height='45px'/>
    </td>
  </tr>
)

type ChipColor = OverridableStringUnion<
  'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
  ChipPropsColorOverrides
>;

const CandidatesTable = ({candidates, isLoading}: { candidates: CandidateWithoutImage[], isLoading: boolean }) => {
  const t = useTranslations()
  const formatter = useFormatter()
  
  const getCandidateChipColor =(candidateType: CandidateType): ChipColor => {
    switch (candidateType) {
      case "Citizen":
        return 'primary'
      case "Mother":
        return 'info'
      case "Foreigner":
        return 'warning'
      case "Entity":
        return 'secondary'
    }
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('Id')}</TableCell>
            <TableCell>{t('Name')}</TableCell>
            <TableCell>{t('Candidate type')}</TableCell>
            <TableCell>{t('Created by')}</TableCell>
            <TableCell>{t('Created at')}</TableCell>
            <TableCell>{t('Last modified by')}</TableCell>
            <TableCell>{t('Last modified at')}</TableCell>
            <TableCell>{t('Actions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
              <>
                <RowSkeleton colSpan={8}/>
                <RowSkeleton colSpan={8}/>
                <RowSkeleton colSpan={8}/>
                <RowSkeleton colSpan={8}/>
                <RowSkeleton colSpan={8}/>
              </>
            ) :
            candidates.map(candidate => (
              <TableRow key={candidate.id}>
                <TableCell>{candidate.id}</TableCell>
                <TableCell>{candidate.name}</TableCell>
                <TableCell>
                  <Chip
                    label={t(candidate.candidateType)}
                    color={getCandidateChipColor(candidate.candidateType)}
                  />
                </TableCell>
                <TableCell>{candidate.createdByUser}</TableCell>
                <TableCell>{formatter.dateTime(new Date(candidate.createdAt))}</TableCell>
                <TableCell>{candidate.modifiedByUser}</TableCell>
                <TableCell>{formatter.dateTime(new Date(candidate.modifiedAt))}</TableCell>
                <TableCell style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <Link href={`/candidates/${candidate.id}`}>
                    <ArrowRightIconButton/>
                  </Link>
                  <Link href={`/candidates/${candidate.id}/edit`}>
                    <PencilIconButton/>
                  </Link>
                  <Link href={`/applications/create?candidateId=${candidate.id}`}>
                    <PlusIcon/>
                  </Link>
                </TableCell>
              </TableRow>
            ))}

        </TableBody>
      </Table>
    </TableContainer>
  )
}

interface CandidatesProps {
  sx?: SxProps<Theme>;
}

const Candidates = ({sx}: CandidatesProps) => {
  const t = useTranslations()

  const {data: candidates = [], isLoading} = useCandidates()

  return (
    <Container maxWidth='md' sx={sx}>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        flexWrap='wrap'
        mb={3}
      >
        <Typography variant='h4'>
          {t('Candidates')}
        </Typography>

        <Link href='/candidates/create'>
          <ButtonGroup variant='contained'>
            <Button startIcon={<PlusIcon fontSize='small'/>}>
              {t('create a candidate')}
            </Button>
          </ButtonGroup>
        </Link>
      </Box>

      <CandidatesTable candidates={candidates} isLoading={isLoading}/>
    </Container>
  );
};

export default Candidates
