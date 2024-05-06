import { InputFormController, SocialButtons } from '@/components';
import { zodResolver } from '@hookform/resolvers/zod';
import { UseMutationResult } from '@tanstack/react-query';
import { Link, RoutePaths } from '@tanstack/react-router';
import { Button } from 'antd';
import { FC } from 'react';
import { FieldErrors, Resolver, useForm } from 'react-hook-form';
import { z, ZodObject } from 'zod';
import { routeTree } from '@/routeTree.gen';

interface Props {
  renderForm: { name: keyof FieldErrors; isPassword?: boolean; placeHolder: string }[];
  socialButtons?: boolean;
  socialButtonsLabel?: string;
  submitBtnLabel: string;
  returnLink?: RoutePaths<typeof routeTree>;
  returnLinkLabel?: string;
  footerLink: RoutePaths<typeof routeTree>;
  footerLinkLabel: string;
  schema: ZodObject<any>;
  useAuthMutation: UseMutationResult<void, Error, any, unknown>;
  params?: any;
}

const AuthForm: FC<Props> = ({
  renderForm,
  socialButtons,
  submitBtnLabel,
  returnLink,
  returnLinkLabel,
  footerLink,
  footerLinkLabel,
  socialButtonsLabel,
  schema,
  useAuthMutation,
  params,
}) => {
  type FormData = z.infer<typeof schema>;
  const resolver: Resolver<FormData> = zodResolver(schema);
  const { mutateAsync, isPending } = useAuthMutation;
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({ resolver });
  const onSubmit = async (data: FormData) => {
    await mutateAsync(data);
  };

  return (
    <div>
      <form className="max-w-96 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {renderForm.map((f) => {
          return (
            <InputFormController
              key={f.name}
              control={control}
              name={f.name}
              placeholder={f.placeHolder}
              error={{ isError: !!errors[f.name], message: errors[f.name]?.message as string }}
              isPassword={f.isPassword}
            />
          );
        })}
        <Button block size="large" loading={isPending} htmlType="submit" type="primary">
          {submitBtnLabel}
        </Button>
        {returnLink && (
          <Link to={returnLink} params={params}>
            <Button type="link">{returnLinkLabel}</Button>
          </Link>
        )}
      </form>
      {socialButtons && (
        <div className="my-4 space-y-8">
          <div className="relative text-center">
            <span className="relative z-10 bg-white px-2">{socialButtonsLabel}</span>
            <hr className="absolute left-0 top-1/2 z-0 w-full" />
          </div>
          <SocialButtons />
        </div>
      )}
      <div className="text-center text-sm">
        <Link to={footerLink} params={params} className="text-primary">
          {footerLinkLabel}
        </Link>
      </div>
    </div>
  );
};

export default AuthForm;
