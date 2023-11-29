import React from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { PickerChangeHandlerContext } from "@mui/x-date-pickers/internals/hooks/usePicker/usePickerValue.types";
import { FieldChangeHandlerContext } from "@mui/x-date-pickers/internals";
import { useTranslations } from "next-intl";
import { FormikInterface, translateYupError } from "@/components/formik-interface";
import { isDate } from 'date-fns'

function formatDate(dateValue: string | Date) {
  return isDate(dateValue)
    ? dateValue
    : new Date(dateValue)
}

interface FormikDatePickerProps {
  name: string;
  label: string;
  formik: FormikInterface<any>
  fullWidth?: boolean;
  labelRequired?: boolean;
  onChange?: (value: unknown, context: PickerChangeHandlerContext<unknown>) => void;
  [key: string]: any;
}

const FormikDatePicker = ({
  name,
  label,
  formik,
  fullWidth = true,
  labelRequired = false,
  onChange,
  ...other
}: FormikDatePickerProps) => {
  const t = useTranslations()
  const {values, touched, errors} = formik;
  // @ts-ignore
  const localizedLabel = t(label)

  function handleDateChange<TValue, TError>(value: TValue, _: FieldChangeHandlerContext<TError>) {
    formik.setFieldValue(name, value)
  }


  return (
    <DatePicker
      {...other}
      value={!values[name] ? null : formatDate(values[name])}
      label={localizedLabel}
      format='dd/MM/yyyy'
      onChange={onChange ?? handleDateChange}
      slotProps={{
        textField: {
          fullWidth: fullWidth,
          name: name,
          label: localizedLabel,
          error: (touched[name] && Boolean(errors[name])),
          // @ts-ignore
          helperText: (touched[name] && errors[name] && errors[name] && (<>{translateYupError(errors[name], t)}</>)),
          InputLabelProps: {required: labelRequired}
        }
      }}
    />
  )
}

export default FormikDatePicker
