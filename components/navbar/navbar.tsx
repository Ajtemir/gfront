'use client'

import React, { useRef, useState } from "react";
import {
  AppBar, Avatar, Box, ButtonBase, IconButton, styled, Toolbar
} from "@mui/material";
import { AppBarProps } from "@mui/material";
import type { Locale } from '@/i18n'
import NavbarLinks from "@/components/navbar/navbar-links";
import { LocaleOptions } from "@/i18n";
import { useLocale } from "next-intl";
import { LanguagePopover } from "@/components/navbar/language-popover";
import Image from 'next/image'
import { UserCircle } from "@/icons/user-circle";
import { AccountPopover } from "@/components/navbar/account-popover";
import { useAuth } from "@/hooks/use-auth";

const LanguageButton = () => {
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const locale = useLocale()

  const handleOpenPopover = (): void => {
    setOpenPopover(true);
  };

  const handleClosePopover = (): void => {
    setOpenPopover(false);
  };

  return (
    <>
      <IconButton
        onClick={handleOpenPopover}
        ref={anchorRef}
        sx={{ml: 1}}
      >
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
            alt="Language icon"
            src={LocaleOptions[locale as Locale].icon}
            width={20}
            height={20}
          />
        </Box>
      </IconButton>
      <LanguagePopover
        anchorEl={anchorRef.current}
        onClose={handleClosePopover}
        open={openPopover}
      />
    </>
  )
}

const AccountButton = () => {
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const {user} = useAuth()

  const handleOpenPopover = () => setOpenPopover(true);
  const handleClosePopover = () => setOpenPopover(false);


  return (
    <>
      <Box
        component={ButtonBase}
        onClick={handleOpenPopover}
        ref={anchorRef}
        sx={{
          display: 'flex',
          alignItems: 'center',
          ml: 2
        }}
      >
        <Avatar
          sx={{height: 40, width: 40}}
          src={user?.image ? `data:image/jpeg;base64,${user.image}` : ''}
        >
          <UserCircle fontSize='small'/>
        </Avatar>
      </Box>
      <AccountPopover
        anchorEl={anchorRef.current}
        onClose={handleClosePopover}
        open={openPopover}
      />
    </>
  )
}

const Spacer = () => (<Box sx={{flexGrow: 1}}/>)


const NavbarRoot = styled(AppBar)(
  ({theme}) => ({
    backgroundColor: theme.palette.background.paper,
    ...(
      theme.palette.mode === 'light'
        ? {
          boxShadow: theme.shadows[3]
        }
        : {
          backgroundColor: theme.palette.background.paper,
          borderBottomColor: theme.palette.divider,
          borderBottomStyle: 'solid',
          borderBottomWidth: 1,
          boxShadow: 'none'
        }
    )
  })
);


interface NavbarProps extends AppBarProps {
}

const Navbar = (props: NavbarProps) => {
  return (
    <NavbarRoot {...props}>
      <Toolbar
        disableGutters
        sx={{
          minHeight: 64,
          left: 0,
          px: 2
        }}
      >
        <NavbarLinks/>
        <Spacer/>
        <LanguageButton/>
        <AccountButton/>

      </Toolbar>
    </NavbarRoot>
  )
}

export default Navbar