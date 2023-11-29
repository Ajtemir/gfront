'use client'

import {styled} from '@mui/material/styles'
import {IconButton} from "@mui/material";
import { Pencil as PencilIcon } from "@/icons/pencil";


const IconButtonStyled = styled(IconButton)(({theme}) => ({
  '&:hover': {
    color: theme.palette.primary.main
  }
}))

export const PencilIconButton = () => (
  <IconButtonStyled>
    <PencilIcon fontSize='small' />
  </IconButtonStyled>
)
