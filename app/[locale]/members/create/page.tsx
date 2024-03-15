'use client'
import {ButtonGroup, Card, CardContent, Container} from '@mui/material';
import React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import {FormikTextField} from "@/components/formik-text-field";
import {nameof} from "@/utils/nameof";
import {CreateOffice} from "@/types/office";
import MultiSelect from "@/components/multi-select";
import {SubmitButton} from "@/components/buttons/submit-button";
import {TrashButton} from "@/components/buttons/trash-button";
import {useFormik} from "formik";
import {useTranslations} from "next-intl";
import GridFormikTextField from '@/components/GridFormikTextField';
import {GridGenderSelectFormikField} from "@/components/GridSelectFormikField";

interface Member {
    id: number
    pin: string
    firstName: string
    lastName: string
    patronymicName: string
    gender: number
}
const MemberCreate = () => {
    const t = useTranslations()
    const initialValues : Member = {} as Member
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: values => {

        }
    })


    return (
        <Container maxWidth='md' component='main'>
            <Card>
                <CardContent>
                    <Grid container spacing={3}>

                        <GridFormikTextField
                            name={nameof<Member>('firstName')}
                            label='First name'
                            formik={formik}
                            labelRequired
                        />

                        <GridFormikTextField
                            name={nameof<Member>('lastName')}
                            label='Last name'
                            formik={formik}
                            labelRequired
                        />

                        <GridFormikTextField
                            name={nameof<Member>('patronymicName')}
                            label='Patronymic name'
                            formik={formik}
                        />

                        <GridFormikTextField
                            name={nameof<Member>('pin')}
                            label='Pin'
                            formik={formik}
                        />

                        <GridGenderSelectFormikField
                            name={nameof<Member>('gender')}
                            label="Gender"
                         formik={formik}
                        />

                        <Grid md={12} xs={12}>
                            <ButtonGroup variant='contained'>
                                <SubmitButton>
                                    {t('Submit')}
                                </SubmitButton>
                            </ButtonGroup>

                            <ButtonGroup sx={{ml: 1}} variant='contained'>
                                <TrashButton onClick={() => formik.resetForm()}>
                                    {t('Clear')}
                                </TrashButton>
                            </ButtonGroup>
                        </Grid>

                    </Grid>
                </CardContent>
            </Card>

        </Container>
    );
};

export default MemberCreate;