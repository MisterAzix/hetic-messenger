'use client';

import { useForm } from 'react-hook-form';
import { Box, FormGroup, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormInputText } from './FormInputText';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useRegister from "../hooks/useRegister";

interface IFormInput {
  username: string;
  password: string;
  confirm_password: string;
}

const defaultValues: IFormInput = {
  username: '',
  password: '',
  confirm_password: '',
};

export const RegisterForm = () => {
  const router = useRouter();
  const register = useRegister();
  const methods = useForm<IFormInput>({ defaultValues });
  const { handleSubmit, control } = methods;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const onSubmit = (data: IFormInput) => {
    setIsLoading(true);
    setError('');
    register(data.username, data.password, data.confirm_password).then((data) => {
      setIsLoading(false);
      if (data.user) {
        router.push('/login');
      } else if (data.message === 'Password and confirm password must be same!') {
        setError('Password and confirm password must be same!');
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
        <FormInputText
          type={'password'}
          name="confirm_password"
          control={control}
          label="Confirm password"
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
