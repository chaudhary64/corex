import React from "react";
import Nav from "./components/ui/Nav";

const template = ({ children }) => {
  return (
    <>
      <Nav />
      {children}
    </>
  );
};

export default template;
