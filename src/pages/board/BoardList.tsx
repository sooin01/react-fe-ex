import { Button, Flex, Space, Spin, Table, TableProps } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Confirm from '../../components/Confirm';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useLoadingStore } from '../../utils/ApiUtil';
import useCodeStore from '../common/store/useCodeStore';
import Board from './model/Barod';
import { getBoards } from './slice/boardSlice';

const BoardList = () => {
  const { getCode, getCodes } = useCodeStore();
  const { page } = useAppSelector((state) => state.board);
  const { loading } = useLoadingStore();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  // 코드 조회
  useEffect(() => {
    getCodes(['category', 'sub_category']);
  }, [getCodes, state]);

  useEffect(() => {
    dispatch(getBoards({}));
  }, [dispatch, state]);

  // columns
  const columns: TableProps<Board>['columns'] = [
    {
      dataIndex: 'seq',
      hidden: true,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      render: (text: string, record: Board) => {
        return <Link to={`/board/${record.seq}`}>{text}</Link>;
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

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<Board[]>([]);

  return (
    <div>
      <Spin spinning={loading} tip="Loading..." fullscreen={true} />
      <h1>Board List</h1>
      <Flex gap="middle" vertical>
        <Space>
          <Button
            type="primary"
            htmlType="button"
            onClick={() => {
              dispatch(getBoards({}));
            }}
          >
            Search
          </Button>
          <Button
            type="default"
            htmlType="button"
            onClick={() => {
              // clearUsers();
            }}
          >
            Reset
          </Button>
          <Button
            type="default"
            htmlType="button"
            onClick={() => {
              navigate('/board/0');
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
                  // await deleteUser(selectedRows.map((row) => row.seq));
                  setSelectedRowKeys([]);
                  setSelectedRows([]);
                  // await getUsers({ page: 0, pageSize: 5 });
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
              dispatch(getBoards({ page: page - 1, pageSize }));
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

export default BoardList;
