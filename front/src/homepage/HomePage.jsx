import React from "react";
import Nav from "./components/Nav";
import Home from "./components/Home";
import About from "./components/About";
import Courses from "./components/Courses";
import Reviews from "./components/Reviews";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";

const HomePage = () => {
  const { cn, tc, ro } = useSelector((state) => state.ma);

  return (
    <div className="flex flex-col gap-5 dark:bg-darkMode-dark950">
      <Nav />

      <main>
        <div id="home">
          <Home />
        </div>

        <div id="about">
          <About />
        </div>

        <div id="courses">
          <Courses />
        </div>

        <div id="reviews">
          <Reviews />
        </div>

        {!cn && (
          <div id="contact">
            <Contact />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
