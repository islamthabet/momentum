import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_home/goal/')({
  component: Goal,
});

function Goal() {
  return <div>There is no Goal Selected</div>;
}
