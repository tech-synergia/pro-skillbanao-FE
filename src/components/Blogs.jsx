import React, { useState } from "react";
import { Button, Input, Form, Upload, message as antdMessage, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const { TextArea } = Input;

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [isImageUploaded, setIsImageUploaded] = useState(false); 
  const [uploading, setUploading] = useState(false);

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
    setIsImageUploaded(false);
    setUploading(true);
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
      setIsImageUploaded(true);
      antdMessage.success("Image uploaded successfully"); 
    } catch (error) {
      console.error("Image upload error:", error);
    } finally {
      setUploading(false);
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
          {/* <Upload beforeUpload={handleImageUpload} showUploadList={false}>

            <Button icon={<UploadOutlined />}>{image ? "Image Uploaded" : "Upload Cover Photo"}</Button>
          </Upload> */}
          <Upload beforeUpload={handleImageUpload} showUploadList={false}>
            {uploading ? (
              <Spin spinning={uploading}>
                <Button icon={<UploadOutlined />}>
                  {isImageUploaded ? "Image Uploaded" : "Uploading..."}
                </Button>
              </Spin>
            ) : (
              <Button icon={<UploadOutlined />}>
                {isImageUploaded ? "Image Uploaded" : "Upload Cover Photo"}
              </Button>
            )}
          </Upload>
         
        </Form.Item>
        {isImageUploaded && (
            <p style={{ color: "green" }}>Image uploaded successfully</p>
        
            )}
        <Form.Item>
          <Button type="primary" onClick={handleSubmit} disabled={!isImageUploaded}>
            Save Blog
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default App;
