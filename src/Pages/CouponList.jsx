import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "antd";
import { useSelector } from "react-redux";
// import "../scss/BlogsList.scss";
const baseUrl = import.meta.env.VITE_BASE_URL;

const CouponsList = () => {
  const [couponData, setCouponData] = useState([]);

  const token = useSelector((state) => state.auth.token);
  const headers = { Authorization: `Bearer ${token}` };
  // console.log("🚀 ~ file: RegistrationTable.jsx:12 ~ RegistrationTable ~ token:", token)

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await axios.get(`${baseUrl}/coupon/showAll`, {
        headers,
      });
      setCouponData(response.data.coupons); // Use response.data.pros directly
    } catch (error) {
      console.error("Error fetching coupons:", error);
    }
  };

  const columns = [
    {
      title: "Coupon Name",
      dataIndex: "name",
      key: "name",
      className: "registration-table-name",
    },
    {
      title: "Coupon Code",
      dataIndex: "code",
      key: "code",
      className: "registration-table-code",
    },
    {
      title: "Coupon Minutes",
      dataIndex: "minutes",
      key: "minutes",
      className: "registration-table-minutes",
    },

    {
      title: "Actions",
      key: "actions",
      className: "registration-table-actions",
      render: (text, record) => (
        <span>
          <Button className="btn3" danger onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </span>
      ),
    },
  ];

  const handleDelete = async (record) => {
    try {
      const response = await axios.delete(`${baseUrl}/coupon/delete`, {
        data: { couponId: record._id },
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        // console.log("Coupons removed:", record);
        const updatedData = couponData.filter(
          (coupon) => coupon._id !== record._id
        );
        setCouponData(updatedData);
      }
    } catch (error) {
      console.error("Error removing coupon:", error);
    }
  };

  return (
    <Table
      className="couponlist-table"
      style={{ width: "100%" }}
      dataSource={couponData}
      columns={columns}
      rowClassName={() => "no-background"}
    />
  );
};

export default CouponsList;
