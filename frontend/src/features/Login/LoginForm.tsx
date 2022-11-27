import { useForm } from 'react-hook-form';
import { useGetJWT } from './hooks';
import { useState } from 'react';
import { Alert, Box, FormGroup } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormInputText } from '../../components/FormInputText';
import { useDispatch } from 'react-redux';
import { addAuth, AppDispatch } from '../../store';
import { useLocation, useNavigate } from 'react-router-dom';

interface IFormInput {
  username: string;
  password: string;
}

const defaultValues: IFormInput = {
  username: '',
  password: '',
};

export function LoginForm() {
  const { control, handleSubmit } = useForm<IFormInput>({ defaultValues });
  const dispatch: AppDispatch = useDispatch();
  const getJWT = useGetJWT();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = (formData: IFormInput) => {
    setIsLoading(true);
    setError('');
    getJWT(formData).then((data) => {
      setIsLoading(false);
      if (data.success && data.JWT) {
        dispatch(addAuth({ jwt: data.JWT }));
        navigate(from, { replace: true });
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
