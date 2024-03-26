import React from 'react';
import {Box, ButtonGroup, Card, CardContent} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import GridFormikTextField from "@/components/GridFormikTextField";
import {nameof} from "@/utils/nameof";
import {Child} from "@/types/child";
import GridFormikDatePicker from "@/components/GridFormikDatePicker";
import {GridGenderSelectFormikField} from "@/components/GridSelectFormikField";
import {SubmitButton} from "@/components/buttons/submit-button";
import {useRouter} from "next/navigation";
import {useTranslations} from "next-intl";
import {useFormik} from "formik";

const CreateEntity = () => {
    const initialValues = {} as Child
    const router = useRouter()
    const t = useTranslations()
    const formik= useFormik({
        initialValues: initialValues,
        onSubmit: async (values) => {
        }
    })
    return (
        <Box component='form' onSubmit={formik.handleSubmit}>
            <Card>
                <CardContent>
                    <Grid container spacing={3}>

                        <GridFormikTextField
                            name={nameof<Child>('firstName')}
                            label='First name'
                            formik={formik}
                            required
                        />

                        <GridFormikTextField
                            name={nameof<Child>('lastName')}
                            label='Last name'
                            formik={formik}
                            required
                        />

                        <GridFormikTextField
                            name={nameof<Child>('patronymicName')}
                            label='Patronymic name'
                            formik={formik}
                        />

                        <GridFormikTextField
                            name={nameof<Child>('birthPlace')}
                            label='Birth place'
                            formik={formik}
                        />

                        <GridFormikTextField
                            name={nameof<Child>('pin')}
                            label='Pin'
                            formik={formik}
                        />

                        <GridFormikTextField
                            name={nameof<Child>('passportSeriesNumber')}
                            label='Passport series and number'
                            formik={formik}
                        />

                        <GridFormikTextField
                            name={nameof<Child>('registeredAddress')}
                            label='Registered address'
                            formik={formik}
                        />

                        <GridFormikDatePicker
                            name={nameof<Child>('deathDate')}
                            label='Death date'
                            formik={formik}
                        />

                        <GridGenderSelectFormikField
                            label="Gender"
                            name={nameof<Child>('gender')}
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

export default CreateEntity;