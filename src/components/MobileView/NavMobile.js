import React,{useState} from "react";
import {
  UserOutlined,
  HomeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Menu, Badge } from "antd";
import { useSelector } from "react-redux";
import Cookie from "js-cookie";

const { SubMenu } = Menu;
const cartItems = Cookie.getJSON("cartItems");

export default function NavMobile() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [visible, setVisible] = useState(false);
  const PaymentList = useSelector((state) => state.paymentList);
  const { payments } = PaymentList;
  if(!userInfo){
    return(
      <nav>
      <Menu
        mode="horizontal"
        style={{  border: "0" }}
      >
        <Menu.Item title="Home">
          <a href="/">
          <HomeOutlined style={{ fontSize: "1.5rem" }} />

          </a>
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
        
        <Menu.Item
          icon={<SearchOutlined style={{ fontSize: "1.5rem" }} />}
        >Search</Menu.Item>
                <Menu.Item
          icon={<SearchOutlined style={{ fontSize: "1.5rem" }} />}
        >Signup</Menu.Item>

      </Menu>
    </nav>
    )
  }else{
    if(!cartItems){
      return (
        <nav>
          <Menu
            mode="horizontal"
            style={{ justifyContent: "space-between", border: "0" }}
          >
            <Menu.Item title="Home">
              <HomeOutlined style={{ fontSize: "1.5rem" }} />
            </Menu.Item>
            <Menu.Item
              icon={
                <Badge  count={0} style={{ backgroundColor: "green" }}>
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
            >Search</Menu.Item>
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
        </nav>
      );
    }else{
      return (
        <nav>
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
            >Search</Menu.Item>
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
        </nav>
      );
      
    }

  }

}
