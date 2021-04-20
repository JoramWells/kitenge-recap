import React, { lazy } from "react";
// const DesktopMobile = lazy(() => import("./DesktopMobile"));
// const RecentItemsBar = lazy(() => import("./RecentItemsBar"));
// const CarouselHeader = lazy(() => import("./Desktop/CarouselHeader"));
import CarouselHeader from './Desktop/CarouselHeader'
import RecentItemsBar from './RecentItemsBar'
import DesktopMobile from './DesktopMobile'

export default function HomeRoutes() {
  return (
    <>
      <CarouselHeader />
      {/* <RecentItemsBar title="Available Now!!"  /> */}
      <DesktopMobile />
    </>
  );
}
