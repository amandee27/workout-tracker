import { CalendarOutlined, MenuOutlined, ScheduleOutlined } from '@ant-design/icons';
import { Flex, Menu, Typography } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { NavLink } from 'react-router-dom';
import logo from '../Logo/NameLogo.png';

const SideNavBar = () => {
  let tokenInfo = JSON.parse(localStorage.getItem('token-info'));
  let displayName = tokenInfo.displayName;
  return (
    <Sider breakpoint="sm" collapsible collapsedWidth="0" theme="light">
      <Flex justify="center" align="center">
        <img src={logo} style={{ width: 15, height: 15, marginTop: 15, marginRight: 5 }}></img>
        <Typography.Title level={4} style={{ color: 'black' }}>
          Fitness Logger
        </Typography.Title>
      </Flex>
      <Menu theme="light" mode="inline" defaultSelectedKeys={['4']}>
        <Menu.Item key="2" icon={<MenuOutlined />}>
          <NavLink to="/exercises">Exercises</NavLink>
        </Menu.Item>
        <Menu.Item key="3" icon={<ScheduleOutlined />}>
          <NavLink to="/logs">Logs</NavLink>
        </Menu.Item>
        <Menu.Item key="4" icon={<CalendarOutlined />}>
          <NavLink to="/calendar">Calendar</NavLink>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SideNavBar;
