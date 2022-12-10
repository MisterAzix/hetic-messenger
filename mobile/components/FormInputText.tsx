import React, { useState } from "react";
import { IconButton, TextInput } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useController } from "react-hook-form";

interface IFormInputText {
  name: string;
  control: any;
  isPassword?: boolean;
  style?: any;
  label: string;
  required?: boolean;
}

export const FormInputText = ({
  isPassword = false,
  style,
  name,
  control,
  label,
  required,
}: IFormInputText) => {
  const { field, fieldState } = useController({
    control,
    name,
  });
  const [showPassword, setShowPassword] = useState<boolean>(true);

  const handleTouchStart = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextInput
      style={style}
      secureTextEntry={isPassword && showPassword}
      helperText={fieldState.error && fieldState.error.message}
      onChangeText={field.onChange}
      value={field.value}
      label={label}
      variant="outlined"
      trailing={(props) =>
        isPassword && (
          <IconButton
            icon={(props) => (
              <Icon
                onTouchStart={handleTouchStart}
                name={showPassword ? "eye" : "eye-off"}
                {...props}
              />
            )}
            {...props}
          />
        )
      }
    />
  );
};
