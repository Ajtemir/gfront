import React from "react";
import { BaseTextFieldProps, InputBaseProps, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import { FormikInterface, translateYupError } from "@/components/formik-interface";


export interface FormikTextFieldProps extends BaseTextFieldProps {
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
}



export const FormikTextField = ({
  name,
  label,
  formik,
  fullWidth = true,
  onChange,
  labelRequired = false,
  showClearIcon = false,
  children,
  ...other
}: FormikTextFieldProps) => {
  
  const t = useTranslations()
  const {values, errors, touched} = formik;

  return (
    <TextField
      {...other}
      name={name}
      // @ts-ignore
      label={t(label)}
      value={values[name] ?? ''}
      error={touched[name] && Boolean(errors[name])}
      // @ts-ignore
      helperText={touched[name] && errors[name] && (<>{translateYupError(errors[name], t)}</>)}
      onChange={onChange ?? formik.handleChange}
      fullWidth={fullWidth}
      InputLabelProps={{required: labelRequired}}
    >
      {children}
    </TextField>
  )
}
