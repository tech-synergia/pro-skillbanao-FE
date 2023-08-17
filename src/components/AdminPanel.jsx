import React from 'react';
import { Layout } from 'antd';
import LeftPanel from './LeftPanel';
import RegistrationTable from './RegistrationTable';
import '../scss/AdminPanel.scss'

const { Content } = Layout;

function AdminPanel() {
  return (
  
    <Layout className="admin-panel-layout">
      <LeftPanel />
      <Layout>
        <Content className="admin-content">
          <RegistrationTable />
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminPanel;
