import { Button, Form, Input, Select, Space } from 'antd';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Confirm from '../../components/Confirm';
import { UserRole, UserState, UserType } from './model/UserConstant';
import useUserStore from './store/useUserStore';

const UserForm = () => {
  const { userId } = useParams<string>();
  const [form] = Form.useForm();
  const { user, getUser, setUser, saveUser } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      getUser(userId);
    }
  }, [getUser, userId]);

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    }

    return () => {
      form.resetFields();
    };
  }, [user, form]);

  return (
    <div>
      <h1>User Detail</h1>
      <Form
        validateMessages={{
          // eslint-disable-next-line no-template-curly-in-string
          required: '${label} is required',
        }}
        form={form}
        name="user"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
        layout="horizontal"
        disabled={false}
        style={{ maxWidth: 800 }}
        autoComplete="off"
        onFinish={(values) => {
          Confirm({
            async onOk() {
              const _user = Object.assign({ ...user }, values);
              setUser(await saveUser(_user));
            },
          });
        }}
      >
        <Form.Item label="ID" name="userId" rules={[{ required: true }]}>
          <Input disabled={userId !== 'new'} />
        </Form.Item>
        <Form.Item label="Name" name="userName" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Type"
          name="userType"
          initialValue={UserType[UserType.USER]}
          rules={[{ required: true }]}
        >
          <Select>
            {Object.values(UserType)
              .filter((value) => typeof value === 'string')
              .map((value) => (
                <Select.Option key={value} value={value}>
                  {value}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="State"
          name="userState"
          initialValue={UserState[UserState.ACTIVE]}
          rules={[{ required: true }]}
        >
          <Select>
            {Object.values(UserState)
              .filter((value) => typeof value === 'string')
              .map((value) => (
                <Select.Option key={value} value={value}>
                  {value}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Role"
          name="userRole"
          initialValue={UserRole[UserRole.USER]}
          rules={[{ required: true }]}
        >
          <Select>
            {Object.values(UserRole)
              .filter((value) => typeof value === 'string')
              .map((value) => (
                <Select.Option key={value} value={value}>
                  {value}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Space>
            <Button
              htmlType="button"
              onClick={() => {
                navigate('/user');
              }}
            >
              List
            </Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserForm;
