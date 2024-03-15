import React from 'react';
import {Person} from "@/types/person";
import {Avatar, Button, ButtonGroup, Card, CardContent, CardHeader, Chip, Divider, Theme, useMediaQuery} from "@mui/material";
import {PropertyList} from "@/components/property-list";
import {PropertyListItem} from "@/components/property-list-item";
import {useFormatter, useTranslations} from "next-intl";
import {ArrowLeft as ArrowLeftIcon} from "@/icons/arrow-left";
import {ProgressLink as Link} from "@/components/progress-link";
import {useRouter} from "next/navigation";

interface PersonDetailProps {
   person : Person
}
const PersonDetailView = ({person}:PersonDetailProps) => {
    const t = useTranslations()
    const formatter = useFormatter();
    const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
    const align = mdUp ? 'horizontal' : 'vertical';
    const router = useRouter()
    return (
        <Card>
            <CardHeader
                // avatar={
                //     <Avatar aria-label="recipe" >
                //         R
                //     </Avatar>
                // }
                action={
                    <ButtonGroup variant='contained'>
                        <Button startIcon={<ArrowLeftIcon fontSize='small'/>} onClick={() => {
                            router.push(`/members/${person.id}`)
                        }}>
                            {t('Go to person detail')}
                        </Button>
                    </ButtonGroup>
                }
                title={t('Basic details')}
            />
            <Divider/>
            <CardContent>
                <PropertyList>
                    <PropertyListItem
                        align={align}
                        divider
                        label={t('Id')}
                        value={person.id}
                    />
                    <PropertyListItem
                        align={align}
                        divider
                        label={t('Last name')}
                        value={person.lastName}
                    />
                    <PropertyListItem
                        align={align}
                        divider
                        label={t('First name')}
                        value={person.firstName}
                    />
                    <PropertyListItem
                        align={align}
                        divider
                        label={t('Patronymic name')}
                        value={person.patronymicName ?? ''}
                    />
                    <PropertyListItem
                        align={align}
                        divider
                        label={t('Pin')}
                        value={person.pin ?? ''}
                    />
                    <PropertyListItem
                        align={align}
                        divider
                        label={t('Passport number')}
                        value={person.passportNumber ?? ''}
                    />
                    <PropertyListItem
                        align={align}
                        divider
                        label={t('Gender')}
                        value={t(person.gender)}
                    />
                    <PropertyListItem
                        align={align}
                        divider
                        label={t('Birth date')}
                        value={formatter.dateTime(new Date(person.birthDate))}
                    />
                    <PropertyListItem
                        align={align}
                        divider
                        label={t('Death date')}
                        value={person.deathDate ? formatter.dateTime(new Date(person.deathDate)) : ''}
                    />
                    <PropertyListItem
                        align={align}
                        divider
                        label={t('Registered address')}
                        value={person.registeredAddress}
                    />
                    <PropertyListItem
                        align={align}
                        divider
                        label={t('Actual address')}
                        value={person.actualAddress ?? ''}
                    />
                </PropertyList>
            </CardContent>
        </Card>
    );
};

export default PersonDetailView;