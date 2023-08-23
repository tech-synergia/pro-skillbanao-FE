import React, { useState } from "react";
import { Button, Input, Form, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const { TextArea } = Input;

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null); // New state for image file

  const handleSubmit = async () => {
    try {
      // Create a FormData object to send image and other data
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("image", imageFile);

      const response = await axios.post("/api/blogs", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      });

      console.log("Blog saved:", response.data);
      message.success("Blog saved successfully");
    } catch (error) {
      console.error("Error saving blog:", error);
      message.error("Error saving blog");
    }
  };

  const handleImageUpload = (file) => {
    setImageFile(file);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Add a New Blog</h1>
      <Form layout="vertical">
        <Form.Item label="Title">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Item>
        <Form.Item label="Content">
          <TextArea
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Cover Photo">
          <Upload beforeUpload={handleImageUpload} showUploadList={false}>
            <Button icon={<UploadOutlined />}>Upload Cover Photo</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleSubmit}>
            Save Blog
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default App;
