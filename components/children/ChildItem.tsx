import React, {useState} from 'react';
import {Chip, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {ProgressLink as Link} from "@/components/progress-link";
import {ArrowRightIconButton} from "@/components/buttons/arrow-right-icon-button";
import {PencilIconButton} from "@/components/buttons/pencil-icon-button";
import {Plus as PlusIcon} from "@/icons/plus";
import {ChildListItem} from "@/types/childListItem";

interface ChildItemProps {
    child: ChildListItem
}
const ChildItem = ({child:childArgument}:ChildItemProps) => {
    const [child, setChild] = useState<ChildListItem>(childArgument)
    return (
        <TableRow key={child.id}>
            <TableCell>{child.id}</TableCell>
            <TableCell>{child.fullName}</TableCell>
            <TableCell>{child.gender}</TableCell>
            <TableCell
                style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
            >
                <Link href={`/children/${child.id}`}>
                    <ArrowRightIconButton/>
                </Link>
                <Link href={`/children/${child.id}/edit`}>
                    <PencilIconButton/>
                </Link>
                <Link href={`/applications/create?candidateId=${child.id}`}>
                    <PlusIcon/>
                </Link>
            </TableCell>
        </TableRow>
    );
};

export default ChildItem;