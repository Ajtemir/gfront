import React from 'react';
import {Box, ButtonGroup, Card, CardContent} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import GridFormikTextField from "@/components/GridFormikTextField";
import {nameof} from "@/utils/nameof";
import {Person} from "@/types/person";
import {SubmitButton} from "@/components/buttons/submit-button";
import {useFormik} from "formik";
import {CreateMother} from "@/types/mother";
import {useTranslations} from "next-intl";
import {useLazyGetCandidatesQuery} from "@/backend-api/candidate-api";


const SearchBar = () => {
    const t = useTranslations()
    const [getCandidates, {}] = useLazyGetCandidatesQuery()
    const formik = useFormik({
        initialValues: {} as GetCandidatesProps,
        onSubmit: (values) => {
            getCandidates(values)
        }
    })
    return (

        <Box component='form' onSubmit={formik.handleSubmit}>
            <Card>
                <CardContent>
                    <Grid container spacing={3}>

                        <GridFormikTextField
                            name={nameof<GetCandidatesProps>('fullname')}
                            label='Fullname'
                            formik={formik}
                        />

                        <GridFormikTextField
                            name={nameof<GetCandidatesProps>('pin')}
                            label='Pin'
                            formik={formik}
                        />

                    </Grid>
                    <Grid md={12} xs={12} mt={3} mb={3}>
                        <ButtonGroup variant='contained'>
                            <SubmitButton color='success'>
                                {t('Search')}
                            </SubmitButton>
                        </ButtonGroup>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
};

export default SearchBar;