import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_home/diary/')({
  component: Diary,
});

function Diary() {
  return (
    <div>
      <h1>Diary</h1>
    </div>
  );
}
