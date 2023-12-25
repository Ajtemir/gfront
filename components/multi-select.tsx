import React from "react";
import {TextField, Autocomplete, MenuItem} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import {FormikInterface, translateYupError} from "@/components/formik-interface";
import {useTranslations} from "next-intl";
import {FormikValues} from "formik";

export default function MultiSelect<T extends FormikValues>({values, name, formik,options}: MultiSelectProps<T>): React.JSX.Element {
    const {errors, touched, setFieldValue, initialValues} = formik
    const t = useTranslations()
    // @ts-ignore
    return (
        <Autocomplete
            // @ts-ignore
            name={name}
            multiple
            options={values ?? options}
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
                    label="Multiple Autocomplete"
                    placeholder="Multiple Autocomplete"
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
                    // selected={true}
                    key={option.id}
                    value={option.value}
                    sx={{justifyContent: "space-between"}}
                    onChange={() => {
                        // setOptions(options.map(x=>x.id===option.id ? {...x, selected: !x.selected} : x))
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
    values?: MultiselectOption[] | null;
    options: MultiselectOption[];
    name: string;
    formik: FormikInterface<T>;
}