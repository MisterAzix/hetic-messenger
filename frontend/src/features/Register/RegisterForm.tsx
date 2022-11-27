import { useForm } from 'react-hook-form';
import { Box, FormGroup, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormInputText } from '../../components/FormInputText';
import { useState } from 'react';
import { useRegister } from './hooks';
import { useNavigate } from 'react-router-dom';

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
  const { control, handleSubmit } = useForm<IFormInput>({ defaultValues });
  const register = useRegister();
  const navigate = useNavigate();

  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = (formData: IFormInput) => {
    setIsLoading(true);
    setError('');
    register(formData).then((data) => {
      setIsLoading(false);
      if (data.user) {
        navigate('/login');
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
        '& .MuiTextField-root': { my: 2, width: '100%' },
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
          Register
        </LoadingButton>
      </FormGroup>
    </Box>
  );
};
