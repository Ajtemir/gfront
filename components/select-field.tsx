import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export interface SelectArgument {
    options: Option[];
    currentValue: string | null;
    label: string;
}

export interface Option {
    value: string;
    label: string;
}
const SelectList = ({options, currentValue, label}:SelectArgument) => (

    <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={currentValue}
            label={label}
        >
            {options.map(x => <MenuItem value={x.value} key={x.value}>{x.label}</MenuItem>)}
        </Select>
    </FormControl>
)

export default SelectList;