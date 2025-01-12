import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Flex, Form, Input, Layout, theme } from 'antd';
import { Content, Footer } from 'antd/es/layout/layout';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useLoginStore from './store/useLoginStore';

const Login = () => {
  const { login } = useLoginStore();
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [form] = Form.useForm();

  useEffect(() => {
    form.submit();
  }, [form]);

  return (
    <Layout>
      <Content style={{ margin: '24px 16px 0' }}>
        <div
          style={{
            padding: 24,
            minHeight: 300,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Form
            form={form}
            name="login"
            initialValues={{ remember: true }}
            style={{
              maxWidth: 360,
            }}
            onFinish={async (values) => {
              await login(values.id, values.password);
              navigate('/home');
            }}
          >
            <Form.Item
              name="id"
              rules={[{ required: true, message: 'Please input your ID!' }]}
              initialValue={'user1'}
            >
              <Input prefix={<UserOutlined />} placeholder="ID" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your Password!' },
              ]}
              initialValue={'ceFGFzjqXsXXkd9'}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Flex justify="space-between" align="center">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a href="">Forgot password</a>
              </Flex>
            </Form.Item>

            <Form.Item>
              <Button block type="primary" htmlType="submit">
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}></Footer>
    </Layout>
  );
};

export default Login;
