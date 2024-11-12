import { Button, Form, Input, Select, Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Confirm from '../../components/Confirm';
import useCodeStore from '../common/store/useCodeStore';
import useUserStore from './store/useUserStore';

const UserForm = () => {
  const { seq } = useParams<string>();
  const [form] = Form.useForm();
  const { user, getUser, setUser, saveUser, resetUser } = useUserStore();
  const { codes, getCodes } = useCodeStore();
  const navigate = useNavigate();

  // 코드 조회
  useEffect(() => {
    const codeIds = ['category', 'sub_category'];
    getCodes(codeIds);
  }, [getCodes]);

  useEffect(() => {
    if (seq) {
      getUser(Number(seq));
    }
  }, [getUser, seq]);

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    }

    return () => {
      form.resetFields();
    };
  }, [user, form, resetUser]);

  return (
    <div>
      <h1>User Detail</h1>
      <Form
        form={form}
        name="user"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        disabled={false}
        style={{ maxWidth: 600 }}
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
        <Input type="hidden" name="seq" />
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: '${label} is required' }]}
        >
          <Select>
            {codes?.get('category')?.map((code) => (
              <Select.Option key={code.key} value={code.codeId}>
                {code.codeName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Sub Category"
          name="subCategory"
          rules={[{ required: true, message: '${label} is required' }]}
        >
          <Select>
            {codes?.get('sub_category')?.map((code) => (
              <Select.Option key={code.key} value={code.codeId}>
                {code.codeName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: '${label} is required' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Content"
          name="content"
          rules={[{ required: true, message: '${label} is required' }]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Space>
            <Button
              htmlType="button"
              onClick={() => {
                resetUser();
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
