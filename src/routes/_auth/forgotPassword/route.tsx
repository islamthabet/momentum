import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import AuthForm from '../-components/AuthForm';
import { useForgotPasswordMutation } from '../-components/authQueryConfig';
import { FieldErrors } from 'react-hook-form';

export const Route = createFileRoute('/_auth/forgotPassword')({
  component: ForgotPassword,
});

const schema = z.object({
  email: z.string().email(),
});

const renderForm: { name: keyof FieldErrors; isPassword?: boolean; placeHolder: string }[] = [
  { name: 'email', placeHolder: 'Email' },
];

type ForgotPasswordType = z.infer<typeof schema>;

function ForgotPassword() {
  return (
    <AuthForm
      schema={schema}
      useAuthMutation={useForgotPasswordMutation<ForgotPasswordType>()}
      submitBtnLabel="Forgot Password"
      footerLink={'/login'}
      footerLinkLabel="Back To Login"
      renderForm={renderForm}
    />
  );
}
