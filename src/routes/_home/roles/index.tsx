import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_home/roles/')({
  component: Role,
});

function Role() {
  return <></>;
}
