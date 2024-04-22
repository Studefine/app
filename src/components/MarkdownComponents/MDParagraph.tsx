import React from "react";
import { Component, ExtraProps } from "hast-util-to-jsx-runtime/lib/components";

type IMDP = Component<JSX.IntrinsicElements["p"] & ExtraProps>;

const MDParagraph: IMDP = ({ children, ...props }) => {
  return (
    <p className={"customParagraph"} {...props}>
      {children}
    </p>
  );
};

export default MDParagraph;
