import React, { useEffect, lazy, useState } from "react";
import { withRouter } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Typography,
  Rate,
  Form,
  Skeleton,
  message,
  Modal,
  Button,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { listProducts } from "../../_actions/productActions";
import {
  EllipsisOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { addToCart } from "../../_actions/cartActions";
const NavMobile = lazy(() => import("./NavMobile"));
const CarouselHeader = lazy(() => import("../Desktop/CarouselHeader"));

const { Meta } = Card;
const { Text } = Typography;
const posts = [1, 2, 3, 4, 5];

const renderSkeleton = posts.map((post) => {
  return (
    <Col key={post}>
      <Form layout="vertical">
        <Form.Item>
          <Skeleton.Input style={{ width: "200px", height: "150px" }} /> <br />
        </Form.Item>

        <Form.Item>
          <Skeleton.Input
            style={{ width: "150px", height: "1rem" }}
            active={true}
          />
        </Form.Item>
        <Form.Item>
          <Skeleton.Input
            style={{ width: "200px", height: "1rem" }}
            active={true}
          />
        </Form.Item>
      </Form>
    </Col>
  );
});

function CarouselItem(props) {
  const [user, setUser] = useState([]);
  const [cart1, setCart] = useState([]);
  const dispatch = useDispatch();
  const ProductList = useSelector((state) => state.productList);
  const { posts, loading, error } = ProductList;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const productAddToCart = async (productId, product_name) => {
    if (!userInfo) {
      message.warn("Redirecting to login page...");
      props.history.push("/login");
    } else {
      setTimeout(
        (await dispatch(addToCart(productId, 1, userInfo.name, userInfo.phone)),
        setCart((prevState) => {
          return { ...prevState, cartItems: prevState };
        })),
        2000
      );

      message.success(`${product_name} added to cart`);
    }
  };

  useEffect(() => {
    setUser(userInfo);
    // setCart(cartItems)

    dispatch(listProducts());

    return () => {};
  }, []);

  return (
    <>
      <NavMobile user={user} cart={cart1} />
      <CarouselHeader />

      <div
        className="mobile__carousel"
        style={{ backgroundColor: "#F8F8F8", marginTop: "5rem" }}
      >
        {loading ? (
          <Row justify="space-around" align="middle">
            {renderSkeleton}
          </Row>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <Row justify="space-around" align="middle" gutter={[0, 16]}>
            {posts.map((item) => (
              <Col key={item.id}>
                <Modal
                  title="Product details"
                  visible={visible}
                  onOk={handleOk}
                  confirmLoading={confirmLoading}
                  onCancel={handleCancel}
                >
                  <Row justify="space-around" align="middle">
                    {item.product_name}
                  </Row>
                  <Row justify="space-around" align="middle">
                  <Button icon={<ShoppingCartOutlined />} onClick={()=>productAddToCart(item.id, item.product_name)} style={{marginTop:"0.5rem"}}>Add to cart</Button>

                  </Row>
                  
                </Modal>
                <Card
                  style={{ width: "18rem",  }}
                  cover={
                    <LazyLoadImage
                      src={item.image}
                      effect="blur"
                      alt="product-Image"
                      style={{ width: "inherit" }}
                    />
                  }
                  extra={
                    <EllipsisOutlined onClick={showModal} key="ellipsis" style={{transform:"rotate(90deg)"}}/>

                  }
                 
                >
                  <Link
                    to={`/product-detail/${item.id}/?category=${item.category}`}
                  >
                    <Meta title={item.product_name} description={item.shop} />
                  </Link>
                  <Rate
                    name="size-small"
                    style={{ fontSize: "1rem", color: "#f9812a" }}
                    defaultValue={item.ratings}
                  />
                  <br />
                  <Text style={{ color: "grey", fontSize: "1rem" }}>
                    <b>ksh {item.price}</b>
                  </Text>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </>
  );
}

export default withRouter(CarouselItem);
