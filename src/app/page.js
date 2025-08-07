import React from "react";
import { FiArrowUpRight } from "react-icons/fi";

const Home = () => {
  return (
    <>
      <main className="w-[90%] max-w-[1440px] mx-auto">
        <section className="mt-10 lg:mt-20">
          <div className="mx-auto text-center">
            <p className="text-sm">ACHIEVE YOUR FITNESS GOALS</p>
            <h1
              style={{
                lineHeight: 1,
              }}
              className="text-7xl lg:text-[7rem] font-bebas-neue"
            >
              FIND YOUR STRENGTH
            </h1>
          </div>
          <div className="mx-auto mt-5 lg:mt-10 max-w-[1024px] lg:h-[512px] rounded-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1584863231364-2edc166de576?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Hero Image"
              className="object-cover object-center h-full w-full"
            />
          </div>
        </section>

        <section className="mt-10 lg:mt-20 lg:w-1/2 mx-auto flex flex-col items-center text-center gap-6">
          <img src="/logo/Star Logo.svg" className="h-20" />
          <div>
            <h3 className="text-6xl font-bebas-neue">Fitness should be </h3>
            <h3 className="text-6xl font-bebas-neue">Accessible to Everyone</h3>
          </div>
          <p>
            CoreX is a modern fitness platform that connects you with top
            trainers, personalized programs, and a community of fitness
            enthusiasts. Whether you're a beginner or an experienced athlete,
            CoreX has something for everyone.
          </p>
          <button className="py-2 px-10 rounded-full cursor-pointer border-2 border-black hover:bg-black hover:text-white transition-colors duration-700">
            Join Now
          </button>
        </section>

        {/* Our Classes */}
        <section className="mt-10 lg:mt-20 flex max-lg:flex-wrap justify-between items-center gap-5 lg:gap-10">
          {/* Left Part */}
          <div className="lg:w-1/2">
            <h5 className="font-bebas-neue text-4xl max-lg:text-center">
              Our Classes
            </h5>
            <p className="mt-2">
              Explore a variety of fitness classes designed for all levels, from
              yoga and pilates to high-intensity interval training (HIIT). Our
              expert trainers will guide you every step of the way.
            </p>
          </div>
          {/* Right Part */}
          <div className="w-full lg:w-1/2">
            {["Men", "Women", "Kids"].map((category) => (
              <div
                key={category}
                className="py-3 flex justify-between items-center font-bold border-b cursor-pointer"
              >
                <span>{category}</span>
                <FiArrowUpRight />
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
