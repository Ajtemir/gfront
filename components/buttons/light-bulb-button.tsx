'use client'

import {Button, ButtonProps} from "@mui/material";
import {LightBulb as LightBulbIcon} from '@/icons/light-bulb'

interface LightBulbButtonProps extends ButtonProps {
}

export const LightBulbButton = ({children, type = 'button', color = 'warning', ...other}: LightBulbButtonProps) => {

  return (
    <Button
      {...other}
      type={type}
      color={color}
      startIcon={<LightBulbIcon fontSize="small"/>}
    >
      {children}
    </Button>
  )
}
