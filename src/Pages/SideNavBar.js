import {
  CalendarOutlined,
  MenuOutlined,
  ScheduleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Menu, Typography, Button, Row } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../Logo/heart.png';
import { useState } from 'react';

const floatMenuCollapseButton = {
  position: 'absolute',
  bottom: 8,
  right: 8,
};

const SideNavBar = () => {
  const [collapsed, setCollapsed] = useState(true);

  const location = useLocation();

  const pathMatchRegex = /^\/([a-z\-]+)/;

  const pathMatch = location.pathname.match(pathMatchRegex);
  const pathPrefix = pathMatch[1];

  return (
    <Sider
      trigger={null}
      breakpoint="sm"
      collapsible
      theme="light"
      collapsed={!collapsed}
      style={{ boxShadow: '0 0 8px 2px rgba(0, 0, 0, 0.05)' }}
    >
      <Row align="center" justify="center">
        <img src={logo} style={{ width: 25, height: 25, marginTop: 15, marginRight: 5 }} />
        {collapsed && (
          <div style={{ whiteSpace: 'nowrap', marginTop: -10 }}>
            <Typography.Title level={4} style={{ color: 'black' }}>
              Fitness Logger
            </Typography.Title>
          </div>
        )}
      </Row>
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={pathPrefix}
        items={[
          {
            key: 'exercises',
            icon: <MenuOutlined />,
            label: <NavLink to="/exercises">Exercises</NavLink>,
          },
          {
            key: 'logs',
            icon: <ScheduleOutlined />,
            label: <NavLink to="/logs">Logs</NavLink>,
          },
          {
            key: 'calendar',
            icon: <CalendarOutlined />,
            label: <NavLink to="/calendar">Calendar</NavLink>,
          },
        ]}
      ></Menu>
      <Button
        style={floatMenuCollapseButton}
        variant="solid"
        type="text"
        onClick={() => setCollapsed(!collapsed)}
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      />
    </Sider>
  );
};

export default SideNavBar;
