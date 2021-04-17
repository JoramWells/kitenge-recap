import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { paymentDetails } from "../../_actions/paymentActions";
import { Table, Row, Col, Skeleton, Empty } from "antd";
const columns = [
  {
    title: "Amount (ksh)",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "receipt",
    dataIndex: "receipt",
    key: "receipt",
  },
  {
    title: "phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "date",
    dataIndex: "date",
    key: "date",
  },
];

export default function Payments() {
  const PaymentList = useSelector((state) => state.paymentList);
  const { loading, payments, error } = PaymentList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(paymentDetails());
    return () => {};
  }, []);
  return (
    <div>
      {loading ? (
        <>
          <Row style={{ margin: "1rem" }} justify="space-around" align="middle">
            <Col>
              <Skeleton.Input style={{ width: "200px" }}></Skeleton.Input>
            </Col>
            <Col>
              <Skeleton.Input style={{ width: "200px" }}></Skeleton.Input>
            </Col>
            <Col>
              <Skeleton.Input style={{ width: "200px" }}></Skeleton.Input>
            </Col>
            <Col>
              <Skeleton.Input style={{ width: "200px" }}></Skeleton.Input>
            </Col>
          </Row>
          <Row style={{ margin: "1rem" }} justify="space-around" align="middle">
            <Col>
              <Skeleton.Input style={{ width: "200px" }}></Skeleton.Input>
            </Col>
            <Col>
              <Skeleton.Input style={{ width: "200px" }}></Skeleton.Input>
            </Col>
            <Col>
              <Skeleton.Input style={{ width: "200px" }}></Skeleton.Input>
            </Col>
            <Col>
              <Skeleton.Input style={{ width: "200px" }}></Skeleton.Input>
            </Col>
          </Row>
          <Row style={{ margin: "1rem" }} justify="space-around" align="middle">
            <Col>
              <Skeleton.Input style={{ width: "200px" }}></Skeleton.Input>
            </Col>
            <Col>
              <Skeleton.Input style={{ width: "200px" }}></Skeleton.Input>
            </Col>
            <Col>
              <Skeleton.Input style={{ width: "200px" }}></Skeleton.Input>
            </Col>
            <Col>
              <Skeleton.Input style={{ width: "200px" }}></Skeleton.Input>
            </Col>
          </Row>
          <Row style={{ margin: "1rem" }} justify="space-around" align="middle">
            <Col>
              <Skeleton.Input style={{ width: "200px" }}></Skeleton.Input>
            </Col>
            <Col>
              <Skeleton.Input style={{ width: "200px" }}></Skeleton.Input>
            </Col>
            <Col>
              <Skeleton.Input style={{ width: "200px" }}></Skeleton.Input>
            </Col>
            <Col>
              <Skeleton.Input style={{ width: "200px" }}></Skeleton.Input>
            </Col>
          </Row>
          <Row style={{ margin: "1rem" }} justify="space-around" align="middle">
            <Col>
              <Skeleton.Input style={{ width: "200px" }}></Skeleton.Input>
            </Col>
            <Col>
              <Skeleton.Input style={{ width: "200px" }}></Skeleton.Input>
            </Col>
            <Col>
              <Skeleton.Input style={{ width: "200px" }}></Skeleton.Input>
            </Col>
            <Col>
              <Skeleton.Input style={{ width: "200px" }}></Skeleton.Input>
            </Col>
          </Row>
        </>
      ) : error ? (
        <Row justify="space-around" align="middle" style={{ padding: "2rem" }}>
          <Col>
            <Empty description={error} />
          </Col>
        </Row>
      ) : (
        <Row justify="space-around" align="middle" style={{ margin: "2rem" }}>
          <Col>
            <Table dataSource={payments} columns={columns}></Table>
          </Col>
        </Row>
      )}
    </div>
  );
}
