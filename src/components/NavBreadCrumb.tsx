import React from "react";
import { IBreadCrumb } from "../types/types";
import { useNavigate } from "react-router-dom";
import { Breadcrumb } from "./Breadcrumb";

export const NavBreadCrumb: React.FC<IBreadCrumb & { disabled?: boolean }> = ({
  name,
  id,
  type = "TOPIC",
  disabled = false,
}) => {
  const navigate = useNavigate();

  return (
    <Breadcrumb
      onClick={() => navigate(`/${type.toLowerCase()}s/${id ?? ""}`)}
      name={name}
      id={id}
      type={type}
      disabled={disabled}
    />
  );
};
