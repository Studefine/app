import React from "react";
import { BreadcrumbsLine } from "../components/BreadcrumbsLine/BreadcrumbsLine";
import { Outlet, useParams } from "react-router-dom";

const ElementPageWrapper = () => {
  const params = useParams();

  return (
    <>
      <BreadcrumbsLine id={params.id} />
      <div style={{ padding: 0, margin: 0, height: "calc(100% - 48px)" }}>
        <Outlet />
      </div>
    </>
  );
};

export default ElementPageWrapper;
