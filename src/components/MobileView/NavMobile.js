import React from "react";
import {
  MailOutlined,
  ShopOutlined,
  UserOutlined,
  HomeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Menu, Badge } from "antd";

const { SubMenu } = Menu;
export default function NavMobile() {
  return (
    <div>
      <Menu
        mode="horizontal"
        style={{ justifyContent: "space-between", border: "0" }}
      >
        <Menu.Item title="Home">
          <HomeOutlined style={{ fontSize: "1.5rem" }} />
        </Menu.Item>
        <Menu.Item
          icon={
            <Badge dot count={1} style={{ backgroundColor: "green" }}>
              Inbox
            </Badge>
          }
        ></Menu.Item>
        <Menu.Item>
          <Badge dot count={2}>
            Cart
          </Badge>
        </Menu.Item>
        <Menu.Item>
          <Badge count={2}>Payments</Badge>
        </Menu.Item>
        <Menu.Item
          icon={<SearchOutlined style={{ fontSize: "1.5rem" }} />}
        ></Menu.Item>
        <SubMenu title={<UserOutlined style={{ fontSize: "1.5rem" }} />}>
          <Menu.Item>Logout</Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  );
}
