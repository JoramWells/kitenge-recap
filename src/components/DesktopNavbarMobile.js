import React from "react";
import NavMobile from "./MobileView/NavMobile";
import NavigationBar from "./NavigationBar";

export default function DesktopNavbarMobile() {
  return (
    <>
      <div className="mobile__navbar">
        <NavMobile />
      </div>
      <div className="desktop__navbar">
        <NavigationBar />
      </div>
    </>
  );
}
