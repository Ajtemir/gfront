import {Skeleton} from "@mui/material";

export const RowSkeleton = ({colSpan = 8}: {colSpan: number}) => (
    <tr>
        <td colSpan={colSpan}>
            <Skeleton variant='text' height='45px'/>
        </td>
    </tr>
)