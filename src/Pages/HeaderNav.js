import { Button, Col, Dropdown, Layout, Row, Switch, Typography } from 'antd';
import {
  LogoutOutlined,
  MoonOutlined,
  QuestionOutlined,
  SettingOutlined,
  SunOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Search from 'antd/es/transfer/search';
import userImg from '../Logo/user.png';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

const items = [
  {
    key: '1',
    label: 'Logout',
    icon: <LogoutOutlined />,
  },
];

const HeaderNav = () => {
  const onSearch = () => {};
  let tokenInfo = JSON.parse(localStorage.getItem('token-info'));
  let displayName = tokenInfo.displayName;
  const navigate = useNavigate();
  const handleDropdownItemClick = (e) => {
    if (e.key === '1') {
      localStorage.removeItem('token-info');
      navigate('/login');
    }
  };
  return (
    <Header>
      <Row>
        <Col span={12}>
          <Col style={{ width: 350 }}>
            <Search placeholder="input search text" allowClear onSearch={onSearch} />
          </Col>
        </Col>
        <Col span={12}>
          <Row align="center" justify="end">
            <Col span={3}>
              <Switch
                size="small"
                defaultChecked
                checkedChildren={<MoonOutlined />}
                unCheckedChildren={<SunOutlined />}
              />
            </Col>
            <Col span={5}>
              <Dropdown
                menu={{
                  onClick: handleDropdownItemClick,
                  items: items,
                }}
                placement="topLeft"
              >
                <Button color="default" variant="outlined" style={{ marginTop: 15 }} ghost>
                  <img src={userImg} style={{ width: 22, height: 22 }} />
                  {displayName}
                </Button>
              </Dropdown>
            </Col>
          </Row>
        </Col>
      </Row>
    </Header>
  );
};

export default HeaderNav;
