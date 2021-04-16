import React from "react";
import { Menu, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

function CenterMenu() {
  return (
    <Menu mode="horizontal">
      <Menu.Item>
        <Input prefix={<SearchOutlined />} style={{ borderRadius: "50px" }} />
      </Menu.Item>
    </Menu>
  );
}

export default CenterMenu;
