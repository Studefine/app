import React from "react";
import Text from "../components/Text";
import "../index.css";
// todo fix this page to look nice
const ErrorBoundary = () => {
  return <Text fontSize={"lg"} color={"error"}>Hmm, nem gépeltél el valamit?</Text>;
};

export default ErrorBoundary;
