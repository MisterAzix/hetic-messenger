import React, { HTMLInputTypeAttribute } from 'react';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

interface IFormInputText {
  name: string;
  control: any;
  label: string;
  type?: HTMLInputTypeAttribute;
  required?: boolean;
}

export const FormInputText = ({ name, control, label, type, required }: IFormInputText) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          type={type}
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant="outlined"
          required={required}
        />
      )}
    />
  );
};
