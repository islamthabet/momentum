import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/signup')({
  component: SignUp,
});

function SignUp() {
  return <div>SignUp</div>;
}
