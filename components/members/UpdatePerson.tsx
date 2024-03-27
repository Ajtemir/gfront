import React from 'react';
import {Box, ButtonGroup, Card, CardContent} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import GridFormikTextField from "@/components/GridFormikTextField";
import {nameof} from "@/utils/nameof";
import {Person} from "@/types/person";
import GridFormikDatePicker from "@/components/GridFormikDatePicker";
import {GridGenderSelectFormikField} from "@/components/GridSelectFormikField";
import {ImageUploader} from "@/components/image-uploader";
import {megabytesToBytes} from "@/utils/megabytes-to-bytes";
import {SubmitButton} from "@/components/buttons/submit-button";
import {useFormik} from "formik";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import {useFormatter, useTranslations} from "next-intl/dist/src/react-server";
import {useCreatePersonMutation, useLazyGetPersonDataByPinQuery} from "@/backend-api/member-api";

const UpdatePerson = () => {
    const initialValues = {
        pin:''
    } as Person
    const router = useRouter()
    const formatter = useFormatter()
    const t = useTranslations()
    const formik= useFormik({
        initialValues: initialValues,
        onSubmit: async (person) => {
            const createPersonCall = async () => {
                const createdPerson = await createPerson(person).unwrap()
                router.push(`members/${createdPerson.id}`)
            }
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



        </Box>
    );
};

export default UpdatePerson;