import React, { useRef, useState, useEffect } from "react";
import { BiChevronDown } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";
import { Axios } from "../../config";
import loader from "../../assets/icons/loader.svg";
import requests from "../../libs/request";
import { useLocation } from "react-router-dom";
import ServiceCard from "../../components/ServiceFolder/ServiceCard/ServiceCard";
import Pagination from "../../utils/Pagination/Pagination";
import { gujaratCities } from "../../libs/data";
import { useSelector } from "react-redux";

const Services = () => {
  const user = useSelector(state=>state.auth)
  console.log(user,"user from services")
  const { search } = useLocation();
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("sales");
  const minRef = useRef();
  const maxRef = useRef();
  const cityRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCity, setSelectedCity] = useState(user.isLoggedIn ? user.city : "");
  const reSort = (types) => {
    setSort(types);
    setOpen(false);
  };

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["services", currentPage],
    queryFn: () => {
      let url = `${requests.services}${search ? search : "?"}`;

      if (minRef.current.value) {
        url += `&min=${minRef.current.value}`;
      }

      if (maxRef.current.value) {
        url += `&max=${maxRef.current.value}`;
      }
      if (cityRef.current.value) {
        url += `&city=${cityRef.current.value}`;
      }

      url += `&sort=createdAt`; // Sort by newest

      url += `&page=${currentPage}`;

      return Axios.get(url).then((res) => res.data);

    },
  });

  useEffect(() => {
    refetch();
  }, [sort, currentPage]);

  const apply = () => {
    setCurrentPage(1);
    refetch();
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
    setCurrentPage(1);
    refetch();
  };

  return (
    <main className="pt-20 pb-18">
      <div className="contain">
        <div className="flex items-start justify-start flex-col gap-4">
          <p className="text-base font-medium">Find a Service you need</p>
          <div className="w-full  flex md:items-center justify-between flex-col md:flex-row gap-4">
            <div className="flex md:items-center items-start justify-start gap-2 flex-col md:flex-row">
              <p className="text-base font-normal text-gray-500">Budget:</p>
              <div className="flex items-center justify-start gap-2 w-full">
                <input
                  type="text"
                  ref={minRef}
                  placeholder="min"
                  className="border w-[50%] md:w-[150px] outline-none px-2 h-[40px] rounded-md text-gray-500"
                />
                <input
                  type="text"
                  placeholder="max"
                  ref={maxRef}
                  className="border w-[50%] md:w-[150px] outline-none px-2 h-[40px] rounded-md text-gray-500"
                />
                <button
                  onClick={apply}
                  className="w-fit bg-primary text-white text-base font-medium py-2 px-7 outline-none rounded-md hover:bg-primary/95"
                >
                  Apply
                </button>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-end gap-2">
              <p className="text-base font-normal text-gray-500">Sort by:</p>
              <div className="flex items-center justify-start gap-2 cursor-pointer relative">
                <div
                  className="flex items-center justify-start gap-2 cursor-pointer relative  h-[40px] rounded-md text-gray-500 border w-[45%] md:w-fit z-10"
                  onClick={() => setOpen((prev) => !prev)}
                >
                  
                  
              <select
                ref={cityRef}
                className="border outline-none px-2 h-[40px] rounded-md text-gray-500"
                onChange={handleCityChange}
              >
             {user.isLoogedIn ? (
                      // Select the user's city by default
                     
                      <option value={user.city}>{user.city}</option>
                    ) : (
                      // Show a default empty option
                      <option value="">All Cities</option>
                    )}
                    {gujaratCities.map((item, i) => (
                      <option key={i} value={item.value}>
                        {item.text}
                      </option>
                    ))}
              </select>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`py-4 w-full grid-cols-1 sm:grid-cols-2 tab:grid-cols-3 lg:grid-cols-4 items-start justify-start gap-8 ${
              isLoading || error || data?.services?.length === 0
                ? "flex"
                : "grid"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center w-full">
                <img src={loader} alt="/" className="w-[40px]" />
              </div>
            ) : error ? (
              <p className="text-2xl text-red-400 font-normal">
                Error: Something went wrong
              </p>
            ) : (
              <>
                {data?.services?.length === 0 ? (
                  <div className="flex items-center justify-center mt-5 flex-col w-full">
                    <img
                      src="https://cdni.iconscout.com/illustration/premium/thumb/error-404-4344461-3613889.png"
                      alt="/"
                      className="w-[350px]"
                    />
                    <h2 className="text-2xl md:text-4xl font-bold mt-5">
                      No services found
                    </h2>
                    <p className="text-base font-medium mt-3">
                      We couldn't find any services matching your criteria.
                    </p>
                  </div>
                ) : (
                  <>
                    {data?.services?.map((service) => (
                      <ServiceCard key={service._id} item={service} />
                    ))}
                  </>
                )}
              </>
            )}
          </div>

          {data?.pagination.totalPages > 1 && (
            <div style={{ width: "100%" }}>
              <Pagination
                totalPages={data.pagination.totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Services;
