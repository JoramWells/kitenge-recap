import React, { useState } from "react";
import { Menu, Space, Badge, Modal, Col, Row, Typography, Image,message } from "antd";
import Cookie from "js-cookie";
import {withRouter,Link} from "react-router-dom"
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


function RightMenu(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [visible, setVisible] = useState(false);
  const PaymentList = useSelector((state) => state.paymentList);
  const { payments } = PaymentList;

  const showModal = () => {
    setVisible(true);
  };
  const logout = async() =>{
    if(!userInfo){
      console.log()
    }
    await Cookie.remove('userInfo')
    setTimeout((
      message.success('Logged out successfully')
    ),2000)
    props.history.push('/')
  }

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
          <Link to="/login">Signin</Link>
        </Menu.Item>
        <Menu.Item key="app">
          <Link to="/register">Signup</Link>
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
              <Menu.Item onClick={()=>logout()}>Logout</Menu.Item>
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

export default withRouter (RightMenu);
