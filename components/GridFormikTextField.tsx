import React from 'react';
import {FormikTextField, FormikTextFieldProps} from "@/components/formik-text-field";
import {nameof} from "@/utils/nameof";
import {Child} from "@/types/child";
import Grid from "@mui/material/Unstable_Grid2";

const GridFormikTextField = (props:FormikTextFieldProps) => {
    return (
        <Grid md={6} xs={12}>
            <FormikTextField
                {...props}
            />
        </Grid>
    );
};

export default GridFormikTextField;