import React from 'react';
import {FormikTextField, FormikTextFieldProps} from "@/components/formik-text-field";
import {nameof} from "@/utils/nameof";
import {CreateCitizen} from "@/types/citizen";
import {BaseTextFieldProps, InputBaseProps, MenuItem} from "@mui/material";
import {Genders} from "@/types/gender";
import Grid from "@mui/material/Unstable_Grid2";
import {FormikInterface} from "@/components/formik-interface";
import {useTranslations} from "next-intl";
import GridFormikTextField from "@/components/GridFormikTextField";
import {Child} from "@/types/child";


export interface SelectFormikFieldProps extends BaseTextFieldProps {
    name: string;
    label: string;
    formik: FormikInterface<any>

    fullWidth?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    labelRequired?: boolean;
    showClearIcon?: boolean;

    InputProps?: Partial<InputBaseProps>;

    children?: React.ReactNode;

    [key: string]: any;
    selectOptions: OptionItem[]
    defaultOption?: boolean
}

export interface OptionItem {
    value:number | string
    label: string
}

const GridSelectFormikField = (props:SelectFormikFieldProps) => {
    const {defaultOption, selectOptions, ...rest} = props;
    const t = useTranslations()
    return (
            <GridFormikTextField
                {...rest}
                select
            >
                {defaultOption && <MenuItem value=''>{t('Not selected')}</MenuItem>}
                {selectOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </GridFormikTextField>
    );
};

export const GridGenderSelectFormikField = (props:FormikTextFieldProps) => {

    return (
        <GridSelectFormikField
            {...props}
            selectOptions={[{value: 2, label:'Male'}, {value:1, label: 'Female'}]}
        />
    )
}

export default GridSelectFormikField;