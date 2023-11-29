'use client'

import type { Locale } from "@/i18n";
import { Box, ListItemIcon, ListItemText, MenuItem, Popover, Typography } from "@mui/material";
import { LocaleOptions } from "@/i18n";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import { usePathname } from "next-intl/client";
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface LanguagePopoverProps {
  anchorEl: null | Element;
  onClose?: () => void;
  open?: boolean;
  
  [key: string]: any;
}

export const LanguagePopover = ({anchorEl, onClose, open, ...other}: LanguagePopoverProps) => {
  const pathname = usePathname()
  const router = useRouter()
  
  const handleChange = async (locale: Locale): Promise<void> => {
    onClose?.();
    
    // change locale
    router.push(`${locale}/${pathname}`)
    
    switch (locale) {
      case "en":
        toast.success("Language changed")
        break;
      case "ru":
        toast.success("Язык изменён")
        break;
    }
  }
  
  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'bottom'
      }}
      keepMounted
      open={!!open}
      onClose={onClose}
      PaperProps={{sx: {width: 240}}}
      transitionDuration='auto'
      {...other}
    >
      {(Object.keys(LocaleOptions) as Locale[]).map((locale) => (
        <MenuItem key={locale} onClick={() => handleChange(locale)}>
          <ListItemIcon>
            <Box
              sx={{
                display: 'flex',
                height: 20,
                width: 20,
                '& img': {
                  width: '100%'
                }
              }}
            >
              <Image
                alt={LocaleOptions[locale].label}
                src={LocaleOptions[locale].icon}
                width={20}
                height={20}
              />
            </Box>
          </ListItemIcon>
          <ListItemText
            primary={(
              <Typography variant='subtitle2'>
                {
                  LocaleOptions[locale].label
                }
              </Typography>
            )}
          />
        </MenuItem>
      ))}
    </Popover>
  )
}

LanguagePopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool
};
