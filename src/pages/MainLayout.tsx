import { NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { nanoid } from '@reduxjs/toolkit';
import type { MenuProps } from 'antd';
import { Breadcrumb, Button, Flex, Layout, Menu, theme } from 'antd';
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import apiUtil from '../utils/ApiUtil';
import useLoginStore from './login/store/useLoginStore';

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
      {
        key: 'board',
        label: 'Board',
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
  const { logout } = useLoginStore();
  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const boxStyle: React.CSSProperties = {
    width: '100%',
    height: 120,
    borderRadius: 6,
  };

  useEffect(() => {
    apiUtil.init(navigate);
  }, [navigate]);

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Flex style={boxStyle} justify={'flex-end'} align={'center'}>
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['0']}
            items={items1}
            style={{ flex: 1, minWidth: 0 }}
            onClick={({ key }) => {
              if ('0' === key) {
                navigate('/home');
              }
            }}
          />
          <Button
            type="primary"
            onClick={() => {
              logout();
              navigate('/');
            }}
          >
            Logout
          </Button>
        </Flex>
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
              navigate('/' + key, { state: nanoid() });
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
              {
                title: 'List',
                onClick: () => {},
              },
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
