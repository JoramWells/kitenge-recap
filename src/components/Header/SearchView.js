import React from "react";
import { useSelector } from "react-redux";

export default function SearchView() {
  const CategoryList = useSelector((state) => state.categoryLists);
  const { loading, posts, error } = CategoryList;
  return <div></div>;
}
