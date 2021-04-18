import React, { useState } from "react";
import { Menu, Space, Badge, Modal, Col, Row, Typography, Image } from "antd";
import Cookie from "js-cookie";

import {
  MailOutlined,
  ShoppingCartOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";

const { Text, Title } = Typography;
const { SubMenu } = Menu;
const cartItems = Cookie.getJSON("cartItems");

function RightMenu() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [visible, setVisible] = useState(false);
  const PaymentList = useSelector((state) => state.paymentList);
  const { payments } = PaymentList;

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };
  const handleCancel = () => {
    setVisible(false);
  };

  if (!userInfo) {
    return (
      <Menu mode="horizontal">
        <Menu.Item key="mail">
          <a href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Signup</a>
        </Menu.Item>
      </Menu>
    );
  } else {
    if (!cartItems) {
      return (
        <Space>
          <Menu mode="horizontal">
            <Menu.Item>
              <Badge count={0}>
                <ShoppingCartOutlined
                  onClick={showModal}
                  style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                />
              </Badge>
            </Menu.Item>
            <SubMenu title={<UserOutlined style={{ fontSize: "1.5rem" }} />}>
              <Menu.Item style={{ paddingLeft: "85px", margin: "auto" }}>
                <img
                  src={userInfo.avatar}
                  alt="profile_pic"
                  style={{ width: "25px", borderRadius: "50px" }}
                />
              </Menu.Item>
              <Menu.Item>{userInfo.email}</Menu.Item>
            </SubMenu>
          </Menu>
          <Modal
            title="Basic Modal"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
          ></Modal>
        </Space>
      );
    } else {
      return (
        <Space>
          <Menu mode="horizontal">
            <Menu.Item>
              <Badge
                count={!payments ? 0 : payments.length}
                style={{ backgroundColor: "green" }}
              >
                <UnorderedListOutlined
                  style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                />
              </Badge>
              <a href="/payments" style={{ padding: "0" }}>
                Payments
              </a>
            </Menu.Item>
            <Menu.Item>
              <Badge count={cartItems.length}>
                <ShoppingCartOutlined
                  onClick={showModal}
                  style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                />
              </Badge>
              Cart
            </Menu.Item>
            <Menu.Item>
              <Badge count={cartItems.length}>
                <MailOutlined
                  style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                />
              </Badge>
              Inbox
            </Menu.Item>
            <SubMenu title={<UserOutlined style={{ fontSize: "1.5rem" }} />}>
              <Menu.Item style={{ paddingLeft: "85px", margin: "auto" }}>
                <img
                  src={userInfo.avatar}
                  alt="profile_pic"
                  style={{ width: "25px", borderRadius: "50px" }}
                />
              </Menu.Item>
              <Menu.Item>{userInfo.email}</Menu.Item>
            </SubMenu>
          </Menu>
          <Modal
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            {cartItems.map((product) => (
              <Row justify="space-around" align="middle">
                <Col>
                  <Image
                    src={product.image}
                    alt="profile_pic"
                    style={{ width: "50px" }}
                  />
                </Col>
                <Col>
                  <Title level={3}>{product.qty}</Title>
                </Col>
                <Col key={product.product}>
                  <Text>{product.price}</Text>
                </Col>
              </Row>
            ))}
          </Modal>
        </Space>
      );
    }
  }
}

export default RightMenu;
