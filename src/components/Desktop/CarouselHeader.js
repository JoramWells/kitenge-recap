import React, { useEffect, useState } from "react";
import { Image, Row, Col, Button, Card, Typography, Skeleton } from "antd";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import a4 from "../img/a4.jpeg";
import a2 from "../img/a2.jpeg";
import a3 from "../img/a3.jpeg";
import { listCategory } from "../../_actions/productActions";
import { useDispatch, useSelector } from "react-redux";

const { Meta } = Card;
const { Title } = Typography;
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function CarouselHeader() {
  const CategoryList = useSelector((state) => state.categoryLists);

  const { loading, posts, error } = CategoryList;
  const [cats, setCat] = useState([]);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const fetchData = async (id) => {
    const { data } = await axios.get("/category/" + id);
    setCat(data);
    setShow(true);
  };

  useEffect(() => {
    dispatch(listCategory());
    return () => {};
  }, []);
  return (
    <>
      <Row justify="space-around" align="middle">
        {loading ? (
          <Row justify="space-around" align="middle">
            <Col>
              <Skeleton.Input
                style={{
                  width: "70px",
                  borderRadius: "50px",
                  margin: "1rem",
                }}
              ></Skeleton.Input>
            </Col>
            <Col>
              <Skeleton.Input
                style={{ width: "70px", borderRadius: "50px", margin: "2rem" }}
              ></Skeleton.Input>
            </Col>
            <Col>
              <Skeleton.Input
                style={{ width: "70px", borderRadius: "50px", margin: "2rem" }}
              ></Skeleton.Input>
            </Col>
            <Col>
              <Skeleton.Input
                style={{ width: "70px", borderRadius: "50px", margin: "2rem" }}
              ></Skeleton.Input>
            </Col>
            <Col>
              <Skeleton.Input
                style={{ width: "70px", borderRadius: "50px", margin: "2rem" }}
              ></Skeleton.Input>
            </Col>
          </Row>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <Col md={12} sm={8} style={{ padding: "1rem", margin: "1rem" }}>
            <Carousel
              swipeable={false}
              draggable={false}
              responsive={responsive}
              infinite={true}
              autoPlay={true}
              renderButtonGroupOutside={true}
              arrows={false}
            >
              {posts.map((post) => (
                <Button
                  key={post.id}
                  style={{
                    borderRadius: "50px",
                    backgroundColor: "whitesmoke",
                    border: "none",
                  }}
                  onClick={() => fetchData(post.category)}
                >
                  {post.category}
                </Button>
              ))}
            </Carousel>
          </Col>
        )}
      </Row>

      <Row
        hidden={show}
        justify="space-around"
        align="middle"
        style={{ margin: "1rem" }}
        className="carousel__header"
      >
        <Col>
          <Image src={a2} width="250px" alt="shoes_img" />
        </Col>
        <Col>
          <Image src={a4} width="250px" alt="shoes_img" />
        </Col>
        <Col>
          <Image src={a3} width="250px" alt="shoes_img" />
        </Col>
        <Col>
          <Image src={a3} width="250px" alt="shoes_img" />
        </Col>
      </Row>
      <Carousel
        swipeable={false}
        draggable={false}
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        renderButtonGroupOutside={true}
        arrows={false}
      >
        {cats.map((product) => (
          <Row justify="space-around" align="middle">
            <Col>
              <Card
                style={{ width: "200px" }}
                cover={<img alt="sjdksjdl" src={product.image} />}
              >
                <Meta title={product.product_name} description={product.shop} />
                <Title level={5}>{product.price}</Title>
              </Card>
            </Col>
          </Row>
        ))}
      </Carousel>
    </>
  );
}
