import Overlay from '@/components/ui/Overlay';
import axiosInstance from '@/config/axiosInstance';
import { routesEnum } from '@/enum/routes.enum';
import { useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useBlocker } from '@tanstack/react-router';
import { Button, Input } from 'antd';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

export const Route = createFileRoute('/_home/users/add')({
  component: AddUser,
});

function AddUser() {
  const ref = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const [name, setName] = useState('');
  const [isSubmit, setIsSubmit] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  useBlocker(() => window.confirm('the changes will be discard are you sure?'), name !== '' && isSubmit);
  return (
    <Overlay isOpen={isOpen} to={`/${routesEnum.users}`} childRef={ref}>
      <div ref={ref}>
        <form
          className="rounded-lg bg-white p-4 shadow-lg"
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              toast.promise(axiosInstance.post(routesEnum.users, { name }), {
                pending: 'updating the user',
                success: 'role updated successfully',
                error: 'something went wrong',
              });
              setIsSubmit(true);
              setIsOpen(false);
              queryClient.invalidateQueries({ queryKey: [routesEnum.users] });
            } catch (e) {
              console.log(e);
            }
          }}
        >
          <h4>Add User</h4>
          <Input autoFocus type="text" value={name} onChange={(e) => setName(e.target.value)}></Input>
          <div className="mt-2 flex w-full gap-2">
            <Button htmlType="submit" block type="default">
              Submit
            </Button>
            <Button block type="text" htmlType="button" danger onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Overlay>
  );
}
