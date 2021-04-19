import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../_actions/userActions";
import {
  Form,
  Checkbox,
  Input,
  Button,
  Card,
  Typography,
  Row,
  Col,
  Spin,
} from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function SignIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { loading, userInfo, error } = userSignin;
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  const dispatch = useDispatch();

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
    props.history.push("/");
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {};
  }, [userInfo]);

  return (
    <Row justify="space-around" align="middle" style={{marginTop:"0.5rem"}}>
      
        <Card style={{ width: "25rem" }}>
          <Title level={3} style={{ textAlign: "center" }}>
            Sign in
          </Title>
          <Form size="large" layout="vertical" noValidate>
            {loading && (
              <Row justify="space-around" align="middle">
                <Spin />
              </Row>
            )}
            {error && <div>{error}</div>}
            <Form.Item
              label="Enter email address"
              required
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            >
              <Input prefix={<MailOutlined/>} placeholder="blackwell@gmail.com" />
            </Form.Item>
            <Form.Item
              name="password"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            >
              <Input.Password prefix={<LockOutlined/>} placeholder="Enter password" />
            </Form.Item>


            <Form.Item>
              <Button
                className="cart"
                type="primary"
                htmlType="submit"
                // onClick={submitHandler}
                block
                style={{border:"none"}}
              >
                Login
              </Button>
            </Form.Item>

            <Row>
              <Col>
                <Link
                  to={
                    redirect === "/"
                      ? "register"
                      : "register?redirect=" + redirect
                  }
                  variant="body1"
                  style={{ color: "#3b3c36" }}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Col>
            </Row>
          </Form>
        </Card>
    </Row>
  );
}
