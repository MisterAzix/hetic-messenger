'use client';

import { useForm } from 'react-hook-form';
import { Box, FormGroup, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormInputText } from './FormInputText';
import useGetJWT from '../hooks/useGetJWT';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface IFormInput {
  username: string;
  password: string;
}

const defaultValues: IFormInput = {
  username: '',
  password: '',
};

export const LoginForm = () => {
  const router = useRouter();
  const getJWT = useGetJWT();
  const methods = useForm<IFormInput>({ defaultValues });
  const { handleSubmit, control } = methods;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const onSubmit = (data: IFormInput) => {
    setIsLoading(true);
    setError('');
    getJWT(data.username, data.password).then((data) => {
      setIsLoading(false);
      if (data.JWT) {
        console.log(data);
        //router.push('/');
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
};
