'use client'

import {useFormatter, useTranslations} from "next-intl";
import {notFound} from "next/navigation";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Container,
  Theme,
  Typography,
  useMediaQuery
} from "@mui/material";
import {ProgressLink as Link} from "@/components/progress-link";
import {ArrowLeft as ArrowLeftIcon} from "@/icons/arrow-left";
import {Pencil as PencilIcon} from "@/icons/pencil";
import {useOffice} from "@/backend-api/office-api";
import {PropertyList} from "@/components/property-list";
import {PropertyListItem} from "@/components/property-list-item";

const OfficeDetails = ({officeId}: {officeId: number}) => {
  const t = useTranslations()
  const formatter = useFormatter()
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const align = mdUp ? 'horizontal' : 'vertical';

  const {data: office, isLoading} = useOffice(officeId)

  if (!office || isLoading) {
    return null
  }

  return (
    <Card sx={{mt: 3}}>
      <CardContent>
        <PropertyList>
          <PropertyListItem label={t('Id')} value={office.id} align={align} divider/>
          <PropertyListItem label={t('Name (ru)')} value={office.nameRu} align={align} divider />
          <PropertyListItem label={t('Name (kg)')} value={office.nameKg} align={align} divider />
          <PropertyListItem label={t('Created by')} value={office.createdByUser} align={align} divider />
          <PropertyListItem label={t('Created at')} value={formatter.dateTime(new Date(office.createdAt))} align={align} divider />
          <PropertyListItem label={t('Last modified by')} value={office.modifiedByUser} align={align} divider />
          <PropertyListItem label={t('Last modified at')} value={formatter.dateTime(new Date(office.modifiedAt))} align={align} divider />
        </PropertyList>
      </CardContent>
    </Card>
  )
}

const OfficePage = ({
  params
                    }: {
  params: {
    officeId: number
  }
}) => {
  const { officeId} = params
  const t = useTranslations()

  if (officeId <= 0) {
    notFound()
    return null
  }

  return (
    <Container maxWidth='md'>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
      >
        <Typography variant='h4'>
          {t('Office')}
        </Typography>
        <div>
          <Link href='/offices' tabIndex={-1}>
            <ButtonGroup variant='contained'>
              <Button startIcon={<ArrowLeftIcon fontSize='small'/>}>
                {t('Offices')}
              </Button>
            </ButtonGroup>
          </Link>

          <Link href={`offices/${officeId}/edit`}>
            <ButtonGroup variant='contained' sx={{ ml: 1 }}>
              <Button startIcon={<PencilIcon fontSize='small'/>} color='info'>
                {t('Edit')}
              </Button>
            </ButtonGroup>
          </Link>
        </div>
      </Box>


      <OfficeDetails officeId={officeId}/>
    </Container>
  )
}

export default OfficePage
