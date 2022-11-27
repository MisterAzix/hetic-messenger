import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../store';

export interface INeedAuthProps {
  children: JSX.Element;
}

export function NeedAuth({ children }: INeedAuthProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const { auth } = useSelector((state: AppState) => ({
    auth: state.auth,
  }));

  useEffect(() => {
    if (!auth) {
      navigate('/login', { state: { from: location } });
    }
  }, []);

  if (auth) {
    return children;
  }

  return null;
}
