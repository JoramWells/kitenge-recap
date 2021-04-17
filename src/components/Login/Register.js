import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../_actions/userActions";
import { GoogleLogin } from "react-google-login";
import PhoneInput from "react-phone-input-2";
import { useHistory } from "react-router-dom";
import { Row, Col, Form, Input, Button, Avatar, Card } from "antd";
import {
  LockOutlined,
  MailOutlined,
  StopOutlined,
  UserOutlined,
} from "@ant-design/icons";

export default function SignUp(props) {
  const CLIENT_ID = "266388441735-5a4sfpj0lpk8nvjkf52ppoqqul0139st.apps.googleusercontent.com"
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo } = userRegister;
  const dispatch = useDispatch();
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  // useEffect(() => {
  //   if (userInfo)
  //     return () => {
  //       history.goBack();
  //     };
  // }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(
      register(name, email, password, avatar, phone, address));
      if(!userInfo)return
      if(userInfo.success == 0){
        console.log('success')
      }

  };

  const responseSuccess = (response) => {
    setName(response.profileObj.name);
    setEmail(response.profileObj.email);
    setAvatar(response.profileObj.imageUrl);

    setPassword("JoramWells18.");
    // props.history.push('/')
  };
  const responseFailure = (response) => {
    console.log(response);
    // props.history.push('/')
  };

  return (
    <>
      <Row
        justify="space-around"
        align="middle"
        style={{ marginTop: "0.5rem" }}
      >
        <Card style={{ width: "25rem" }}>
          <Avatar src={avatar} style={{ margin: "0.3rem" }} />

          <Form layout="vertical" size="large" onSubmit={submitHandler}>
            <Form.Item required>
              <Input
                prefix={<UserOutlined />}
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
              />
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
            <Form.Item required>
              <Input
                prefix={<MailOutlined />}
                value={email}
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>

            <Form.Item required>
              <Input
                id="address"
                name="address"
                placeholder="Enter your location"
                prefix={<StopOutlined />}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Item>
            {/* <Form.Item label="Location" required>
                <PlacesAutocomplete
                  value={address}
                  onChange={setAddress}
                  onSelect={handleSelect}
                >
                  {({
                    getInputProps,
                    suggestions,
                    getSuggestionItemProps,
                    loading,
                  }) => (
                    <div>
                      <Input
                        {...getInputProps({
                          placeholder: "Enter your location",
                        })}
                      />
                      <div>
                        {loading ? <div>Loading...</div> : null}
                        {suggestions.map((suggestion) => {
                          return (
                            <div {...getSuggestionItemProps(suggestion)}>
                              <p>{suggestion.description}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </PlacesAutocomplete>
              </Form.Item> */}
            <Form.Item
              required
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            >
              <PhoneInput
                country={"ke"}
                preferredCountries={["ke", "ug", "tz"]}
                placeholder="254799980846"
              />
            </Form.Item>

            <Form.Item required>
              <Input.Password
                prefix={<LockOutlined />}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                onClick={submitHandler}
                block
              >
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
                  clientId= {CLIENT_ID}
                  buttonText="Login"
                  onSuccess={responseSuccess}
                  onFailure={responseFailure}
                  isSignedIn={true}
                  style={{ display: "block" }}
                  
                />
              </Col>
            </Row>
          </Form>
        </Card>
      </Row>
    </>
  );
}
