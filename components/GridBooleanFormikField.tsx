import React from 'react';
import {FormikTextFieldProps} from "@/components/formik-text-field";
import {useTranslations} from "next-intl";
import {MenuItem} from "@mui/material";
import GridFormikTextField from "@/components/GridFormikTextField";

interface BooleanFormikFieldProps extends FormikTextFieldProps {
    trueLabel?: string
    falseLabel?: string
}
const GridBooleanFormikField = ({required, trueLabel, falseLabel, ...props}:BooleanFormikFieldProps) => {
    const t = useTranslations()
    return (
        <GridFormikTextField
            {...props}
            select
        >
                {!required && <MenuItem value=''>{t('Not selected')}</MenuItem>}
                <MenuItem value={true as any}>
                    {trueLabel ?? "Yes"}
                </MenuItem>
                <MenuItem value={false as any}>
                    {falseLabel ?? "No"}
                </MenuItem>
        </GridFormikTextField>
    );
};

export default GridBooleanFormikField;