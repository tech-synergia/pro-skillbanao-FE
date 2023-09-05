import { useState } from "react";
import { Button, Input, Form, message as antdMessage } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
const baseUrl = import.meta.env.VITE_BASE_URL;

function Coupon() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [minutes, setMinutes] = useState(0);

  const token = useSelector((state) => state.auth.token);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/coupon/add`,
        {
          name,
          code,
          minutes,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // console.log("Coupon saved:", response.data);
      antdMessage.success("Coupon added successfully");
    } catch (error) {
      // console.error("Error adding coupon:", error);
      antdMessage.error("Error adding coupon");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Add a New Coupon</h1>
      <Form layout="vertical">
        <Form.Item label="Coupon Name">
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Item>
        <Form.Item label="Coupon Code">
          <Input value={code} onChange={(e) => setCode(e.target.value)} />
        </Form.Item>
        <Form.Item label="Coupon Minutes">
          <Input value={minutes} onChange={(e) => setMinutes(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            onClick={handleSubmit}
            // disabled={!isImageUploaded}
          >
            Add Coupon
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Coupon;
