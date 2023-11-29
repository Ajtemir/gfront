import {
  FieldHelperProps,
  FieldInputProps,
  FieldMetaProps,
  FormikErrors,
  FormikState,
  FormikTouched,
  FormikValues
} from "formik";
import React from "react";
import { Formats, TranslationValues } from "next-intl";


export interface YupError {
  // Example: yup.string.max
  key: string;
  options: {
    name: string;
    label?: string;
    path: string;
    value: any;
    originalValue: any;
  }
}

export type TranslateFunction = (message: string, values?: TranslationValues, formats?: Partial<Formats>) => string;

export function translateYupError(error: YupError | string, t: TranslateFunction): string {
  // The schema is defined without custom `setLocale`
  /** @type {import('@/libs/set-localized-locale')} */
  if (!error) {
    return 'Not translated yet'
  }
  if (typeof error === 'string') {
    return error
  }

  const key = error.key;

  // Not translated label
  if (error.options.label === error.options.path) {
    try {
      // @ts-ignore
      error.options.label = t(error.options.path)
    }
    catch (err) {
      console.error(err)
    }
  }

  try {
    // @ts-ignore
    const errorTranslated = t(key, error.options)
    return errorTranslated
  } catch (err) {
    return 'Not translated yet'
  }
}


export interface FormikInterface<Values extends FormikValues> {
  initialValues: Values;
  initialErrors: FormikErrors<unknown>;
  initialTouched: FormikTouched<unknown>;
  initialStatus: any;
  handleBlur: {
    (e: React.FocusEvent<any>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
  };
  handleReset: (e: any) => void;
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  resetForm: (nextState?: Partial<FormikState<Values>> | undefined) => void;
  setErrors: (errors: FormikErrors<Values>) => void;
  setFormikState: (stateOrCb: FormikState<Values> | ((state: FormikState<Values>) => FormikState<Values>)) => void;
  setFieldTouched: (field: string, touched?: boolean, shouldValidate?: boolean | undefined) => Promise<FormikErrors<Values>> | Promise<void>;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<FormikErrors<Values>> | Promise<void>;
  setFieldError: (field: string, value: string | undefined) => void;
  setStatus: (status: any) => void;
  setSubmitting: (isSubmitting: boolean) => void;
  setTouched: (touched: FormikTouched<Values>, shouldValidate?: boolean | undefined) => Promise<FormikErrors<Values>> | Promise<void>;
  setValues: (values: React.SetStateAction<Values>, shouldValidate?: boolean | undefined) => Promise<FormikErrors<Values>> | Promise<void>;
  submitForm: () => Promise<any>;
  validateForm: (values?: Values) => Promise<FormikErrors<Values>>;
  validateField: (name: string) => Promise<void> | Promise<string | undefined>;
  isValid: boolean;
  dirty: boolean;
  unregisterField: (name: string) => void;
  registerField: (name: string, {validate}: any) => void;
  getFieldProps: (nameOrOptions: any) => FieldInputProps<any>;
  getFieldMeta: (name: string) => FieldMetaProps<any>;
  getFieldHelpers: (name: string) => FieldHelperProps<any>;
  validateOnBlur: boolean;
  validateOnChange: boolean;
  validateOnMount: boolean;
  values: Values;
  errors: FormikErrors<Values>;
  touched: FormikTouched<Values>;
  isSubmitting: boolean;
  isValidating: boolean;
  status?: any;
  submitCount: number;
}
