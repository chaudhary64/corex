import React from "react";
import Nav from "./components/ui/Nav";
import Footer from "./components/ui/Footer";

const template = ({ children }) => {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
};

export default template;
