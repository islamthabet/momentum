import PageTitle from '@/components/layout/PageTitle';
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router';
import Loader from '@/components/Loader';
import type { User } from './goal/-components/interface/Goal.interface';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/config/axiosInstance';
import { Switch, Table, TableColumnsType } from 'antd';
import { FiEdit, FiTrash } from 'react-icons/fi';

export const Route = createFileRoute('/_home/user')({
  component: Users,
  pendingComponent: () => <Loader />,
});

function Users() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      return (await axiosInstance.get('/users')).data as User[];
    },
  });
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (r: User) => {
      await axiosInstance.patch(`users/${r.id}`, { isActive: !r.isActive });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const columns: TableColumnsType<User> = [
    {
      title: 'Full name',
      dataIndex: '',
      render: (user: User) => <div>{user.firstname + ' ' + user.lastname}</div>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      render: (email: string) => <div>{email}</div>,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      render: (username: string) => <div>{username}</div>,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      render: (role: Record<string, string>) => <div>{role.name}</div>,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      render: (gender: string) => <div>{gender}</div>,
    },
    {
      title: 'Active',
      dataIndex: 'isActive',
      render: (isActive: boolean, r) => {
        return (
          <div>
            <Switch
              checked={isActive}
              loading={isPending}
              onChange={async () => {
                await mutateAsync(r);
              }}
            />
          </div>
        );
      },
    },
    {
      align: 'end',
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div className="space-x-2 ">
          <button
            key="edit-user"
            title="edit-user"
            onClick={() => navigate({ to: '/user/edit/$id', params: { id: record.id!.toString() as string } })}
            className="btn btn-circle btn-outline btn-info btn-sm"
          >
            <FiEdit />
          </button>
          <button
            key="delete-user"
            title="delete-user"
            onClick={() => navigate({ to: '/user/delete/$id', params: { id: record.id!.toString() as string } })}
            className="btn btn-circle btn-outline btn-error btn-sm hover:!text-white"
          >
            <FiTrash />
          </button>
        </div>
      ),
    },
  ];

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="h-full flex-grow">
      <div className="flex h-screen flex-col py-4">
        <div className=" flex items-center justify-between">
          <PageTitle title="Users" />
          <div className="mt-4 flex items-center justify-end">
            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={() => navigate({ to: '/user/add' })}
                className="btn btn-neutral btn-sm px-6 text-sm font-normal"
              >
                + Add Role
              </button>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="w-full py-8 pt-4">
            <Table dataSource={data} columns={columns} rowKey={'id'} />
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
