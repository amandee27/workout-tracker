import { Button, Flex, Layout, Menu } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import logo from '../Logo/kettlebell.png';

const Home = () => {
    return (
        <div>
            <Layout hasSider>
                <Sider style={{ overflow: 'auto', height: '100vh', position: 'sticky', insetInlineStart: 0, top: 0, bottom: 0, scrollbarWidth: 'thin', scrollbarGutter: 'stable', }}>
                    <div className="demo-logo-vertical" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={[{ label: `nav 1` }, { label: `nav 2` }]} />
                </Sider>
                <Layout>
                    <Header style={{ display: 'flex', alignItems: 'center' }}></Header>
                    <Content>
                        <div style={{ minHeight: 600, padding: 0 }}>
                            <Flex justify='center'>
                                <Flex align='center'>
                                    <img src={logo} alt="Logo" style={{ width: '40 px', height: '40px' }} />
                                </Flex>
                                <div><h1>Workout Tracker</h1></div>
                            </Flex>
                            <Flex justify='center'>
                                <div><h4>Workout tracking app</h4></div>
                            </Flex>
                        </div>
                    </Content>
                    <Footer></Footer>
                </Layout>
            </Layout>
        </div>
    );
}

export default Home;