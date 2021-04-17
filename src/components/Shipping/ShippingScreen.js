import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Typography,
  Button,
  Descriptions,
  message,
  Space,
} from "antd";
import { confirmPayment, makePayment } from "../../_actions/paymentActions";
const { Title, Text } = Typography;

export default function ShippingScreen() {
  const userSignin = useSelector((state) => state.userSignin);
  const paymentDetail = useSelector((state) => state.payment);
  let qt = "";
  const { loading, paymentDetails, error } = paymentDetail;
  const confirmDetails = useSelector((state) => state.confirmDetails);
  const {
    loadingDetails,
    confirmPaymentDetails,
    errorDetails,
  } = confirmDetails;
  // const {} = confirmPayment;
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  const paymentHandler = (phone, amount) => {
    dispatch(makePayment(userInfo.address, amount));
  };

  const confirmPay = async (checkoutrequestID) => {
    await dispatch(confirmPayment(checkoutrequestID));
  };

  return (
    <>
      <Row
        justify="space-around"
        align="middle"
        style={{ marginTop: "40px", padding: "2rem" }}
      >
        <Col>
          <Descriptions title="Your Details">
            <Descriptions.Item>
              {userInfo.name}, {userInfo.email}, {userInfo.phone},{" "}
              {userInfo.address}
            </Descriptions.Item>
          </Descriptions>

          {cartItems.map((product) => (
            <Descriptions
              style={{ marginTop: "1rem" }}
              key={product.id}
              size="small"
              bordered
              title={product.product_name}
              column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
              <Descriptions.Item>
                ksh {product.price}, qty {product.qty}
              </Descriptions.Item>
              <Descriptions.Item>
                <img
                  src={product.image}
                  style={{ width: "50px" }}
                  alt="product"
                />
              </Descriptions.Item>
            </Descriptions>
          ))}
        </Col>
      </Row>
      <Row justify="space-around" align="middle">
        <Col>
          <Title level={5}>
            {" "}
            Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items): ${" "}
            {(qt = cartItems.reduce((a, c) => a + c.price * c.qty, 0))}
          </Title>
        </Col>
      </Row>
      <Row justify="space-around" align="middle" style={{ padding: "1rem" }}>
        <Col span={6}>
          <Button
            className="cart"
            style={{ border: "0" }}
            type="ghost"
            block
            size="large"
            onClick={() => paymentHandler(userInfo.phone, qt)}
          >
            <Text>BUY NOW!!</Text>
          </Button>
        </Col>
      </Row>
      <Row>
        {loading ? (
          <div>{message.info("loading..")}</div>
        ) : error ? (
          <div>{message.warn(error)}</div>
        ) : (
          <div>
            {!paymentDetails ? (
              <div></div>
            ) : (
              <Space>
                <Button
                  onClick={() => confirmPay(paymentDetails.CheckoutRequestID)}
                  size="large"
                  type="primary"
                  block
                  style={{ margin: "2rem" }}
                >
                  Please Confirm
                </Button>
                <>
                  {loadingDetails ? (
                    <div>Loading...</div>
                  ) : errorDetails ? (
                    <div>{message.warn(errorDetails)}</div>
                  ) : (
                    <div>
                      {!confirmPaymentDetails ? (
                        <div></div>
                      ) : (
                        <Col>
                          {message.info(confirmPaymentDetails.ResultDesc)}
                        </Col>
                      )}
                    </div>
                  )}
                </>
              </Space>
            )}
          </div>
        )}
      </Row>
    </>
  );
}
