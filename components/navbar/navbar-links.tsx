'use client'

import { Box, Button, ButtonGroup, ButtonProps } from "@mui/material";
import React from "react";
import {ProgressLink as Link} from "@/components/progress-link";
import { usePathname } from "next-intl/client";
import { Photograph as PhotographIcon } from "@/icons/photograph";
import { Star as StarIcon } from '@/icons/star'
import { useTranslations } from "next-intl";
import {OfficeBuilding as OfficeBuildingIcon} from '@/icons/office-building'

const CandidateMenu = () => {
  const t = useTranslations()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <Button
      aria-controls={open ? 'candidate-menu' : undefined}
      aria-haspopup='true'
      aria-expanded={open ? 'true' : undefined}
      onClick={handleClick}
    >
      {t('Candidates')}
    </Button>
  )
}

interface LinkButtonProps extends ButtonProps {
  path: string,
  active: boolean,
  children: React.ReactNode
}

const LinkButton = ({
  path,
  active,
  children,
  ...other
}: LinkButtonProps) => (
  <Link href={path}>
    <Button {...other} sx={{
      color: active ? 'primary.main' : 'neutral.300',
      '&:hover': {
        backgroundColor: 'rgba(255,255,255, 0.08)'
      },
      '& .MuiButton-startIcon': {
        color: active ? 'primary.main' : 'neutral.400'
      },
      '& .MuiButton-endIcon': {
        color: 'neutral.400'
      }
    }}
    >
      {children}
    </Button>
  </Link>
)

const Links = [
  {path: '/', alternatePath: '/candidates', label: 'Candidates', icon: <PhotographIcon fontSize='small' />},
  {path: '/rewards', alternatePath: null, label: 'Rewards', icon: <StarIcon fontSize='small' />},
  {path: '/offices', alternatePath: null, label: 'Offices', icon: <OfficeBuildingIcon fontSize='small' />},
  {path: '/applications', alternatePath: null, label: 'Applications', icon: <OfficeBuildingIcon fontSize='small' />}
]

const NavbarLinks = () => {
  const t = useTranslations()
  const pathname = usePathname() ?? '/'

  return (
    <Box>
      <ButtonGroup variant='text'>
        {Links.map((link) => (
          <LinkButton
            key={link.path}
            path={link.path}
            active={pathname === link.path || pathname == link?.alternatePath}
            startIcon={link.icon}
          >
            {
              // @ts-ignore
              t(link.label)
            }
          </LinkButton>
        ))}
      </ButtonGroup>
    </Box>
  )
}


export default NavbarLinks
