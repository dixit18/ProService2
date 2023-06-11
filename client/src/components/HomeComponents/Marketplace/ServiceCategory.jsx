/* eslint-disable react/no-unknown-property */
import React from "react";

const ServiceCategories = () => {
  return (
    <div className="container mx-auto w-1008px">
      <div className="flex flex-wrap">
        <div className="w-1/2 md:w-1/3 lg:w-1/4 p-4">
          <div className="flex items-center">
            <img
              className="w-12 h-12 mr-2"
              src="https://res.cloudinary.com/urbanclap/image/upload/q_auto,f_auto,fl_progressive:steep,w_64/t_high_res_template/images/growth/home-screen/1609757635235-1a139e.png"
              alt=""
              loading="eager"
             
            />
            <span className="text-lg">Salon for Women</span>
          </div>
        </div>
        <div className="w-1/2 md:w-1/3 lg:w-1/4 p-4">
          <div className="flex items-center">
            <img
              className="w-12 h-12 mr-2"
              src="https://res.cloudinary.com/urbanclap/image/upload/q_auto,f_auto,fl_progressive:steep,w_64/t_high_res_template/images/growth/home-screen/1629973621437-ce5af9.png"
              alt=""
              loading="eager"
            
            />
            <span className="text-lg">Hair services for Women</span>
          </div>
        </div>
        {/* Add more categories here */}
      </div>
      <div className="flex flex-wrap">
        <div className="w-1/2 md:w-1/3 lg:w-1/4 p-4">
          <div className="flex items-center">
            <img
              className="w-12 h-12 mr-2"
              src="https://res.cloudinary.com/urbanclap/image/upload/q_auto,f_auto,fl_progressive:steep,w_64/t_high_res_template/categories/category_v2/category_6b1f5250.png"
              alt=""
              loading="eager"
              fetchpriority="high"
            />
            <span className="text-lg">Cleaning & Pest Control</span>
          </div>
        </div>
        <div className="w-1/2 md:w-1/3 lg:w-1/4 p-4">
          <div className="flex items-center">
            <img
              className="w-12 h-12 mr-2"
              src="https://res.cloudinary.com/urbanclap/image/upload/q_auto,f_auto,fl_progressive:steep,w_64/t_high_res_template/categories/category_v2/category_07f29980.jpeg"
              alt=""
              loading="eager"
              fetchpriority="high"
            />
            <span className="text-lg">Electricians</span>
          </div>
        </div>
        {/* Add more categories here */}
      </div>
    </div>
  );
};

export default ServiceCategories;
