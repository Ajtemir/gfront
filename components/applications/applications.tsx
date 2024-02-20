import React from 'react';
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
import {ProgressLink as Link} from "@/components/progress-link";
import {ArrowRightIconButton} from "@/components/buttons/arrow-right-icon-button";
import {PencilIconButton} from "@/components/buttons/pencil-icon-button";
import {Plus as PlusIcon} from "@/icons/plus";
import {useTranslations} from "next-intl";
import {useGetApplicationsQuery} from "@/backend-api/application-api";
import {RowSkeleton} from "@/app/[locale]/rewards/page";
import {Application} from "@/types/application";

const Applications = ({applications}:{applications: Application[]}) => {
    const t = useTranslations()
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>{t('Id')}</TableCell>
                        <TableCell>{t('Reward name')}</TableCell>
                        <TableCell>{t('Candidate type')}</TableCell>
                        <TableCell>{t('Candidate id')}</TableCell>
                        <TableCell>{t('Actions')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/*{isLoading && (*/}
                    {/*        <>*/}
                    {/*            <RowSkeleton colSpan={8}/>*/}
                    {/*            <RowSkeleton colSpan={8}/>*/}
                    {/*            <RowSkeleton colSpan={8}/>*/}
                    {/*            <RowSkeleton colSpan={8}/>*/}
                    {/*            <RowSkeleton colSpan={8}/>*/}
                    {/*        </>*/}
                    {/*    )*/}
                    {/*}*/}
                    {applications &&
                        applications.map(application => (
                            <TableRow key={application.id}>
                                <TableCell>{application.id}</TableCell>
                                <TableCell>{application.reward.nameRu}</TableCell>
                                <TableCell>{application.candidate.candidateTypeId}</TableCell>
                                <TableCell>{application.candidate.id}</TableCell>
                                <TableCell style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}>
                                    <Link href={`/applications/${application.id}/edit`}>
                                        <PencilIconButton/>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}

                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Applications;