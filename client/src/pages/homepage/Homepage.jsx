/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import Hero from "../../components/HomeComponents/Hero/Hero";
import Slides from "../../components/Slides/Slides";
import SingleCard from "../../components/HomeComponents/Services/SingleCard/SingleCard";
import Features from "../../components/HomeComponents/Features/Features";
import { cards, projectsCards, testimonyData } from "../../data/data";
import Marketplace from "../../components/HomeComponents/Marketplace/Marketplace";
import Business from "../../components/HomeComponents/Business/Business";
import Testimony from "../../components/HomeComponents/Testimony/Testimony";
import Projects from "../../components/HomeComponents/Projects/Projects";
import { useQuery } from "@tanstack/react-query";
import { Axios } from "../../config";
import requests from "../../libs/request";
import loader from "../../assets/icons/loader.svg";
import FAQ from "../../components/HomeComponents/FAQ/FAQ";

const Homepage = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["services"],
    queryFn: () => Axios.get(requests.services).then((res) => res.data.services),
  });

  return (
    <main>
      <Hero />
      
   
      <Marketplace />
      <Features />
      <Business />
 
      <FAQ/>
  
    </main>
  );
};

export default Homepage;
