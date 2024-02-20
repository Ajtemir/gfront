"use client";

import {
  Box,
  Button,
  ButtonGroup,
  Container, IconButton,
  Skeleton,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {ProgressLink as Link } from "@/components/progress-link";
import { useFormatter, useTranslations } from "next-intl";
import { Plus as PlusIcon } from "@/icons/plus";
import { AuthGuard } from "@/components/auth-guard";
import { useRewards } from "@/backend-api/reward-api";
import { useParams } from "next/navigation";
import type { Locale } from "@/i18n";
import {ArrowRight as ArrowRightIcon } from "@/icons/arrow-right"
import { Pencil as PencilIcon } from "@/icons/pencil";
import {Reward} from "@/types/reward";
import {PencilIconButton} from "@/components/buttons/pencil-icon-button";
import {ArrowRightIconButton} from "@/components/buttons/arrow-right-icon-button";

export const RowSkeleton = ({colSpan}: {colSpan: number}) => (
  <tr>
    <td colSpan={colSpan}>
      <Skeleton variant='text' height='45px'/>
    </td>
  </tr>
)

const RewardsTable = ({rewards, isLoading}: {rewards: Reward[], isLoading: boolean}) => {
  const t = useTranslations()
  const formatter = useFormatter();

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t("Id")}</TableCell>
            <TableCell>{t("Name (ru)")}</TableCell>
            <TableCell>{t("Name (kg)")}</TableCell>
            <TableCell>{t("Created by")}</TableCell>
            <TableCell>{t("Created at")}</TableCell>
            <TableCell>{t("Last modified by")}</TableCell>
            <TableCell>{t("Last modified at")}</TableCell>
            <TableCell>{t("Actions")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <>
              <RowSkeleton colSpan={7}/>
              <RowSkeleton colSpan={7}/>
              <RowSkeleton colSpan={7}/>
              <RowSkeleton colSpan={7}/>
              <RowSkeleton colSpan={7}/>
            </>
          ) : (
            rewards.map((reward) => (
              <TableRow key={reward.id}>
                <TableCell>{reward.id}</TableCell>
                <TableCell>{reward.nameRu}</TableCell>
                <TableCell>{reward.nameKg}</TableCell>
                <TableCell>{reward.createdByUser}</TableCell>
                <TableCell>{formatter.dateTime(reward.createdAt)}</TableCell>
                <TableCell>{reward.modifiedByUser}</TableCell>
                <TableCell>{formatter.dateTime(reward.modifiedAt)}</TableCell>
                <TableCell
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Link href={`/rewards/${reward.id}`}>
                    <ArrowRightIconButton/>
                  </Link>
                  <Link href={`/rewards/${reward.id}/edit`}>
                    <PencilIconButton/>
                  </Link>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const RewardsPage = () => {
  const t = useTranslations();

  const { data: rewards = [], isLoading } = useRewards();

  return (
    <AuthGuard>
      <Container maxWidth="md">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          mb={3}
        >
          <Typography variant="h4">{t('Rewards')}</Typography>

          <Link href="/rewards/create">
            <ButtonGroup variant="contained">
              <Button startIcon={<PlusIcon fontSize="small" />}>
                {t('Create a reward')}
              </Button>
            </ButtonGroup>
          </Link>
        </Box>

        <RewardsTable rewards={rewards} isLoading={isLoading}/>
      </Container>
    </AuthGuard>
  );
};

export default RewardsPage;
