import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_home/users/')({
  component: User,
});

function User() {
  return <></>;
}
