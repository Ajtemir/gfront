import React from 'react';
import {Box, ButtonGroup, Card, CardContent} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import GridFormikTextField from "@/components/GridFormikTextField";
import {nameof} from "@/utils/nameof";
import {Person} from "@/types/person";
import GridFormikDatePicker from "@/components/GridFormikDatePicker";
import {GridGenderSelectFormikField} from "@/components/GridSelectFormikField";
import {useFormik} from "formik";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import {useFormatter, useTranslations} from "next-intl";
import {
    useCreatePersonMutation,
    useLazyGetPersonDataByPinQuery,
    useUpdatePersonMutation
} from "@/backend-api/member-api";
import {SubmitButton} from "@/components/buttons/submit-button";

interface UpdatePersonProps {
    person: Person
}
const UpdatePerson = ({person}:UpdatePersonProps) => {
    const initialValues = person
    const router = useRouter()
    const formatter = useFormatter()
    const t = useTranslations()
    const [updatePerson] = useUpdatePersonMutation()
    const formik= useFormik({
        initialValues: initialValues,
        onSubmit: async (person) => {
            await toast.promise(updatePerson(person).unwrap(), {
                loading: 'Loading',
                success: 'Success',
                error: 'Error'
            })
        }
    })
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

                        <Grid md={12} xs={12}>
                            <ButtonGroup variant='contained'>
                                <SubmitButton color='success'>
                                    {t('Save')}
                                </SubmitButton>
                            </ButtonGroup>
                        </Grid>

                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
};

export default UpdatePerson;