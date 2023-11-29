'use client'

import {Button, ButtonProps} from "@mui/material";
import {Trash as TrashIcon} from '@/icons/trash'

interface TrashButtonProps extends ButtonProps {
}

export const TrashButton = ({
                              children,
                              type = 'button',
                              color = 'error',
                              ...other
                            }: TrashButtonProps) => {

  return (
    <Button
      {...other}
      type={type}
      color={color}
      startIcon={<TrashIcon fontSize="small"/>}
    >
      {children}
    </Button>
  )
}
