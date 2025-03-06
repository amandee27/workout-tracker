import {
  CalendarOutlined,
  MenuOutlined,
  ScheduleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Flex, Menu, Typography, Button } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../Logo/heart.png';
import { useState } from 'react';

const floatMenuCollapseButton = {
  position: 'absolute',
  bottom: 8,
  right: 8,
};

const SideNavBar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate('/');
  };

  return (
    <Sider
      trigger={null}
      breakpoint="sm"
      collapsible
      theme="light"
      collapsed={!collapsed}
      style={{ boxShadow: '0 0 8px 2px rgba(0, 0, 0, 0.05)' }}
    >
      <Flex justify="center" align="center" onClick={navigateHome}>
        <img src={logo} style={{ width: 25, height: 25 }}></img>
        {collapsed && (
          <Typography.Title level={4} style={{ color: 'black', paddingLeft: 10, marginTop: 15, marginBottom: 15 }}>
            Fitness Logger
          </Typography.Title>
        )}
      </Flex>
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={[
          {
            key: '1',
            icon: <MenuOutlined />,
            label: <NavLink to="/exercises">Exercises</NavLink>,
          },
          {
            key: '2',
            icon: <ScheduleOutlined />,
            label: <NavLink to="/logs">Logs</NavLink>,
          },
          {
            key: '3',
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
