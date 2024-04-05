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
  Typography, Skeleton, Card, CardContent, CardHeader, LinearProgress, TablePagination, TextField
} from "@mui/material";
import { SxProps, Theme } from '@mui/material/styles'
import { useFormatter, useTranslations } from "next-intl";
import { Plus as PlusIcon } from '@/icons/plus'
import {useCandidates, useGetCandidatesQuery, useLazyGetCandidatesQuery} from "@/backend-api/candidate-api";
import { CandidateWithoutImage } from "@/types/candidate";
import { CandidateType } from "@/types/candidate-type";
import { OverridableStringUnion } from "@mui/types";
import { ChipPropsColorOverrides } from "@mui/material/Chip/Chip";
import {ProgressLink as Link} from "@/components/progress-link";
import {ArrowRightIconButton} from "@/components/buttons/arrow-right-icon-button";
import {PencilIconButton} from "@/components/buttons/pencil-icon-button";
import {FormikTextField} from "@/components/formik-text-field";
import {nameof} from "@/utils/nameof";
import {CreateMother} from "@/types/mother";
import Grid from "@mui/material/Unstable_Grid2";
import {useFormik} from "formik";
import GridFormikTextField from "@/components/GridFormikTextField";
import {Person} from "@/types/person";
import React, {useState} from "react";
import {SubmitButton} from "@/components/buttons/submit-button";
import SearchBar from "@/components/search/SearchBar";
import {useGetApplicationsQuery} from "@/backend-api/application-api";
import Applications from "@/components/applications/applications";


type ChipColor = OverridableStringUnion<
  'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
  ChipPropsColorOverrides
>;

const CandidatesTable = ({candidates}: { candidates: CandidateWithoutImage[]}) => {
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
          {candidates.map(candidate => (
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
  const [queryProps, setQueryProps] = useState({pageNumber:0, pageSize:10} as GetCandidatesProps)
  const {data , isLoading, isFetching, error, refetch} = useGetCandidatesQuery({...queryProps, pageNumber: queryProps.pageNumber + 1})
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number,) =>
  {
    setQueryProps({...queryProps, pageNumber:newPage})
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,) =>
  {
    setQueryProps({...queryProps, pageSize:parseInt(event.target.value, 10), pageNumber:0})
  };
  const formik = useFormik({
    initialValues: queryProps,
    onSubmit: (values) => {
      refetch()
    }
  })
  return (
    <Container maxWidth='md' sx={sx}>
      <Box component='form' onSubmit={formik.handleSubmit}>
        <Card>
          <CardContent>
            <Grid container spacing={3}>

              <Grid md={6} xs={12}>
              <TextField
                  name={nameof<GetCandidatesProps>('fullname')}
                  label='Fullname'
                  onChange={e => {setQueryProps({...queryProps, fullname: e.target.value})}}
                  fullWidth
              />
              </Grid>

              <Grid md={6} xs={12}>
              <TextField
                  name={nameof<GetCandidatesProps>('pin')}
                  label='Pin'
                  onChange={e => {setQueryProps({...queryProps, pin: e.target.value})}}
                  fullWidth
              />
              </Grid>

            </Grid>
            <Grid md={12} xs={12} mt={3} mb={3}>
              <ButtonGroup variant='contained'>
                <SubmitButton color='success'>
                  {t('Search')}
                </SubmitButton>
              </ButtonGroup>
            </Grid>
          </CardContent>
        </Card>
      </Box>
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
              {t('Сreate candidate')}
            </Button>
          </ButtonGroup>
        </Link>
      </Box>

      {isLoading && <LinearProgress variant="indeterminate"/>}
      {
          data?.items &&
          <>
            <CandidatesTable candidates={data.items}/>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25,]}
                count={data.totalCount}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                page={queryProps.pageNumber}
                rowsPerPage={queryProps.pageSize}
            />
          </>
      }
    </Container>
  );
};

export default Candidates
