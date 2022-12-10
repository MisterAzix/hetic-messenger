import React from 'react';
import { TextInput } from '@react-native-material/core';
import { useController} from 'react-hook-form'

interface IFormInputText {
  name: string;
  control: any;
  isPassword?: boolean;
  style?: any;
  label: string;
  required?: boolean;
}

export const FormInputText = ({isPassword = false,  style,name, control, label, required }: IFormInputText) => {
  const {field, fieldState} = useController({
    control,
    defaultValue: '',
    name
  })
  return (
        <TextInput
          style={style}
          secureTextEntry={isPassword}
          helperText={fieldState.error && fieldState.error.message}
          onChangeText={field.onChange}
          value={field.value}
          label={label}
          variant="outlined"
        />
  );
};
