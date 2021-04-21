import React, { useState } from "react";
import {
  HomeOutlined,
  MailOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Menu, Badge, Col, Image, Typography, Row, Modal,Table } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import moment from "moment";

const columns = [
  {
    title: "Product Name",
    dataIndex: "product_name",
    key: "product_name",
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    render: (img) => (
      <Image src={img} alt="image file" style={{ width: "50px" }} />
    ),
  },
  {
    title: "Qty",
    dataIndex: "qty",
    key: "qty",
  },{
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
];



const { SubMenu } = Menu;
const {  Title } = Typography;
export default function NavMobile(props) {
  const [visible, setVisible] = useState(false);
  const handleOk = () => {
    setVisible(false);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const showModal = () => {
    setVisible(true);
  };
  if (!props.user) {
    return (
      <nav
        className="menu"
        style={{
          position: "sticky",
          display: "block",
          width: "100%",
          zIndex: "1",
        }}
      >
        <div className="menu__logo">
          <a href="/">
            <HomeOutlined style={{ fontSize: "1.5rem" }} />
          </a>
        </div>

        <Menu mode="horizontal" style={{ float: "right" }}>
          <Menu.Item>
            <a href="/login">Login</a>
          </Menu.Item>
          <Menu.Item>
            <a href="/register">Register</a>
          </Menu.Item>
        </Menu>
      </nav>
    );
  } else {
    if (!props.cart) {
      return (
        <nav
          className="menu"
          style={{
            position: "sticky",
            display: "block",
            width: "100%",
            zIndex: "1",
          }}
        >
          <div className="menu__logo">
            <a href="/">
              <HomeOutlined
                style={{ fontSize: "1.5rem", paddingTop: "1rem" }}
              />
            </a>
          </div>
          <Menu
            mode="horizontal"
            style={{ justifyContent: "space-between", float: "right" }}
          >
            <Menu.Item
              icon={
                <Badge count={0} style={{ backgroundColor: "green" }}>
                  <MailOutlined style={{ fontSize: "1.3rem" }} />
                </Badge>
              }
            ></Menu.Item>
            <Menu.Item>
              <Badge dot count={0}>
                <ShoppingCartOutlined style={{ fontSize: "1.5rem" }} />
              </Badge>
            </Menu.Item>

            <SubMenu
              style={{ marginBottom: "0.4rem" }}
              
              title={
                <Avatar
                  src={props.user.avatar ? props.user.avatar: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`}
                  style={{ width: "1.5rem", height: "auto", margin: "0px" }}
                />
              }
            >

              <Menu.Item>{props.user.email}</Menu.Item>
            </SubMenu>
          </Menu>
        </nav>
      );
    } else {
      return (
        <>
          <nav
            className="menu"
            style={{
              position: "sticky",
              display: "block",
              width: "100%",
              zIndex: "1",
              top: "0",
            }}
          >
            <div className="menu__logo">
              <a href="/">
                <HomeOutlined
                  style={{ fontSize: "1.5rem", paddingTop: "1rem" }}
                />
              </a>
            </div>
            <Menu
              mode="horizontal"
              style={{
                justifyContent: "space-between",
                border: "0",
                float: "right",
                paddingTop: "0.5rem",
              }}
            >
              <Menu.Item
                icon={
                  <Badge dot count={1} style={{ backgroundColor: "green" }}>
                    <MailOutlined style={{ fontSize: "1.3rem" }} />
                  </Badge>
                }
              ></Menu.Item>
              <Menu.Item>
                <Badge count={props.cart.length}>
                  <ShoppingCartOutlined
                    onClick={showModal}
                    style={{ fontSize: "1.5rem" }}
                  />
                </Badge>
              </Menu.Item>

              <SubMenu
                style={{ marginBottom: "0.4rem" }}
                title={
                  <Avatar
                    src={props.user.avatar}
                    style={{ width: "1.5rem", height: "auto", margin: "0px" }}
                  />
                }
              >
                <Menu.Item>{props.user.email}</Menu.Item>
              </SubMenu>
            </Menu>
            {/* navbar */}
          </nav>
          <Modal visible={visible} onOk={handleOk} onCancel={handleCancel}>
            <Table dataSource={props.cart} columns={columns} />

             
            <Row align="middle" justifyContent="space-between">
              <Col>
            <a href="/cart">Proceed to checkout</a>

              </Col>
            </Row>
            
          </Modal>
        </>
      );
    }
  }
} // <Row justify="space-around" align="middle">
              //   <Col>
              //     <Image
              //       src={product.image}
              //       alt="profile_pic"
              //       style={{ width: "50px" }}
              //     />
              //   </Col>
              //   <Col>
              //     <Title level={3}>{product.qty}</Title>
              //   </Col>
              //   <Col key={product.product}>
              //   <NumberFormat
              //   value={product.price}
              //   thousandSeparator={true}
              //   displayType={"text"}
              //   prefix="Ksh "
              //   suffix=" /="
                
              // />
              //   </Col>
              // </Row>
