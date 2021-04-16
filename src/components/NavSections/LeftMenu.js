import React from "react";
import { Menu, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

function LeftMenu() {
  return (
    <Menu mode="horizontal">
      <Menu.Item>
        <Input
          placeholder="search.."
          prefix={<SearchOutlined size="large" />}
          style={{ borderRadius: "50px" }}
        />
      </Menu.Item>
    </Menu>
  );
}

export default LeftMenu;
