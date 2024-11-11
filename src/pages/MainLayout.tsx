import { NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

const headerMenus = ['Home', 'Setting'];

const items1: MenuProps['items'] = headerMenus.map((value, index) => ({
  key: String(index),
  label: value,
}));

const leftMenus = [
  {
    key: 'mgmt1',
    icon: UserOutlined,
    label: 'Mgmt1',
    children: [
      {
        key: 'user',
        label: 'User',
      },
    ],
  },
  {
    key: 'mgmt2',
    icon: NotificationOutlined,
    label: 'Mgmt2',
    children: [
      {
        key: 'notice',
        label: 'Notice',
      },
    ],
  },
];

const items2: MenuProps['items'] = leftMenus.map((value) => {
  return {
    key: value.key,
    icon: React.createElement(value.icon),
    label: value.label,
    children: value.children,
  };
});

const MainLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['0']}
          items={items1}
          style={{ flex: 1, minWidth: 0 }}
          onClick={({ key }) => {
            if ('0' === key) {
              navigate('/');
            }
          }}
        />
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultOpenKeys={['mgmt1']}
            defaultSelectedKeys={['mgmt1']}
            style={{ height: '100%', borderRight: 0 }}
            items={items2}
            onClick={({ key, keyPath }) => {
              navigate('/' + key);
            }}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb
            items={[
              {
                title: 'Home',
                onClick: () => {},
              },
              { title: 'List', onClick: () => {} },
            ]}
            style={{ margin: '16px 0', cursor: 'pointer' }}
          />
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
