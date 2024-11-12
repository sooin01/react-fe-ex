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
  const { user, getUser, setUser, saveUser } = useUserStore();
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
        labelCol={{ span: 4 }}
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
        <Input type="hidden" name="seq" />
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true }]}
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
          rules={[{ required: true }]}
        >
          <Select>
            {codes?.get('sub_category')?.map((code) => (
              <Select.Option key={code.key} value={code.codeId}>
                {code.codeName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Content" name="content" rules={[{ required: true }]}>
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
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
