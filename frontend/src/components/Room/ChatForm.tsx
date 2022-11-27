import { useForm } from 'react-hook-form';
import { Box, FormGroup } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormInputText } from '../FormInputText';
import { useState } from 'react';
import useSendMessage from '../../hooks/useSendMessage';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../store/store';
import { useParams } from 'react-router-dom';
import { addOneMessage } from '../../store/messageSlice';

interface IFormInput {
  message: string;
}

const defaultValues: IFormInput = {
  message: '',
};

export const ChatForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const { control, handleSubmit } = useForm<IFormInput>({ defaultValues });
  const sendMessage = useSendMessage();
  const { userId } = useParams();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = (formData: IFormInput) => {
    setIsLoading(true);
    sendMessage({ id: userId || '', message: formData.message }).then((data) => {
      setIsLoading(false);
      if (data) {
        dispatch(addOneMessage(data));
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
          Send Message
        </LoadingButton>
      </FormGroup>
    </Box>
  );
};
