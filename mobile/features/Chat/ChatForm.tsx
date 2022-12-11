import { useForm } from "react-hook-form";
import { FormInputText } from "../../components/FormInputText";
import { useSendMessage } from "./hooks";
import { useState } from "react";
import { Button, Stack, Text } from "@react-native-material/core";
import { addOneMessage, AppDispatch } from "../../store";
import { useDispatch } from "react-redux";

interface IFormInput {
  message: string;
}

const defaultValues: IFormInput = {
  message: "",
};

export const ChatForm = ({ userId }: { userId: string }) => {
  const dispatch: AppDispatch = useDispatch();
  const { control, handleSubmit, reset } = useForm<IFormInput>({
    defaultValues,
  });
  const sendMessage = useSendMessage();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = (formData: IFormInput) => {
    setIsLoading(true);
    sendMessage({ id: userId || "", message: formData.message }).then(
      (data) => {
        setIsLoading(false);
        if (data) {
          reset();
          dispatch(
            addOneMessage({
              from: data.from,
              to: data.to,
              content: data.content,
              sent_at: data.sent_at,
            })
          );
        }
      }
    );
  };

  return (
    <Stack spacing={4}>
      <FormInputText
        name="message"
        control={control}
        label={"Message"}
        required
      />
      <Button
        title={"Send"}
        color="primary"
        loading={isLoading}
        loadingIndicatorPosition="overlay"
        onTouchStart={handleSubmit(onSubmit)}
      />
    </Stack>
  );
};
