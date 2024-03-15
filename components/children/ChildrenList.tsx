import React from 'react';
import {Child} from "@/types/child";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useTranslations} from "next-intl";
import ChildItem from "@/components/children/ChildItem";
import {ChildListItem} from "@/types/childListItem";

export interface ChildrenListProps{
    motherChildren: ChildListItem[]
}
const ChildrenList = ({motherChildren}:ChildrenListProps) => {
    const t = useTranslations()
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>{t('Identifier')}</TableCell>
                        <TableCell>{t('Full name')}</TableCell>
                        <TableCell>{t('Gender')}</TableCell>
                        <TableCell>{t('Actions')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {motherChildren.map(child => (<ChildItem key={child.id} child={child}/>))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ChildrenList;