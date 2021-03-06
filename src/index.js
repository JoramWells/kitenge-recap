import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./store";
import "./NavBar.css";
import { Provider } from "react-redux";
import "react-multi-carousel/lib/styles.css";
import "react-phone-input-2/lib/style.css";
import "react-lazy-load-image-component/src/effects/blur.css";



ReactDOM.hydrate(
      <React.StrictMode>

    <Provider store={store}>
      <App />
    </Provider>

  </React.StrictMode>,
  document.getElementById("root")

);


reportWebVitals();

// function getPosition(position) {
//   console.log(position.coords.latitude, position.coords.longitude);
// }
// if(navigator.geolocation){
//   navigator.geolocation.getCurrentPosition(getPosition);

// }

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
