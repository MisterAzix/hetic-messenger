import { useForm } from 'react-hook-form';
import useGetJWT from '../hooks/useGetJWT';
import { useState } from 'react';
import { Alert, Box, FormGroup } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { redirect } from 'react-router-dom';
import { FormInputText } from './FormInputText';

interface IFormInput {
  username: string;
  password: string;
}

const defaultValues: IFormInput = {
  username: '',
  password: '',
};

export function LoginForm(props: IFormInput) {
  const { control, handleSubmit } = useForm();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getJWT = useGetJWT();

  const onSubmit = (userData: IFormInput) => {
    setIsLoading(true);
    setError('');
    //TODO: Typer data
    getJWT(userData).then((data) => {
      setIsLoading(false);
      if (data.JWT) {
        redirect('/room');
      } else if (data.message === 'Bad credentials') {
        setError('Incorrect password!');
      } else {
        setError('An error as occurred!');
      }
    });
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { my: 2, width: '25ch' },
      }}
    >
      <FormGroup>
        {error && <Alert severity="error">{error}</Alert>}
        <FormInputText name="username" control={control} label="Username" required />
        <FormInputText
          type={'password'}
          name="password"
          control={control}
          label="Password"
          required
        />

        <LoadingButton
          loading={isLoading}
          type={'submit'}
          onClick={handleSubmit(onSubmit)}
          variant={'contained'}
        >
          Login
        </LoadingButton>
      </FormGroup>
    </Box>
  );
}
