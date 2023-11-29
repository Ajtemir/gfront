'use client'

import {styled} from "@mui/material/styles";
import {IconButton} from "@mui/material";
import { ArrowRight as ArrowRightIcon } from "@/icons/arrow-right";

const IconButtonStyled = styled(IconButton)(({theme}) => ({
  '&:hover': {
    color: theme.palette.primary.main
  }
}))

export const ArrowRightIconButton = () => (
  <IconButtonStyled>
    <ArrowRightIcon fontSize='small'/>
  </IconButtonStyled>
)
