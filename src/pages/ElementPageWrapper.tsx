import React from "react";
import { BreadcrumbsLine } from "../components/BreadcrumbsLine/BreadcrumbsLine";
import { Outlet, useParams } from "react-router-dom";

const ElementPageWrapper = () => {
  const params = useParams();
  return (
    <>
      <BreadcrumbsLine id={params.id} />
      <Outlet />
    </>
  );
};

export default ElementPageWrapper;
