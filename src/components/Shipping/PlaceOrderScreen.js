import React, { useEffect } from "react";
import { addToCart, removeFromCart } from "../../_actions/cartActions";
import { useSelector, useDispatch } from "react-redux";
import { Button, Row, Col, Empty, Image, Typography } from "antd";
import { DeleteOutlined, CheckCircleFilled } from "@ant-design/icons";

const { Title, Text } = Typography;
export default function PlaceOrderScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems, shipping, payment } = cart;
  if (!shipping) {
    props.history.push("/shipping");
  }
  const dispatch = useDispatch();
  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
    return () => {};
  }, []);
  return (
    <div style={{ padding: "2rem" }}>
      {cartItems.length === 0 ? (
        <Row justify="space-around" align="middle" style={{ padding: "2rem" }}>
          <Col>
            <Empty description="Cart is empty"></Empty>
          </Col>
        </Row>
      ) : (
        cartItems.map((item) => (
          <>
            <Row
              key={item.image}
              justify="space-around"
              align="middle"
              style={{ padding: "1rem" }}
            >
              <Col>
                <Image
                  src={item.image}
                  alt="lkfjdklsfjkl"
                  style={{ width: "200px" }}
                />
              </Col>
              <Col>
                <Title level={4}>Qty: {item.qty}</Title>
              </Col>
              <Col>
                <Button
                  onClick={() => removeFromCartHandler(item.product)}
                  icon={<DeleteOutlined />}
                  style={{
                    backgroundColor: "#CD5C5C",
                    border: "none",
                  }}
                >
                  <Text>DELETE</Text>
                </Button>
              </Col>
            </Row>
          </>
        ))
      )}
      <div>{cart.shipping.address}</div>
      <div>{cart.shipping.city}</div>
      <div>{cart.shipping.postal_code}</div>
      <Row justify="space-around" align="middle">
        <Col>
          <Title level={5}>
            {" "}
            Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items): ${" "}
            {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
          </Title>

          <Button
            icon={<CheckCircleFilled />}
            style={{ display: "inline-block" }}
            className="cart"
            block
          >
            <Text disabled={cartItems.length === 0}>Proceed to checkout</Text>
          </Button>
        </Col>
      </Row>
    </div>
  );
}
