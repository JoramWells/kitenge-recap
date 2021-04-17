import React from "react";
import NavMobile from "./MobileView/NavMobile";
import NavigationBar from "./NavigationBar";

export default function NavigationResponsive() {
  return (
    <div>
      <div className="desktop__navbar">
        <NavigationBar />
      </div>
      <div className="mobile__navbar">
        <NavMobile />
      </div>
    </div>
  );
}
