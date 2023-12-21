import React, {ChangeEvent, useState} from "react";
import { TextField, Autocomplete, MenuItem } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import {nameof} from "@/utils/nameof";
import {CreateOffice} from "@/types/office";
import {FormikInterface, translateYupError} from "@/components/formik-interface";
import {useTranslations} from "next-intl";

export default function MultiSelect({values, name, onChange, formik}:MultiSelectProps): React.JSX.Element {
    const [options, setOptions] = useState<MultiselectOption[]>(values)
    const {errors,touched, setFieldValue} = formik
    const t = useTranslations()
    // @ts-ignore
    return (
        <Autocomplete
            // @ts-ignore
            name={name}
            multiple
            options={options}
            getOptionLabel={(option) => option.value}
            disableCloseOnSelect
            onChange={(_, value) => {
                console.log(value)
                onChange(name, value)
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
            renderOption={(props, option, { selected }) => (
                <MenuItem
                    {...props}
                    key={option.id}
                    value={option.value}
                    sx={{ justifyContent: "space-between" }}
                    onChange={() => {
                        // setOptions(options.map(x=>x.id===option.id ? {...x, selected: !x.selected} : x))
                    }}
                >
                    {option.value}
                    {selected ? <CheckIcon color="info" /> : null}
                </MenuItem>
            )}
        />
    );
}

export interface MultiselectOption {
    id: number | string
    value: string
    selected: boolean | null
}

interface MultiSelectProps {
    values:MultiselectOption[];
    name: string;
    onChange: (propertyName: string, options:MultiselectOption[]) => void;
    formik: FormikInterface<any>;
}