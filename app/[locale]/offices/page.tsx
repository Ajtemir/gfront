'use client'

import {
  Box,
  Button,
  ButtonGroup, Chip,
  Container, IconButton,
  Table,
  TableBody, TableCell,
  TableContainer,
  TableHead, TableRow,
  Typography
} from "@mui/material";
import {ProgressLink as Link} from "@/components/progress-link";
import {Plus as PlusIcon} from "@/icons/plus";
import {useFormatter, useTranslations} from "next-intl";
import {useOffices} from "@/backend-api/office-api";
import {Office} from "@/types/office";
import {PencilIconButton} from "@/components/buttons/pencil-icon-button";
import {ArrowRightIconButton} from "@/components/buttons/arrow-right-icon-button";

const OfficesTable = ({offices, isLoading}: {offices: Office[], isLoading: boolean}) => {
  const t = useTranslations()
  const formatter = useFormatter()

  return (
    <TableContainer>
      <Table>
        <TableHead>
          {/* eslint-disable-next-line react/jsx-no-undef */}
        <TableRow>
          <TableCell>{t('Id')}</TableCell>
          <TableCell>{t('Name (ru)')}</TableCell>
          <TableCell>{t('Name (kg)')}</TableCell>
          <TableCell>{t('Created by')}</TableCell>
          <TableCell>{t('Created at')}</TableCell>
          <TableCell>{t('Last modified by')}</TableCell>
          <TableCell>{t('Last modified at')}</TableCell>
          <TableCell>{t('Actions')}</TableCell>
        </TableRow>
        </TableHead>
        <TableBody>
          {offices.map((office) => (
            <TableRow key={office.id}>
              <TableCell>
                <Chip label={office.id} color='primary' />
              </TableCell>
              <TableCell>{office.nameRu}</TableCell>
              <TableCell>{office.nameKg}</TableCell>
              <TableCell>{office.createdByUser}</TableCell>
              <TableCell>{formatter.dateTime(new Date(office.createdAt))}</TableCell>
              <TableCell>{office.modifiedByUser}</TableCell>
              <TableCell>{formatter.dateTime(new Date(office.modifiedAt))}</TableCell>
              <TableCell style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <Link href={`/offices/${office.id}`}>
                  <ArrowRightIconButton/>
                </Link>
                <Link href={`/offices/${office.id}/edit`}>
                  <PencilIconButton/>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const OfficesPage = () => {
  const t = useTranslations()
  const {data: offices = [], isLoading} = useOffices()

  return (
    <Container maxWidth='md'>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        flexWrap='wrap'
        mb={3}
      >
        <Typography variant='h4'>
          {t('Offices')}
        </Typography>

        <Link href='/offices/create'>
          <ButtonGroup variant='contained'>
            <Button startIcon={<PlusIcon fontSize='small'/>}>
              {t('create an office')}
            </Button>
          </ButtonGroup>
        </Link>
      </Box>

      <OfficesTable offices={offices} isLoading={isLoading}/>
    </Container>
  )
}

export default OfficesPage
