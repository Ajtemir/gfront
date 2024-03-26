import React from 'react';
import {Chip, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material";
import {ProgressLink as Link} from "@/components/progress-link";
import {ArrowRightIconButton} from "@/components/buttons/arrow-right-icon-button";
import {PencilIconButton} from "@/components/buttons/pencil-icon-button";
import {Plus as PlusIcon} from "@/icons/plus";
import {useTranslations} from "next-intl";
import {useGetApplicationsQuery} from "@/backend-api/application-api";
import {useGetMembersQuery} from "@/backend-api/member-api";
import { RowSkeleton } from '../RowSkeleton';

export const MembersTable = () => {
    const t = useTranslations()
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const {data: members, error, isLoading} = useGetMembersQuery({pageNumber: page + 1, pageSize: rowsPerPage})

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
    };
    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{t('Id')}</TableCell>
                            <TableCell>{t('Pin')}</TableCell>
                            <TableCell>{t('Actions')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading &&
                            <>
                                <RowSkeleton colSpan={8}/>
                                <RowSkeleton colSpan={8}/>
                                <RowSkeleton colSpan={8}/>
                                <RowSkeleton colSpan={8}/>
                                <RowSkeleton colSpan={8}/>
                            </>}
                        {
                            members &&
                            members!.items.map(candidate => (
                                <TableRow key={candidate.id}>
                                    <TableCell>{candidate.id}</TableCell>
                                    <TableCell>{candidate.pin}</TableCell>
                                    <TableCell style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}>
                                        <Link href={`/members/${candidate.id}`}>
                                            <ArrowRightIconButton/>
                                        </Link>
                                        <Link href={`/members/${candidate.id}/edit`}>
                                            <PencilIconButton/>
                                        </Link>
                                        <Link href={`/applications/create?candidateId=${candidate.id}`}>
                                            <PlusIcon/>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            {
                members &&
                <TablePagination
                    rowsPerPageOptions={[1, 5, 10, 25,]}
                    count={members.totalCount}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    page={page}
                    rowsPerPage={rowsPerPage}
                />
            }
        </>
    );
}

