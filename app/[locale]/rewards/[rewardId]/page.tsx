'use client'

import Image from 'next/image'
import { Box, Button, ButtonGroup, Card, CardContent, CardHeader, Container, Typography, useMediaQuery, Theme, Divider } from "@mui/material";
import { useFormatter, useTranslations } from "next-intl";
import {ProgressLink as Link} from "@/components/progress-link";
import { notFound } from "next/navigation";
import { useReward } from "@/backend-api/reward-api";
import { PropertyList } from "@/components/property-list";
import { PropertyListItem } from "@/components/property-list-item";
import { ArrowLeft as ArrowLeftIcon } from "@/icons/arrow-left";
import { Pencil as PencilIcon } from "@/icons/pencil";

const RewardDetails = ({ id }: { id: number }) => {
  const t = useTranslations();
  const formatter = useFormatter();
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const align = mdUp ? 'horizontal' : 'vertical';
  const {data: reward, isLoading} = useReward(id)

  if (isLoading || !reward) return null

  return (
    <>
    <Card sx={{mt: 3}}>
      <CardHeader title={t('Basic details')} />
      <Divider/>
      <CardContent>
        <PropertyList>
          <PropertyListItem label={t('Id')} value={reward.id} align={align} divider/>
          <PropertyListItem label={t('Name (ru)')} value={reward.nameRu} align={align} divider/>
          <PropertyListItem label={t('Name (kg)')} value={reward.nameKg} align={align} divider/>
          <PropertyListItem label={t('Filename')} value={reward.imageName} align={align} divider/>
          <PropertyListItem label={t('Created by')} value={reward.createdByUser} align={align} divider/>
          <PropertyListItem label={t('Created at')} value={formatter.dateTime(reward.createdAt)} align={align} divider/>
          <PropertyListItem label={t('Last modified by')} value={reward.modifiedByUser} align={align} divider/>
          <PropertyListItem label={t('Last modified at')} value={formatter.dateTime(reward.modifiedAt)} align={align} divider/>
        </PropertyList>
      </CardContent>
    </Card>

    <Card sx={{mt:3}}>
      <CardHeader title={t('Image')}/>
      <Divider/>
      <CardContent style={{
        display: 'flex',
        justifyContent: 'center'
      }}>
        <Image
          src={`data:image/jpeg;base64,${reward.image}`}
          alt='Reward'
          height={600}
          width={800}
          style={{ objectFit: 'contain' }}
        />
      </CardContent>
    </Card>
    </>
  )
};

const RewardPage = ({
  params,
}: {
  params: {
    rewardId: number;
  };
}) => {
  const { rewardId } = params;
  const t = useTranslations();

  if (rewardId <= 0) {
    notFound();
    return null;
  }

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
      >
        <Typography variant='h4'>
          {t('Reward')}
        </Typography>

        <div>
          <Link href='/rewards' tabIndex={-1}>
            <ButtonGroup variant='contained'>
              <Button startIcon={<ArrowLeftIcon fontSize='small'/>}>
                {t('Rewards')}
              </Button>
            </ButtonGroup>
          </Link>
          
          <Link href={`/rewards/${rewardId}/edit`}>
            <ButtonGroup variant='contained' sx={{ ml: 1 }}>
              <Button startIcon={<PencilIcon fontSize='small'/>} color='info'>
                {t('Edit')}
              </Button>
            </ButtonGroup>
          </Link>
        </div>
      </Box>

      <RewardDetails id={rewardId} />
    </Container>
  );
};

export default RewardPage;
