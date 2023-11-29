'use client'

import {Button, ButtonProps} from "@mui/material";
import {Save as SaveIcon} from '@/icons/save'

interface SubmitButtonProps extends ButtonProps {
}

export const SubmitButton = ({
                               children,
                               type = 'submit',
                               color = 'success',
                               ...other
                             }: SubmitButtonProps) => (
  <Button
    {...other}
    type={type}
    color={color}
    startIcon={<SaveIcon fontSize="small"/>}
  >
    {children}
  </Button>
)
