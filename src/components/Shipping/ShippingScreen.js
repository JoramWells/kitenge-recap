import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Typography,
  Button,
  Descriptions,
  message,
  Space,
  Table,
  Image
} from "antd";
import { confirmPayment, makePayment } from "../../_actions/paymentActions";
import { useEffect } from "react";

const columns = [
  {
    title: "Product",
    dataIndex: "product_name",
    key: "product_name",
  },
  {
    title: "image",
    dataIndex: "image",
    key: "image",
    render: (img) => (
      <Image src={img} alt="image file" style={{ width: "50px" }} />
    ),
  },
  {
    title: "qty",
    dataIndex: "qty",
    key: "qty",
  },

  {
    title: "Address",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "price",
    dataIndex: "price",
    key: "price",
  },
];

const { Title, Text } = Typography;
const Cookie = require("js-cookie");

export default function ShippingScreen() {
  const userSignin = useSelector((state) => state.userSignin);
  const paymentDetail = useSelector((state) => state.payment);
  let qt = "";
  const[payment,setPayment] = useState([])
  const { loading, paymentDetails, error } = paymentDetail;
  const confirmDetails = useSelector((state) => state.confirmDetails);
  const {
    loadingDetails,
    confirmPaymentDetails,
    errorDetails,
  } = confirmDetails;
  
  const payDetail = Cookie.getJSON("paymentDetails");  
  // const {} = confirmPayment;
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();

  const confirmPay =  () => {
    {loading ?(message.info('loading...')): error?(message.warn('error')):(
      // await dispatch(confirmPayment(paymentDetails.CheckoutrequestID))
      console.log("pays " + paymentDetails)
      
    )}

  };
  console.log(payment)
  const paymentHandler =async(e) => {
    e.preventDefault()
     await dispatch(makePayment("+254799980846", 1)); 
    //  setTimeout( ()=>{
    //    dispatch(confirmPayment(paymentDetails.CheckoutRequestID))

    // },2000)   

  };
  // if(!payDetail){
  // }else{
  //   setTimeout( async()=>{
  //     await dispatch(confirmPayment(paymentDetails.CheckoutrequestID))

  //   },1000)

  //   message.success('Finished..')

  // }
  useEffect(() => {
          confirmPay()

    console.log(payDetail)
    return () => {
      
    }
  }, [])



  // if (payDetail) {
  //   message.info(payDetail.ResponseDescription);
  //   setTimeout(() => {
  //      dispatch(confirmPay(payDetail.CheckoutRequestID));
  //   }, 2000);
  // }
  // const confirmPaid = Cookie.getJSON("confirmPaid");
  // if(confirmPaid){
    
  // }




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
          <Table columns={columns} dataSource={cartItems} />
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
            onClick={paymentHandler}
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
