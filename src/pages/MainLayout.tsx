import React from 'react';
import { NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

const items1: MenuProps['items'] = ['Main'].map((key) => ({
    key,
    label: key,
}));

const items2: MenuProps['items'] = [UserOutlined, NotificationOutlined].map((icon, index) => {
    const key = String(index + 1);

    return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `Mgmt ${key}`,

        children: new Array(2).fill(null).map((_, j) => {
            const subKey = index * 2 + j + 1;
            return {
                key: subKey,
                label: `User${subKey}`,
            };
        }),
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
                    defaultSelectedKeys={['2']}
                    items={items1}
                    style={{ flex: 1, minWidth: 0 }}
                    onClick={() => {
                        navigate('/');
                    }}
                />
            </Header>
            <Layout>
                <Sider width={200} style={{ background: colorBgContainer }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                        items={items2}
                        onClick={() => {
                            navigate('/user');
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
