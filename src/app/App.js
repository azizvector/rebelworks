import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "../app/Routes";
import { LayoutSplashScreen } from "../components";

export default function App({ store }) {
  return (
    <Provider store={store}>
      <React.Suspense fallback={<LayoutSplashScreen />}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </React.Suspense>
    </Provider>
  );
}

