"use client";

import Home from "./components/Home";
import Loader from "./components/Loader";
import { useLoading } from "./context/LoadingProvider";

const Page = () => {
  const { loading } = useLoading();

  return <>{!loading.animated ? <Loader /> : <Home />}</>;
};

export default Page;
