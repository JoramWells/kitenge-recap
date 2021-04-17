import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Row, Col, Typography, Form, Input, Button } from "antd";
import { savePayment } from "../../_actions/cartActions";

const { Title } = Typography;

export default function PaymentScreen(props) {
  const [address, setAddress] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePayment(address));
    props.history.push("/placeorder");
  };

  return (
    <Row
      justify="space-around"
      align="middle"
      style={{ marginTop: "40px", padding: "2rem" }}
    >
      <Col span={10}>
        <Title level={3} style={{ textAlign: "center" }}>
          Payment
        </Title>
        <Form layout="vertical" name="basic" onSubmit={submitHandler}>
          <Form.Item
            required
            id="Mpesa"
            label="M-PESA"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          >
            <Input type="radio" />
          </Form.Item>

          <Row>
            <Col span={12}>
              <Button style={{ display: "block" }} onClick={submitHandler}>
                Continue
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
}
