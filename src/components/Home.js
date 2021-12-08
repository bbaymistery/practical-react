import React from "react";
import FeaturedProducts from "./FeaturedProducts/FeaturedProducts";
import Footer from "./Footer/Footer";
import ComfortZone from "./HomeComfortZone/ComfortZone";
import Services from "./Services/Services";
import Contact from "./Contact/Contact";

const Home = () => {
  return (
    <div>
      <ComfortZone />
      <FeaturedProducts />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
