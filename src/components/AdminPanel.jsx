import React from 'react';
import { Layout } from 'antd';
import LeftPanel from './LeftPanel';
import RegistrationTable from './RegistrationTable';

const { Content } = Layout;

function AdminPanel() {
  return (
  
    <Layout>
      <LeftPanel />
      <Layout>
        <Content>
          <RegistrationTable />
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminPanel;
