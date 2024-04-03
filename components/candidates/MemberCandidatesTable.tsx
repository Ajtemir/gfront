import React from 'react';
import {Candidate} from "@/types/candidate";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {RowSkeleton} from "@/components/RowSkeleton";
import {ProgressLink as Link} from "@/components/progress-link";
import {ArrowRightIconButton} from "@/components/buttons/arrow-right-icon-button";
import {PencilIconButton} from "@/components/buttons/pencil-icon-button";
import {Plus as PlusIcon} from "@/icons/plus";
import {useTranslations} from "next-intl";

interface MemberCandidatesTableProps {
    candidates:Candidate[]
}
const MemberCandidatesTable = ({candidates}:MemberCandidatesTableProps) => {
    const t = useTranslations()
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>{t('Candidate id')}</TableCell>
                        <TableCell>{t('Pin')}</TableCell>
                        <TableCell>{t('Actions')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        candidates.map((candidate) =>
                            (<TableRow key={candidate.id}>
                                <TableCell>{candidate.id}</TableCell>
                                <TableCell>{candidate.candidateType}</TableCell>
                                <TableCell style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}>
                                    <Link href={`/members/${candidate.id}`}>
                                        <ArrowRightIconButton/>
                                    </Link>
                                    <Link href={`/candidates/${candidate.id}/edit`}>
                                        <PencilIconButton/>
                                    </Link>
                                    <Link href={`/applications/create?candidateId=${candidate.id}`}>
                                        <PlusIcon/>
                                    </Link>
                                </TableCell>
                            </TableRow>)
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MemberCandidatesTable;