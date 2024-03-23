import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_home/focus/')({
  component: Focus,
});

function Focus() {
  return (
    <div>
      <h1>Focus</h1>
    </div>
  );
}
