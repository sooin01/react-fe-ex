import { Table, TableProps } from 'antd';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLoadingStore } from '../../utils/ApiUtil';
import User from './model/User';
import useUserStore from './store/useUserStore';

const UserList = () => {
  const { users, getUsers, clearUsers } = useUserStore();
  const { loading } = useLoadingStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  // columns
  const columns: TableProps<User>['columns'] = [
    {
      dataIndex: 'key',
      hidden: true,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      render: (text: string, record: User, index: number) => {
        return <Link to={`/user/${record.seq}`}>{text}</Link>;
      },
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Sub category',
      dataIndex: 'subCategory',
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
        <button
          onClick={() => {
            getUsers();
          }}
        >
          조회
        </button>
        <button
          onClick={() => {
            clearUsers();
          }}
        >
          초기화
        </button>
      </div>
      {loading && <div>Loading...</div>}
      {!loading && <Table<User> columns={columns} dataSource={users} />}
    </div>
  );
};

export default UserList;
