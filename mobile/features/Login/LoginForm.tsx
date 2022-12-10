import { useForm } from "react-hook-form";
import { FormInputText } from "../../components/FormInputText";
import { useGetJWT } from "./hooks";
import { useState } from "react";
import { Button, Stack, Text } from "@react-native-material/core";
import { addAuth, AppDispatch } from "../../store";
import { useDispatch } from "react-redux";

interface IFormInput {
  username: string;
  password: string;
}

const defaultValues: IFormInput = {
  username: "",
  password: "",
};

export const LoginForm = ({ navigation }: { navigation: any }) => {
  const { control, handleSubmit } = useForm<IFormInput>({ defaultValues });
  const dispatch: AppDispatch = useDispatch();
  const login = useGetJWT();

  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = (formData: IFormInput) => {
    setIsLoading(true);
    setError("");
    login(formData).then((data) => {
      setIsLoading(false);
      if (data.success && data.JWT) {
        dispatch(addAuth({ jwt: data.JWT }));
        navigation.navigate("Register"); // TODO Change by Root when screen is implemented
      } else if (data.message === "Bad credentials") {
        setError("Incorrect password!");
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
      {error && (
        <Text color={"error"} variant="subtitle2">
          {error}
        </Text>
      )}
      <Button
        title={"Login"}
        color="primary"
        loading={isLoading}
        loadingIndicatorPosition="overlay"
        onTouchStart={handleSubmit(onSubmit)}
      />
      <Button
        title={"I don't have any account!"}
        color="primary"
        variant={"text"}
        onTouchStart={() => navigation.navigate("Register")}
      />
    </Stack>
  );
};
