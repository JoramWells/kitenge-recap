import React,{lazy} from "react";
const CarouselItem = lazy(() => import("./MobileView/CarouselItem"));
const CarouselItems = lazy(() => import("./Desktop/CarouselItems"));



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
