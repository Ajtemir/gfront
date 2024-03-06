import React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import {FormikTextField} from "@/components/formik-text-field";
import {nameof} from "@/utils/nameof";
import {CreateMother, UpdateMotherImage} from "@/types/mother";
import {useFormik} from "formik";
import {Card, CardContent} from "@mui/material";
import {handlePinChange} from "@/utils/handle-pin-change";
import FormikDatePicker from "@/components/formik-date-picker";
import {Child} from "@/types/child";

interface CreateChildFormProps {
    motherId: number
}

const CreateChildForm = ({motherId}:CreateChildFormProps) => {

    return (
        <Card>
            <CardContent>

            </CardContent>
        </Card>
    );
};

export default CreateChildForm;