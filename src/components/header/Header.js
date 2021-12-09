import React from "react";
import SVG from "react-inlinesvg";
import { Link } from "react-router-dom";

// icon
import IconLogo from "../../_assets/icons/logo.svg"

export function Header() {
  return (
    <div className="header">
      <div className="container-fluid d-flex align-items-center justify-content-start">
        <Link to="/movies">
          <SVG src={IconLogo} ></SVG>
        </Link>
      </div>
    </div>
  );
}
