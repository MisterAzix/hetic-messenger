import { useForm } from "react-hook-form";
import { FormInputText } from "../../components/FormInputText";
import { useRegister } from "./hooks";
import { useState } from "react";
import { Button, Stack, Text } from "@react-native-material/core";

interface IFormInput {
  username: string;
  password: string;
  confirm_password: string;
}

const defaultValues: IFormInput = {
  username: "",
  password: "",
  confirm_password: "",
};

export const RegisterForm = ({ navigation }: { navigation: any }) => {
  const { control, handleSubmit } = useForm<IFormInput>({ defaultValues });
  const register = useRegister();

  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = (formData: IFormInput) => {
    setIsLoading(true);
    setError("");
    register(formData).then((data) => {
      setIsLoading(false);
      if (data.user) {
        navigation.navigate("Login");
      } else if (
        data.message === "Password and confirm password must be same!"
      ) {
        setError("Password and confirm password must be same!");
      } else {
        setError("An error as occurred!");
      }
    });
  };

  return (
    <Stack spacing={10}>
      <FormInputText
        name="username"
        control={control}
        label={"Username"}
        required
      />
      <FormInputText
        isPassword
        name="password"
        control={control}
        label={"Password"}
        required
      />
      <FormInputText
        isPassword
        name="confirm_password"
        control={control}
        label={"Confirm password"}
        required
      />
      {error && (
        <Text color={"error"} variant="subtitle2">
          {error}
        </Text>
      )}
      <Button
        title={"Register"}
        color="primary"
        loading={isLoading}
        loadingIndicatorPosition="overlay"
        onTouchStart={handleSubmit(onSubmit)}
      />
      <Button
        title={"I have an account!"}
        color="primary"
        variant={"text"}
        onTouchStart={() => navigation.navigate("Login")}
      />
    </Stack>
  );
};
