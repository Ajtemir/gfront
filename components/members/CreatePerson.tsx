import React, {KeyboardEventHandler, useEffect, useState} from 'react';
import {Box, ButtonGroup, Card, CardContent} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import GridFormikTextField from "@/components/GridFormikTextField";
import {nameof} from "@/utils/nameof";
import {Child} from "@/types/child";
import GridFormikDatePicker from "@/components/GridFormikDatePicker";
import {GridGenderSelectFormikField} from "@/components/GridSelectFormikField";
import GridBooleanFormikField from "@/components/GridBooleanFormikField";
import {SubmitButton} from "@/components/buttons/submit-button";
import {useFormatter, useTranslations} from "next-intl";
import {useFormik} from "formik";
import {useRouter} from "next/navigation";
import {
    useCreatePersonMutation,
    useGetPersonDataByPinQuery,
    useLazyGetPersonDataByPinQuery
} from "@/backend-api/member-api";
import toast from "react-hot-toast";
import {formatYupError} from "@/utils/format-yup-error";
import {UpdateCitizenImageSchema} from "@/schemas";
import {UpdateCitizenImage} from "@/types/citizen";
import {Person} from "@/types/person";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";

const CreatePerson = () => {
    const initialValues = {
        pin:''
    } as Person
    const router = useRouter()
    const formatter = useFormatter()
    const [ trigger] = useLazyGetPersonDataByPinQuery()
    const [createPerson, {data, error, isLoading}] = useCreatePersonMutation()
    const t = useTranslations()

    const formik= useFormik({
        initialValues: initialValues,
        onSubmit: async (person) => {
            const createPersonCall = async () => {
                const createdPerson = await createPerson(person).unwrap()
                router.push(`members/${createdPerson.id}`)
            }

            await toast.promise( createPersonCall(), {
                loading: t('Pending'),
                success: t('Success'),
                error:  t('Failed')
            })
        }
    })

    const onChange = async (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (formik.values.pin?.length === 14 && event.key === 'Enter') {
            const tryUpdateCitizen = async () => {
                const {data, error} = await trigger(formik.values.pin!)
                if(data) {
                    await formik.setFieldValue(nameof<Person>('firstName'), data.firstName)
                    await formik.setFieldValue(nameof<Person>('lastName'), data.lastName)
                    await formik.setFieldValue(nameof<Person>('pin'), data.pin)
                    await formik.setFieldValue(nameof<Person>('gender'), data.gender)
                    await formik.setFieldValue(nameof<Person>('patronymicName'), data.patronymicName)
                    await formik.setFieldValue(nameof<Person>('birthDate'), formatter.dateTime(data.birthDate!))
                    await formik.setFieldValue(nameof<Person>('deathDate'), data.deathDate ? formatter.dateTime(data.deathDate) : null)
                    await formik.setFieldValue(nameof<Person>('registeredAddress'), data.registeredAddress)
                    await formik.setFieldValue(nameof<Person>('passportSeriesNumber'), data.passportSeriesNumber)
                }
                if(error){
                    throw error
                }
            }
            await toast.promise( tryUpdateCitizen(), {
                loading: t('Pending'),
                success: t('Success'),
                error: (err) => {
                    console.error(formatYupError(err))
                    return t('Failed')
                }
            })
        }
    };

    return (
        <Box component='form' onSubmit={formik.handleSubmit}>
            <Card>
                <CardContent>
                    <Grid container spacing={3}>

                        <GridFormikTextField
                            name={nameof<Person>('firstName')}
                            label='First name'
                            formik={formik}
                            required
                        />

                        <GridFormikTextField
                            name={nameof<Person>('lastName')}
                            label='Last name'
                            formik={formik}
                            required
                        />

                        <GridFormikTextField
                            name={nameof<Person>('patronymicName')}
                            label='Patronymic name'
                            formik={formik}
                        />

                        <GridFormikTextField
                            name={nameof<Person>('birthDate')}
                            label='Birth date'
                            formik={formik}
                        />

                        <GridFormikTextField
                            name={nameof<Person>('pin')}
                            label='Pin'
                            formik={formik}
                            onKeyDown={onChange}
                        />

                        <GridFormikTextField
                            name={nameof<Person>('passportSeriesNumber')}
                            label='Passport series and number'
                            formik={formik}
                        />

                        <GridFormikTextField
                            name={nameof<Person>('registeredAddress')}
                            label='Registered address'
                            formik={formik}
                        />

                        <GridFormikDatePicker
                            name={nameof<Person>('deathDate')}
                            label='Death date'
                            formik={formik}
                        />

                        <GridGenderSelectFormikField
                            label="Gender"
                            name={nameof<Person>('gender')}
                            formik={formik}
                        />

                    </Grid>
                </CardContent>
            </Card>

            <Card sx={{mt: 3}}>
                <CardContent>
                    <ButtonGroup variant='contained'>
                        <SubmitButton>
                            {t('Submit')}
                        </SubmitButton>
                    </ButtonGroup>
                </CardContent>
            </Card>

        </Box>
    );
};

export default CreatePerson;