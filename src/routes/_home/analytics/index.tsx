import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_home/analytics/')({
  component: Analytics,
});

function Analytics() {
  return (
    <div>
      <h1>Analytics</h1>
    </div>
  );
}
