import PageTitle from '@/components/layout/PageTitle';
import { createFileRoute, Link, Outlet } from '@tanstack/react-router';
import Loader from '@/components/Loader';
import type { Role } from './goal/-components/interface/Goal.interface';

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/config/axiosInstance';
import { Button, Table, TableColumnsType, TablePaginationConfig } from 'antd';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { BsFillKeyFill } from 'react-icons/bs';
import { useState } from 'react';
import { routesEnum } from '@/enum/routes.enum';

export const Route = createFileRoute('/_home/roles')({
  component: Roles,
  pendingComponent: () => <Loader />,
});

function Roles() {
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    showQuickJumper: true,
    hideOnSinglePage: true,
  });
  const [sort, setSort] = useState<string>('');
  const { data, isLoading, isFetching } = useQuery({
    queryKey: [routesEnum.roles, sort],
    queryFn: async () => {
      return (await axiosInstance.get(`/${routesEnum.roles}?${sort}`)).data as Role[];
    },
  });

  const columns: TableColumnsType<Role> = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (name: string) => <div>{name}</div>,
      sorter: true,
      sortDirections: ['descend', 'ascend'],
    },
    {
      align: 'end',
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div className="space-x-2 ">
          <Link to={`/${routesEnum.roles}/edit/$id`} params={{ id: record.id!.toString() as string }}>
            <Button title="edit-roles" icon={<FiEdit />} type="default" shape="circle" />
          </Link>
          <Link to={`/${routesEnum.roles}/delete/$id`} params={{ id: record.id!.toString() as string }}>
            <Button title="delete-roles" icon={<FiTrash />} type="default" danger shape="circle" />
          </Link>
          <Link to={`/${routesEnum.roles}/$id/permissions`} params={{ id: record.id!.toString() as string }}>
            <Button title="roles-permission" icon={<BsFillKeyFill />} type="default" shape="circle" />
          </Link>
        </div>
      ),
    },
  ];

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="h-full flex-grow">
      <div className="flex h-screen flex-col py-4">
        <div className=" flex items-center justify-between">
          <PageTitle title="Roles" />
          <div className="mt-4 flex items-center justify-end">
            <div className="flex items-center justify-end">
              <Link to={`/${routesEnum.roles}/add`}>
                <Button type="default" className="px-8">
                  + Add Role
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="w-full py-8 pt-4">
            <Table
              loading={isLoading || isFetching}
              dataSource={data}
              columns={columns}
              rowKey={'id'}
              pagination={pagination}
              onChange={(p, f, s) => {
                setPagination(p);
                const so: any = { ...s };
                if (so.field && so.order) {
                  setSort(`order=${so.field}:${so.order === 'ascend' ? 'ASC' : 'DESC'}&`);
                } else {
                  setSort('');
                }
              }}
            />
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
