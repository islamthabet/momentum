import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_home/calender/')({
  component: Calender,
});

function Calender() {
  return (
    <div>
      <h1>Calender</h1>
    </div>
  );
}
