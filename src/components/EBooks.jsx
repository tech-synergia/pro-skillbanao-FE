import React, { useState } from 'react';
import { Upload, Button, List } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import '../scss/EBooks.scss'

function EBooks() {
  const [fileList, setFileList] = useState([]);

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const uploadProps = {
    fileList,
    onChange: handleFileChange,
    beforeUpload: file => {
      return false;
    },
  };

  return (
    <div className='eBooks'>
        <h2>Free EBooks</h2>
      <Upload {...uploadProps}>
        <Button icon={<UploadOutlined />}>Upload PDF</Button>
      </Upload>
      <List
        dataSource={fileList}
        renderItem={file => (
          <List.Item key={file.uid} ></List.Item>
        )}
      />
    </div>
  );
}

export default EBooks;
