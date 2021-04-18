import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveProduct } from "../../_actions/productActions";
import { UploadOutlined } from "@ant-design/icons";

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
       <Card>
       <Title level={3} style={{ textAlign: "center" }}>
          Add product
        </Title>
        <Form layout="vertical" name="basic" encType="multipart/form-data">
          <Form.Item
            required
            id="name"
            label="Item name"
            name="name"
            value={name}
            rules={[{ message: "Enter item name", value: { name } }]}
            onChange={(e) => setName(e.target.value)}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Price"
            label="price"
            name="price"
            value={price}
            rules={[{ message: "Enter Item price" }]}
            onChange={(e) => setPrice(e.target.value)}
          >
            <Input />
          </Form.Item>
          <Form.Item
            id="shop"
            label="Online shop"
            name="shop"
            value={shop}
            rules={[{ message: "Enter shop" }]}
            onChange={(e) => setShop(e.target.value)}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="category"
            label="category"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            rules={[{ message: "Enter image" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="description"
            id="description"
            value={description}
            rules={[{ message: "Enter description" }]}
            onChange={(e) => setDescription(e.target.value)}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Upload {...prop}>
              <Button icon={<UploadOutlined />}>Upload Item</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary" onClick={productAdd}>
              Add
            </Button>
          </Form.Item>

          <Row>
            <Col span={12}>
              <Link to="/login" variant="body2" style={{ color: "#3b3c36" }}>
                Already have an account? Sign in
              </Link>
            </Col>
          </Row>
        </Form>

       </Card>
    </Row>
  );
}
