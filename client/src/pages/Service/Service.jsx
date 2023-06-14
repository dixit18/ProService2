import React from "react";
import ServiceDetails from "../../components/ServiceFolder/SingleGigContent/ServiceDetails";
import ServiceOrder from "../../components/ServiceFolder/SingleGigContent/ServiceOrder";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Axios } from "../../config";
import loader from "../../assets/icons/loader.svg";
import requests from "../../libs/request";


const Service = () => {

  
  const { id } = useParams();
  const { isLoading, error, data } = useQuery({
    queryKey: ["service"],
    queryFn: () =>
      Axios.get(`${requests.services}/single/${id}`).then((res) => res.data.service),
     
      
  });
  console.log(error,"outside")
  const userId = data?.userId;
  
console.log(id,"from service")
  return (
    <main className="py-24 pb-10">
      <div className="contain">
        {isLoading ? (
          <div className="flex items-center justify-center w-full">
            <img src={loader} alt="/" className="w-[40px]" />
          </div>
        ) : error ? (
          <p className="text-2xl text-red-400 font-normal">
            Error : Something went wrong
          </p>
        ) : (
          <div className="w-full flex items-start justify-between gap-6 flex-col lg:flex-row">
            <div className="w-full lg:w-[70%]">
              <ServiceDetails data={data} id={id} userId={userId} />
            </div>
            <div className="w-full lg:w-[30%] sticky top-32">
              <ServiceOrder data={data} id={id} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Service;
