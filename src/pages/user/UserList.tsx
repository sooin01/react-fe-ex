import { Button, Space, Table, TableProps } from 'antd';
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useCodeStore from '../common/store/useCodeStore';
import User from './model/User';
import useUserStore from './store/useUserStore';

const UserList = () => {
  const { page, getUsers, clearUsers } = useUserStore();
  const { getCode, getCodes } = useCodeStore();
  const navigate = useNavigate();
  const { state } = useLocation();

  // 코드 조회
  useEffect(() => {
    const codeIds = ['category', 'sub_category'];
    getCodes(codeIds);
  }, [getCodes, state]);

  useEffect(() => {
    getUsers({});
  }, [getUsers, state]);

  // columns
  const columns: TableProps<User>['columns'] = [
    {
      dataIndex: 'key',
      hidden: true,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      render: (text: string, record: User) => {
        return <Link to={`/user/${record.seq}`}>{text}</Link>;
      },
    },
    {
      title: 'Category',
      dataIndex: 'category',
      render(text: string) {
        return <span>{getCode('category', text)}</span>;
      },
    },
    {
      title: 'Sub category',
      dataIndex: 'subCategory',
      render(text: string) {
        return <span>{getCode('sub_category', text)}</span>;
      },
    },
    {
      title: 'Updater',
      dataIndex: 'updateBy',
    },
  ];

  return (
    <div>
      <h1>User List</h1>
      <div>
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
              navigate('/user/0');
            }}
          >
            Add
          </Button>
        </Space>
      </div>
      <Table<User>
        columns={columns}
        dataSource={page.content}
        pagination={{
          current: page?.pageable.pageNumber + 1,
          pageSize: page?.pageable.pageSize,
          total: page?.totalElements,
          onChange: (page, pageSize) => {
            getUsers({ page: page - 1, pageSize });
          },
          position: ['bottomCenter'],
        }}
      />
    </div>
  );
};

export default UserList;
