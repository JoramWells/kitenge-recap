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
    <Row justify="space-around" align="middle">
      <Col span={12}>
        <Card style={{ margin: "2rem" }}>
          <Title level={3} style={{ textAlign: "center" }}>
            Sign in
          </Title>
          <Form size="large" layout="vertical" name="basic" noValidate>
            {loading && (
              <Row justify="space-around" align="middle">
                <Spin />
              </Row>
            )}
            {error && <div>{error}</div>}
            <Form.Item
              required
              id="email"
              label="Email Address"
              name="email"
              rules={[{ required: true, message: "Enter email" }]}
              onChange={(e) => setEmail(e.target.value)}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              type="password"
              id="password"
              rules={[{ required: true, message: "Enter password" }]}
              onChange={(e) => setPassword(e.target.value)}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                onClick={submitHandler}
                block
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
      </Col>
    </Row>
  );
}
