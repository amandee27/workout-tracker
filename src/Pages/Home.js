import { Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import SideNavBar from './SideNavBar';
import HeaderNav from './HeaderNav';
import { Content } from 'antd/es/layout/layout';

const Home = () => {
  return (
    <Layout
      style={{
        height: '100vh',
        width: '100vw',
      }}
    >
      <SideNavBar style={{ height: '100%' }}></SideNavBar>
      <Layout>
        <HeaderNav></HeaderNav>
        <Content style={{ backgroundColor: 'white', height: '100%', overflowY: 'scroll' }}>
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
