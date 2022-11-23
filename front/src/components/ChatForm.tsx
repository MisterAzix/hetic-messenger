'use client';

import { useForm } from 'react-hook-form';
import { Box, FormGroup } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormInputText } from './FormInputText';
import { useState } from 'react';
import useSendMessage from '../hooks/useSendMessage';

interface IFormInput {
  message: string;
}

const defaultValues: IFormInput = {
  message: '',
};

export const ChatForm = ({ id }: { id: number }) => {
  const sendMessage = useSendMessage();
  const methods = useForm<IFormInput>({ defaultValues });
  const { handleSubmit, control } = methods;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = (data: IFormInput) => {
    setIsLoading(true);
    sendMessage(id, data.message).then((data) => {
      setIsLoading(false);
      if (data) {
        //console.log(data);
      }
    });
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { my: 1 },
      }}
    >
      <FormInputText name="message" control={control} label="Message" />

      <FormGroup>
        <LoadingButton
          loading={isLoading}
          type={'submit'}
          onClick={handleSubmit(onSubmit)}
          variant={'contained'}
        >
          Send
        </LoadingButton>
      </FormGroup>
    </Box>
  );
};
