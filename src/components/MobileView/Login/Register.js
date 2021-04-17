import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../_actions/userActions";
import { GoogleLogin } from "react-google-login";
import { Row, Col, Form, Input, Button, Avatar } from "antd";

export default function SignUp(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  const dispatch = useDispatch();
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  useEffect(() => {
    if (userInfo)
      return () => {
        props.history.push(redirect);
      };
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password, avatar));
  };

  const responseGoogle = (response) => {
    console.log(response);
    setName(response.profileObj.name);
    setEmail(response.profileObj.email);
    setAvatar(response.profileObj.imageUrl);

    setPassword("JoramWells18.");
    // props.history.push('/')
  };

  return (
    <>
      <Row justify="space-around" align="center" style={{ marginTop: "2rem" }}>
        <Col>
          <Avatar src={avatar} style={{ fontSize: "3rem" }} />
        </Col>
      </Row>
      <Row
        justify="space-around"
        align="middle"
        style={{ marginTop: "1.5rem" }}
      >
        <Col span={10}>
          <Form layout="vertical" name="basic" onSubmit={submitHandler}>
            <Form.Item
              required
              id="firstName"
              label="First Name"
              value={name}
              rules={[{ message: "Enter name", value: { name } }]}
              onChange={(e) => setName(e.target.value)}
            >
              <Input value={name} />
            </Form.Item>
            <Form.Item
              hidden
              name="avatar"
              label="image"
              value={avatar}
              rules={[{ message: "Enter image" }]}
              onChange={(e) => setAvatar(e.target.value)}
            >
              <Input />
            </Form.Item>
            <Form.Item
              required
              id="email"
              label="Email Address"
              name="email"
              rules={[{ message: "Enter email" }]}
              onChange={(e) => setEmail(e.target.value)}
            >
              <Input value={email} />
            </Form.Item>

            <Form.Item
              required
              name="password"
              label="Password"
              id="password"
              rules={[{ message: "Enter password" }]}
              onChange={(e) => setPassword(e.target.value)}
            >
              <Input.Password value={password} />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary" onClick={submitHandler}>
                Sign Up
              </Button>
            </Form.Item>

            <Row
              justify="space-around"
              align="middle"
              style={{ padding: "1rem" }}
            >
              <Col>
                <Link
                  to={
                    redirect === "/" ? "signin" : "signin?redirect=" + redirect
                  }
                  variant="body2"
                  style={{ color: "#3b3c36" }}
                >
                  Already have an account? Sign in
                </Link>
              </Col>
              <Col>
                <GoogleLogin
                  clientId="266388441735-5a4sfpj0lpk8nvjkf52ppoqqul0139st.apps.googleusercontent.com"
                  buttonText="Login"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  isSignedIn={true}
                  style={{ display: "block" }}
                />
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  );
}
