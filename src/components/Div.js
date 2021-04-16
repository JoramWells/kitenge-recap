import React from "react";
import ReactPlayer from "react-player";
import { Col, Row, Typography, Button } from "antd";

const { Title } = Typography;

export default function Div() {
  return (
    <div style={{ padding: "20px",textAlign:"center" }}>
      <Row>
        <Col span={12} style={{paddingTop:"40px"}}>
          <Title level={2}>
            We sell traditional african clothes in affordable prices.
          </Title>
          <Title level={4}>
            Discover the pride and heritage of new african products.
          </Title>
          <Row justify="space-around" align="middle">
            <Col >
              <Button style={{marginTop:"50px", borderRadius:"50px",border:"0"}}>Shop from our market</Button>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <ReactPlayer
            autoplay
            muted={true}
            url="https://playback-wholesale.s3.amazonaws.com/banner_videos/home.mov"
          />
        </Col>
      </Row>
    </div>
  );
}
