import React from "react";
import {TextField, Autocomplete, MenuItem} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import {FormikInterface, translateYupError} from "@/components/formik-interface";
import {useTranslations} from "next-intl";
import {FormikValues} from "formik";

export default function MultiSelect<T extends FormikValues>({options, name, formik, label, placeholder}: MultiSelectProps<T>): React.JSX.Element {
    const {errors, touched, setFieldValue, initialValues} = formik
    const t = useTranslations()
    console.log(options)
    // @ts-ignore
    return (
        <Autocomplete
            isOptionEqualToValue={(option, value) => {
                return option.id === value.id
            }}
            // @ts-ignore
            name={name}
            multiple
            options={options}
            getOptionLabel={(option) => option.value}
            disableCloseOnSelect
            onChange={(_, value) => {
                setFieldValue(name, value)
            }}
            renderInput={(params) => (
                    <TextField
                        {...params}
                        name={name}
                        key={name}
                        variant="outlined"
                        label={label}
                        placeholder={placeholder}
                        error={touched[name] && Boolean(errors[name])}
                        onChange={formik.handleChange}
                        // @ts-ignore
                        helperText={touched[name] && errors[name] && (<>{translateYupError(errors[name], t)}</>)}
                    />
            )}
            defaultValue={options.filter(x=>x.selected)}
            renderOption={(props, option, {selected}) => (
                <MenuItem
                    {...props}
                    key={option.id}
                    value={option.value}
                    sx={{justifyContent: "space-between"}}
                    onChange={() => {
                    }}
                >
                    {option.value}
                    {selected ? <CheckIcon color="info"/> : null}
                </MenuItem>
            )}
        />
    );
}

export interface MultiselectOption {
    id: number | string
    value: string
    selected: boolean
}

interface MultiSelectProps<T extends FormikValues> {
    options: MultiselectOption[];
    name: string;
    formik: FormikInterface<T>;
    label: string;
    placeholder: string;
}