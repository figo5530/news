import React from 'react';
import SideMenu from '../../components/sandbox/SideMenu';
import TopHeader from '../../components/sandbox/TopHeader';

import { Layout } from 'antd';
import './NewsSandBox.css'
import NewsRouter from '../../components/sandbox/NewsRouter';
const { Content } = Layout

export default function NewsSandBox() {
  return (
      <Layout>
            <SideMenu></SideMenu>
            <Layout className='site-layout'>
                <TopHeader></TopHeader>
                <Content
                    className="site-layout-background"
                    style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                    overflow: 'auto'
                    }}
                >
                    <NewsRouter />
                </Content>
                
            </Layout>
      </Layout>
      
  )
}
