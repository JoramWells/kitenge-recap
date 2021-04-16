import React from "react";
import CarouselItems from "./Desktop/CarouselItems";
import CarouselItem from "./MobileView/CarouselItem";

export default function DesktopMobile() {
  return (
    <>
      <div className="mobile__carousel">
        <CarouselItem />
      </div>
      <div className="desktop__carousel">
        <CarouselItems />
      </div>
    </>
  );
}
