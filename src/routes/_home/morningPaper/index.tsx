import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_home/morningPaper/')({
  component: MorningPaper,
});

function MorningPaper() {
  return (
    <div>
      <h1>MorningPaper</h1>
    </div>
  );
}
