import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveProduct } from "../../_actions/productActions";
import { CaretRightOutlined, UploadOutlined } from "@ant-design/icons";

import {
  Row,
  Col,
  Typography,
  Form,
  Input,
  Button,
  Select,
  message,
  Upload,
  Card
} from "antd";



const { Title, Text } = Typography;
const { Option } = Select;

export default function AddProduct(props) {
  const [name, setName] = useState("");
  const [shop, setShop] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const productSave = useSelector((state) => state.productSave);
  // const { loading, products, error } = productSave;
  const dispatch = useDispatch();

  const prop = {
    name: "file",
    listType: "picture",
    action: "/upload",
    beforeUpload(file) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const img = document.createElement("img");
          img.src = reader.result;
          img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            ctx.fillStyle = "red";
            ctx.textBaseline = "middle";
            ctx.font = "33px Arial";
            canvas.toBlob(resolve);
          };
        };
      });
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
        // dispatch(saveProduct(name, shop, price, image, description));
      }
      if (info.file.status === "done") {
        setImage("/" + info.file.name);
        message.success(`${info.file.name}`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed`);
      }
    },
  };

  //   useEffect(() => {
  //     if (userInfo)
  //       return () => {
  //         props.history.push("/");
  //       };
  //   }, [userInfo]);

  const productAdd = (e) => {
    e.preventDefault();
    dispatch(saveProduct(name, shop, price, image, category, description));
    message.success("Product added succefully");
    setTimeout(() => {
      props.history.push("/produc/manage");
    }, 2000);
  };

  return (
    <Row justify="space-around" align="middle" style={{ marginTop: "40px" }}>
       <Card style={{width:"25rem"}}>
         <Title level={3}>
           Add product
         </Title>
 
        <Form layout="vertical" size="large" encType="multipart/form-data">
          <Form.Item
            required
            id="name"
            name="name"
            value={name}
            rules={[{ message: "Enter item name", value: { name } }]}
            onChange={(e) => setName(e.target.value)}
          >
            <Input prefix={<CaretRightOutlined />} placeholder="Item name" />
          </Form.Item>
          <Form.Item
            name="Price"
            name="price"
            value={price}
            rules={[{ message: "Enter Item price" }]}
            onChange={(e) => setPrice(e.target.value)}
          >
            <Input prefix={<CaretRightOutlined />} placeholder="Enter price e.g 2030" />
          </Form.Item>
          <Form.Item
            id="shop"
            name="shop"
            value={shop}
            rules={[{ message: "Enter shop" }]}
            onChange={(e) => setShop(e.target.value)}
          >
            <Input prefix={<CaretRightOutlined />} placeholder="Shop name" />
          </Form.Item>

          <Form.Item
            name="category"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            rules={[{ message: "Enter image" }]}
          >
            <Input prefix={<CaretRightOutlined style={{backgroundColor:"whitesmoke"}} />} placeholder="shoes, shirt, kitchen" />
          </Form.Item>
          <Form.Item
            name="description"
            id="description"
            value={description}
            rules={[{ message: "Enter description" }]}
            onChange={(e) => setDescription(e.target.value)}
          >
            <Input.TextArea placeholder="Description" />
          </Form.Item>
          <Form.Item>
            <Upload {...prop}>
              <Button icon={<UploadOutlined style={{backgroundColor:"whitesmoke"}} />}>Select image</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button block htmlType="submit" type="primary" onClick={productAdd}>
              Add
            </Button>
          </Form.Item>


        </Form>

       </Card>
    </Row>
  );
}
