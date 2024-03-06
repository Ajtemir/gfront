import {Container, Skeleton} from "@mui/material";

const RowSkeleton = ({colSpan}: {colSpan: number}) => (
    <tr>
        <td colSpan={colSpan}>
            <Skeleton variant='text' height='45px'/>
        </td>
    </tr>
)

import React from 'react';

const Loading = () => {
    return (
        <Container maxWidth={"md"}>
            <RowSkeleton colSpan={7}/>
            <RowSkeleton colSpan={7}/>
            <RowSkeleton colSpan={7}/>
            <RowSkeleton colSpan={7}/>
            <RowSkeleton colSpan={7}/>
            <RowSkeleton colSpan={7}/>
        </Container>
    );
};

export default Loading;