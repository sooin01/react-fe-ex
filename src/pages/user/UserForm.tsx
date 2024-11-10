import { Button, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useUserStore from './store/useUserStore';

const UserForm = () => {
  const { seq } = useParams<string>();
  const [form] = Form.useForm();
  const { user, getUser } = useUserStore();

  useEffect(() => {
    if (seq) {
      getUser(parseInt(seq));
    }
  }, [getUser, seq]);

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    }
  }, [user, form]);

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
        initialValues={{ remember: true }}
        style={{ maxWidth: 600 }}
        autoComplete="off"
        onFinish={(values) => {
          console.log('values', values);
        }}
      >
        <Input type="hidden" name="seq" value={user?.seq} />
        <Form.Item label="Input" name="title">
          <Input />
        </Form.Item>
        <Form.Item label="TextArea" name="content">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserForm;
