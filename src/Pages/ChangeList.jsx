import { useState } from "react";
import { Button, Input, Form, message as antdMessage } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
const baseUrl = import.meta.env.VITE_BASE_URL;

function ChangeList() {
  const [pros, setPros] = useState("");
  const [chats, setChats] = useState("");
  const [customers, setCustomers] = useState("");

  const token = useSelector((state) => state.auth.token);

  const handleSubmit = async () => {
    try {
      const response = await axios.patch(
        `${baseUrl}/website/updateDetails`,
        {
          id: "64f7201d440feb8c2500c955",
          professionals: pros,
          chats,
          customers,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // console.log("Coupon saved:", response.data);
      antdMessage.success("Details updated successfully!");
    } catch (error) {
      // console.error("Error adding coupon:", error);
      antdMessage.error("Error updating details!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Change Showcase Details</h1>
      <Form layout="vertical">
        <Form.Item label="Professionals">
          <Input value={pros} onChange={(e) => setPros(e.target.value)} />
        </Form.Item>
        <Form.Item label="Chats">
          <Input value={chats} onChange={(e) => setChats(e.target.value)} />
        </Form.Item>
        <Form.Item label="Customers">
          <Input
            value={customers}
            onChange={(e) => setCustomers(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            onClick={handleSubmit}
            // disabled={!isImageUploaded}
          >
            Update Details
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ChangeList;
