import React, { Suspense, lazy } from "react";
import "./App.css";
import { Spin, Row, Col } from "antd";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import Footer from "./components/Footer";
import Top from "./components/Top";
import PaymentScreen from "./components/Shipping/PaymentScreen";
import PlaceOrderScreen from "./components/Shipping/PlaceOrderScreen";
import NavigationResponsive from "./components/NavigationResponsive";
import Payments from "./components/Payments/Payments";
const ManageProducts = lazy(() =>
  import("./components/Product/ManageProducts")
);
const ShippingScreen = lazy(() =>
  import("./components/Shipping/ShippingScreen")
);

const AddProduct = lazy(() => import("./components/Product/AddProduct"));
const ProductDetail = lazy(() => import("./components/Product/ProductDetail"));
const Register = lazy(() => import("./components/Login/Register"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const Checkout = lazy(() => import("./components/Checkout/Checkout"));
const Login = lazy(() => import("./components/Login/Login"));
const HomeRoutes = lazy(() => import("./components/HomeRoutes"));
const CartScreen = lazy(() => import("./components/CartScreen"));

function App() {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <div>
      <Top />
      <NavigationResponsive />

      <Suspense
        fallback={
          <Row justify="space-around" align="middle">
            <Col>
              <Spin indicator={antIcon} />
            </Col>
          </Row>
        }
      >
        <Router>
          <Switch>
            <Route path="/" exact component={HomeRoutes} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/shipping" exact component={ShippingScreen} />
            <Route path="/payment" exact component={PaymentScreen} />
            <Route path="/placeorder" exact component={PlaceOrderScreen} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/checkout" exact component={Checkout} />
            <Route path="/payments" exact component={Payments} />

            <Route
              path="/product-detail/:id?"
              exact
              component={ProductDetail}
            />
            <Route path="/products/add" exact component={AddProduct} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/produc/manage" exact component={ManageProducts} />
          </Switch>
        </Router>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
