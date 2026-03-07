"use client";

import { useState } from "react";
import Home from "./components/Home";
import Loader from "./components/Loader";

const Page = () => {
  const [isloading, setIsloading] = useState(false);
  return <>{isloading ? <Loader /> : <Home />}</>;
};

export default Page;
