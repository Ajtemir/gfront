import React, {JSX, useEffect} from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const options:Option[] = [
    {id:'1',value:'Oliver Hansen'},
    {id:'2',value:'Van Henry'},
    {id:'3',value:'April Tucker'},
    {id:'4',value:'Ralph Hubbard'},
    {id:'5',value:'Omar Alexander'},
    {id:'6',value:'Carlos Abbott'},
    {id:'7',value:'Miriam Wagner'},
    {id:'8',value:'Bradley Wilkerson'},
    {id:'9',value:'Virginia Andrews'},
    {id:'10',value:'Kelly Snyder'},
];

function getStyles(option: Option, options: Option[], theme: Theme) {
    return {
        fontWeight:
            options.indexOf(option) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}
interface MultipleSelectProps {
    options: Option[],
    selectedOptions: Option[],
}

interface Option {
    id:string
    value: string
}
export default function MultipleSelect({options, selectedOptions} : MultipleSelectProps): JSX.Element {
    const theme = useTheme();
    const [chosenOptions, setChosenOptions] = React.useState<Option[]>(selectedOptions);

    const handleChange = (event: SelectChangeEvent<Option>) => {
        const {
            target: { value },
        } = event;
        setChosenOptions(
            [...chosenOptions, value as Option]
        );
        console.log(value as Option)
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-name-label">Name</InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={selectedOptions}
                    onChange={handleChange}
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                >
                    {options.map((option) => (
                        <MenuItem
                            key={option.id}
                            value={option.value}
                            style={getStyles(option, chosenOptions, theme)}
                        >
                            {option.value}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

// interface MultiSelectProps {
//     initialValues: string[],
//     allValuesAndLabels: {
//         value: string
//         label: string
//     }[]
// }

// const MultiSelect = ({initialValues, allValuesAndLabels} : MultiSelectProps) => {
//     return (
//         <div>
//
//         </div>
//     );
// };
//
// export default MultiSelect;