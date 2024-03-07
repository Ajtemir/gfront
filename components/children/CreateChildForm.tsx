import React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import {FormikTextField} from "@/components/formik-text-field";
import {nameof} from "@/utils/nameof";
import {CreateMother, UpdateMotherImage} from "@/types/mother";
import {useFormik} from "formik";
import {Box, ButtonGroup, Card, CardContent} from "@mui/material";
import {handlePinChange} from "@/utils/handle-pin-change";
import FormikDatePicker from "@/components/formik-date-picker";
import {Child} from "@/types/child";
import toast from "react-hot-toast";
import {formatYupError} from "@/utils/format-yup-error";
import GridFormikTextField from "@/components/GridFormikTextField";
import {CreateCitizen} from "@/types/citizen";
import GridFormikDatePicker from "@/components/GridFormikDatePicker";
import GridSelectFormikField, {GridGenderSelectFormikField, OptionItem} from "@/components/GridSelectFormikField";
import {Genders} from "@/types/gender";
import {SubmitButton} from "@/components/buttons/submit-button";
import {EnvironmentGuard} from "@/components/environment-guard";
import {LightBulbButton} from "@/components/buttons/light-bulb-button";
import {TrashButton} from "@/components/buttons/trash-button";
import {useTranslations} from "next-intl";
import {useAddChildToMotherMutation} from "@/backend-api/children-api";
import GridBooleanFormikField from "@/components/GridBooleanFormikField";
import {useRouter} from "next/navigation";

interface CreateChildFormProps {
    motherId: number
}

const initialValues = {} as Child

const CreateChildForm = ({motherId}:CreateChildFormProps) => {
    const router = useRouter()
    const [addChild, {data, error, isLoading}] = useAddChildToMotherMutation()
    initialValues.motherId = motherId
    const formik= useFormik({
        initialValues: initialValues,
        onSubmit: async (values) => {
            values.motherId = motherId
            const response = await addChild(values).unwrap()
            router.push(`/children/${response}/edit`)
        }
    })
    const t = useTranslations()

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

                    <GridBooleanFormikField
                        name={nameof<Child>('isAdopted')}
                        label='Is Adopted'
                        formik={formik}
                        required
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

export default CreateChildForm;