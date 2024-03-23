import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_home/habit/')({
  component: Habit,
});

function Habit() {
  return (
    <div>
      <h1>Habit</h1>
    </div>
  );
}
