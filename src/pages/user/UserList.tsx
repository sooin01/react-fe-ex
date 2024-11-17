import { Button, Flex, Space, Spin, Table, TableProps } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Confirm from '../../components/Confirm';
import { useLoadingStore } from '../../utils/ApiUtil';
import User from './model/User';
import useUserStore from './store/useUserStore';

const UserList = () => {
  const { page, getUsers, clearUsers, deleteUser } = useUserStore();
  const { loading } = useLoadingStore();
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    getUsers({});
  }, [getUsers, state]);

  // columns
  const columns: TableProps<User>['columns'] = [
    {
      dataIndex: 'seq',
      hidden: true,
    },
    {
      title: 'ID',
      dataIndex: 'userId',
      render: (text: string, record: User) => {
        return <Link to={`/user/${record.userId}`}>{text}</Link>;
      },
    },
    {
      title: 'Name',
      dataIndex: 'userName',
    },
    {
      title: 'Type',
      dataIndex: 'userType',
    },
    {
      title: 'Updater',
      dataIndex: 'updateBy',
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<User[]>([]);

  return (
    <div>
      <h1>User List</h1>
      <Spin spinning={loading} tip="Loading..." fullscreen={true} />
      <Flex gap="middle" vertical>
        <Space>
          <Button
            type="primary"
            htmlType="button"
            onClick={() => {
              getUsers({});
            }}
          >
            Search
          </Button>
          <Button
            type="default"
            htmlType="button"
            onClick={() => {
              clearUsers();
            }}
          >
            Reset
          </Button>
          <Button
            type="default"
            htmlType="button"
            onClick={() => {
              navigate('/user/new');
            }}
          >
            Add
          </Button>
          <Button
            type="default"
            htmlType="button"
            danger
            onClick={() => {
              if (selectedRows.length === 0) {
                return;
              }

              Confirm({
                title: 'Delete?',
                async onOk() {
                  await deleteUser(selectedRows.map((row) => row.userId));
                  setSelectedRowKeys([]);
                  setSelectedRows([]);
                  await getUsers({ page: 0, pageSize: 5 });
                },
              });
            }}
          >
            Delete
          </Button>
        </Space>
        <Table
          columns={columns}
          dataSource={page.content}
          rowSelection={{
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
              setSelectedRowKeys(selectedRowKeys);
              setSelectedRows(selectedRows);
            },
          }}
          pagination={{
            current: page?.pageable.pageNumber + 1,
            pageSize: page?.pageable.pageSize,
            total: page?.totalElements,
            onChange: (page, pageSize) => {
              getUsers({ page: page - 1, pageSize });
            },
            position: ['bottomCenter'],
            pageSizeOptions: [5, 10, 15, 20],
            showSizeChanger: false,
          }}
        />
      </Flex>
    </div>
  );
};

export default UserList;
