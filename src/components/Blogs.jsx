import React, { useState } from "react";
import { Button, Input, Form, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const { TextArea } = Input;

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://skillbanaobe.onrender.com/blog/addBlog",
        {
          title,
          content,
          image,
        }
      );

      console.log("Blog saved:", response.data);
      message.success("Blog saved successfully");
    } catch (error) {
      console.error("Error saving blog:", error);
      message.error("Error saving blog");
    }
  };

  const handleImageUpload = async (file) => {
    // setImageFile(file);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(
        "https://skillbanaobe.onrender.com/professional/uploadImage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setImage(response.data.image.src);
    } catch (error) {
      console.error("Image upload error:", error);
    }
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
