import React from "react";
import ServiceDetails from "../../components/ServiceFolder/SingleServiceContent/ServiceDetails";
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
 
  const userId = data?.userId;
  
console.log(id,"from service")
  return (
    <main className="py-2 pb-10">
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
           
              <ServiceDetails data={data} id={id} userId={userId} />
            
          </div>
        )}
      </div>
    </main>
  );
};

export default Service;
