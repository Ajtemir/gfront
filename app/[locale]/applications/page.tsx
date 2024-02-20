'use client'
import Candidates from "@/components/candidates";
import React from "react";
import Applications from "@/components/applications/applications";
import {Box, Button, ButtonGroup, Container, Typography, TablePagination} from "@mui/material";
import {ProgressLink as Link} from "@/components/progress-link";
import {Plus as PlusIcon} from "@/icons/plus";
import {AuthGuard} from "@/components/auth-guard";
import {useTranslations} from "next-intl";
import {useGetApplicationsQuery} from "@/backend-api/application-api";
import { RowSkeleton } from "../rewards/page";

const ApplicationPage = () => {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const {data:applications, error, isLoading} = useGetApplicationsQuery({pageNumber:page+1, pageSize:rowsPerPage})

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        console.log(newPage)
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const t = useTranslations()
    return <AuthGuard>
        <Container maxWidth="md">
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                flexWrap="wrap"
                mb={3}
            >
                <Typography variant="h4">{t('Applications')}</Typography>
            </Box>
            {isLoading &&
                        <>
                        <RowSkeleton colSpan={8}/>
                        <RowSkeleton colSpan={8}/>
                        <RowSkeleton colSpan={8}/>
                        <RowSkeleton colSpan={8}/>
                        <RowSkeleton colSpan={8}/>
                        </>
            }
            {
                applications &&
                <>
                    <Applications applications={applications.items}/>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25,]}
                        count={applications.totalCount}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        page={page}
                        rowsPerPage={rowsPerPage}
                    />
                </>
            }

        </Container>
    </AuthGuard>
}


export default ApplicationPage