import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_home/profile/')({
  component: Profile,
});

function Profile() {
  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
}
