import React from 'react';
import FormikDatePicker, {FormikDatePickerProps} from "@/components/formik-date-picker";
import {nameof} from "@/utils/nameof";
import {CreateCitizen} from "@/types/citizen";
import Grid from "@mui/material/Unstable_Grid2";

const GridFormikDatePicker = (props:FormikDatePickerProps) => {
    return (
        <Grid md={6} xs={12}>
            <FormikDatePicker {...props}/>
        </Grid>
    );
};

export default GridFormikDatePicker;