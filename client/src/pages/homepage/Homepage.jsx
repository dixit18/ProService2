/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import Hero from "../../components/HomeComponents/Hero/Hero";
import Features from "../../components/HomeComponents/Features/Features";
import Marketplace from "../../components/HomeComponents/Marketplace/Marketplace";
import Business from "../../components/HomeComponents/Business/Business";
import FAQ from "../../components/HomeComponents/FAQ/FAQ";

const Homepage = () => {
  

  return (
    <main>
      <Hero />

      <Marketplace />
      <Features />
      <Business />

      <FAQ />
    </main>
  );
};

export default Homepage;
