import { Layout } from 'antd';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SideNavBar from './SideNavBar';
import HeaderNav from './HeaderNav';
import { Content } from 'antd/es/layout/layout';

const Home = () => {
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <SideNavBar></SideNavBar>
      <Layout>
        <HeaderNav></HeaderNav>
        <Content style={{ backgroundColor: 'white', height: '100vh - 30px' }}>
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
