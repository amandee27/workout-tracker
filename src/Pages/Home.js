import { Layout } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';
import SideNavBar from './SideNavBar';

const Home = () => {
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <SideNavBar></SideNavBar>
      <Layout>
        <Outlet></Outlet>
      </Layout>
    </Layout>
  );
};

export default Home;
