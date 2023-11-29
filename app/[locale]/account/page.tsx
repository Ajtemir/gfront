'use client'

import Image from 'next/image'
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Container,
  Typography,
  useMediaQuery, Theme, CardHeader, Divider, Chip
} from "@mui/material";
import { useFormatter, useTranslations } from "next-intl";
import { useAuth } from "@/hooks/use-auth";
import { AuthGuard } from "@/components/auth-guard";
import { PropertyList } from "@/components/property-list";
import { PropertyListItem } from "@/components/property-list-item";
import { Pencil as PencilIcon } from "@/icons/pencil"
import {ProgressLink as Link} from "@/components/progress-link";

const Account = () => {
  const t = useTranslations()
  const formatter = useFormatter()
  const {user} = useAuth()
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  const align = mdUp ? 'horizontal' : 'vertical';

  if (!user) return null
  
  const name = [user.lastName, user.firstName, user.patronymicName].filter(Boolean).join(' ')
  
  return (
    <AuthGuard>
      <Container maxWidth='md'>
        <Box
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          flexWrap='wrap'
        >
          <Typography variant='h4'>
            {t('Account')}
          </Typography>

          <Link href='account/edit'>
            <ButtonGroup variant='contained'>
              <Button startIcon={<PencilIcon fontSize='small' />}>
                {t('Edit')}
              </Button>
            </ButtonGroup>
          </Link>
        </Box>
        
        <Card sx={{ mt: 3}}>
          <CardHeader title={t('Basic details')} />
          <Divider/>
          <CardContent>
            <PropertyList>
              <PropertyListItem
                align={align}
                divider
                label={t('Id')}
                value={user.id}
              />
              <PropertyListItem
                align={align}
                divider
                label={t('Name')}
                value={name}
              />
              <PropertyListItem
                align={align}
                divider
                label='Email'
                value={user.email || ''}
              />
              <PropertyListItem
                align={align}
                divider
                label={t('Pin')}
              >
                {!!user.pin ?
                  (<Chip key={user.pin} label={user.pin} />)
                  : null
                }
              </PropertyListItem>
              <PropertyListItem
                align={align}
                divider
                label={t('Roles')}
              >
                {user.roles.length > 0
                  ? (user.roles.map((role) => <Chip key={role} label={role} sx={{ mr: 1}} />))
                  : null
                }
              </PropertyListItem>
              <PropertyListItem
                align={align}
                divider
                label={t('Created by')}
                value={user.createdBy}
              />
              <PropertyListItem
                align={align}
                divider
                label={t('Created at')}
                value={formatter.dateTime(user.createdAt)}
              />
              <PropertyListItem
                align={align}
                divider
                label={t('Last modified by')}
                value={user.modifiedBy}
              />
              <PropertyListItem
                align={align}
                divider
                label={t('Created at')}
                value={formatter.dateTime(user.createdAt)}
              />
            </PropertyList>
          </CardContent>
        </Card>

        {user.image && (
          <Card sx={{mt: 3}}>
            <CardHeader title={t('Image')}/>
            <Divider/>
            <CardContent>
              <Image
                src={`data:image/jpeg;base64,${user.image}`}
                alt='User profile'
                height={600}
                width={800}
                style={{ objectFit: 'contain' }}
              />
            </CardContent>
          </Card>  
        )}
      </Container>
    </AuthGuard>
  )
}

export default Account
