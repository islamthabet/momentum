import axiosInstance from '@/config/axiosInstance';
import { login } from '@/config/state/features/authSlice';
import { User } from '@/routes/_home/goal/-components/interface/Goal.interface';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate } from '@tanstack/react-router';
import { addAuthToLocalStorage } from '@/utils/tokenHandler';
import { useDispatch } from 'react-redux';

interface TokenResponse {
  access_token: string;
  expireIn: number;
  user: User;
}

export const useLoginMutation = <T>() => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMutation({
    mutationKey: ['login'],
    mutationFn: async (data: T) => {
      toast.promise(
        async () => {
          try {
            const res = await axiosInstance.post<TokenResponse>('auth/login', data);
            console.log('res', res.data);
            alert(res.data.access_token + res.data.expireIn);
            localStorage.setItem('token', res.data.access_token);
            localStorage.setItem('expireIn', res.data.expireIn + '');
            // addAuthToLocalStorage(res.data.access_token, res.data.expireIn);
            dispatch(
              login({
                isLogin: true,
                user: res.data.user,
              })
            );
            navigate({ to: '/goal' });
            return res;
          } catch (err) {
            console.log(err);
            throw err;
          }
        },
        {
          pending: 'wait login ....',
          success: 'login success',
          error: 'we have error',
        }
      );
    },
  });
};

export const useSignUpMutation = <T>() => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMutation({
    mutationKey: ['signUp'],
    mutationFn: async (data: T) => {
      toast.promise(
        async () => {
          try {
            const res = await axiosInstance.post<TokenResponse>('auth/register', data);
            addAuthToLocalStorage(res.data.access_token, res.data.expireIn);
            dispatch(
              login({
                isLogin: true,
                user: res.data.user,
              })
            );
            navigate({ to: '/goal' });
            return res;
          } catch (err) {
            console.log(err);
          }
        },
        {
          pending: 'wait login ....',
          success: 'login success',
          error: 'we have error',
        }
      );
    },
  });
};

export const useForgotPasswordMutation = <T>() => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ['forgotPassword'],
    mutationFn: async (data: T) => {
      toast.promise(
        async () => {
          try {
            const res = await axiosInstance.post('auth/forgotPassword', data);
            navigate({ to: '/login' });
            return res;
          } catch (err) {
            console.log(err);
            throw err;
          }
        },
        {
          pending: 'wait ....',
          success: 'email send success',
          error: 'we have error',
        }
      );
    },
  });
};
