'use client'

import {Button, ButtonProps} from "@mui/material";
import { ArrowLeft as ArrowLeftIcon } from '@/icons/arrow-left'

interface ArrowLeftButtonProps extends ButtonProps {}

export const ArrowLeftButton = ({children, ...other}: ArrowLeftButtonProps) => (
  <Button
    {...other}
    startIcon={<ArrowLeftIcon fontSize='small' />}
  >
    {children}
  </Button>
)
