import React from "react";

const Home = () => {
  return (
    <>
      <main className="w-[90%] max-w-[1440px] mx-auto">
        <div className="mx-auto mt-20 text-center">
          <p className="text-sm">ACHIEVE YOUR FITNESS GOALS</p>
          <h1
            style={{
              lineHeight: 1,
            }}
            className="text-[7rem] font-bebas-neue"
          >
            FIND YOUR STRENGTH
          </h1>
        </div>
        <div className="mx-auto mt-10 max-w-[1024px] h-[512px] rounded-xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1584863231364-2edc166de576?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Hero Image"
            className="object-cover object-center h-full w-full"
          />
        </div>
      </main>
    </>
  );
};

export default Home;
