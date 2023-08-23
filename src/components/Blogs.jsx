import React, { useState } from "react";
import { Button, Input, Form } from "antd";
import axios from "axios";

const { TextArea } = Input;

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/blogs", {
        title,
        content,
      });

      console.log("Blog saved:", response.data);
    } catch (error) {
      console.error("Error saving blog:", error);
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
