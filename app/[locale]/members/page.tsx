'use client'
import React from 'react';
import {Box, Button, ButtonGroup, Container, Typography} from "@mui/material";
import {ProgressLink as Link} from "@/components/progress-link";
import {Plus as PlusIcon} from "@/icons/plus";
import {useTranslations} from "next-intl";

const Members = () => {
    const t = useTranslations()
    return (
        <Container maxWidth='md'>
            <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                flexWrap='wrap'
                mb={3}
            >
                <Typography variant='h4'>
                    {t('Members')}
                </Typography>

                <Link href='/members/create'>
                    <ButtonGroup variant='contained'>
                        <Button startIcon={<PlusIcon fontSize='small'/>}>
                            {t('create a member')}
                        </Button>
                    </ButtonGroup>
                </Link>
            </Box>

        </Container>
    );
};

export default Members;