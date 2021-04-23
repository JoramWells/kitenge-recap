import React,{lazy} from "react";
const NavigationBar = lazy(() => import("./NavigationBar"));
const NavMobile = lazy(() => import("./MobileView/NavMobile"));


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
