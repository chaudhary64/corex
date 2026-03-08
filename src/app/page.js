"use client";

import { useState } from "react";
import Home from "./components/Home";
import Loader from "./components/Loader";

const Page = () => {
  const [isloading, setIsloading] = useState(true);
  return <>{isloading ? <Loader setIsloading={setIsloading} /> : <Home />}</>;
};

export default Page;
