import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import App from "./app/App";
import { setupAxios } from "./redux/setupAxios";
import { SplashScreenProvider } from "./components";
import store from "./redux/store";
import "./_assets/sass/style.scss";

setupAxios(axios, store);

ReactDOM.render(
  <SplashScreenProvider>
    <App store={store} />
  </SplashScreenProvider>,
  document.getElementById("root")
);
