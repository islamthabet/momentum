import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_home/task/')({
  component: Task,
});

function Task() {
  return (
    <div>
      <h1>Task</h1>
    </div>
  );
}
