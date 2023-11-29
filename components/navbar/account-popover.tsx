'use client'

import toast from "react-hot-toast";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Box,
  Divider,
  Popover,
  Typography,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { UserCircle } from "@/icons/user-circle";
import {ProgressLink as Link} from "@/components/progress-link";
import { Cog as CogIcon } from "@/icons/cog";
import LogoutIcon from '@mui/icons-material/Logout';
import React, { ReactNode, useState } from "react";
import { SettingsDrawer } from "@/components/navbar/settings-drawer";
import { useTranslations } from "next-intl";

const SettingsListItem = () => {
  const t = useTranslations()
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };
  
  return (
    <>
      <MenuItem onClick={handleOpen}>
        <ListItemIcon>
          <CogIcon fontSize='small' />
        </ListItemIcon>
        <ListItemText primary={
          <Typography variant='body1'>
            {t('Settings')}
          </Typography>
        }/>
      </MenuItem>
      <SettingsDrawer
        onClose={handleClose}
        open={open}
      />
    </>
  )
}

const UnstyledLink = ({href, children}: {href: string, children?: ReactNode}) => (
  <Link href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
    {children}
  </Link>
)

interface AccountPopoverProps {
  anchorEl: null | Element;
  onClose?: () => void;
  open?: boolean;
}

export const AccountPopover = ({anchorEl, onClose, open}: AccountPopoverProps) => {
  const t = useTranslations()
  const router = useRouter()
  const {user, logout} = useAuth()
  
  const handleLogout = async () => {
    try {
      onClose?.();
      await logout()
      router.push('/login')
    } catch (err) {
      console.error(err)
      toast.error('Unable to logout.')
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
      onClose={onClose}
      PaperProps={{ sx: { width: 300 } }} 
      open={!!open}
    >
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        p: 2
      }}>
        <Avatar
          src={user?.image ? `data:image/jpeg;base64,${user.image}` : ''}
          sx={{ height: 40, width: 40 }}
        >
          <UserCircle fontSize='small' />
        </Avatar>
        <Box ml={1}>
          <Typography variant='body1'>
            {!!user ? `${user.lastName} ${user.firstName}` : null}
          </Typography>
          <Typography color='textSecondary' variant='body2'>
            {!!user ? user.pin : null}
          </Typography>
        </Box>
      </Box>
      <Divider/>
      <Box my={1}>
        <UnstyledLink href='/account'>
          <MenuItem>
            <ListItemIcon>
              <UserCircle fontSize='small' />
            </ListItemIcon>
            <ListItemText primary={
              <Typography variant='body1'>{t('Profile')}</Typography>
            }/>
          </MenuItem>
        </UnstyledLink>
        <UnstyledLink href='/'>
          <SettingsListItem/>
        </UnstyledLink>
        <Divider/>
        <UnstyledLink href='/'>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText primary={
              <Typography variant='body1'>{t('Logout')}</Typography>
            }/>
          </MenuItem>
        </UnstyledLink>
      </Box>
    </Popover>
  )
}
