import React,{lazy} from "react";
// import CarouselHeader from './Desktop/CarouselHeader'
const DesktopMobile = lazy(() => import("./DesktopMobile"));


export default function HomeRoutes() {
  return (
    <>      
    {/* <CarouselHeader /> */}

      {/* <RecentItemsBar title="Available Now!!"  /> */}
      <DesktopMobile />      

    </>
  );
}
