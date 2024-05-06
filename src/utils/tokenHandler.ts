import { redirect } from '@tanstack/react-router';
import { toast } from 'react-toastify';

export const addAuthToLocalStorage = (token: string, expireIn: number) => {
  localStorage.setItem('expireIn', expireIn + '');
  localStorage.setItem('token', token);
};

export const handleUnValidToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expireIn');
  toast.error('please login', {
    toastId: 'un auth',
  });
  throw redirect({ to: '/login' });
};
