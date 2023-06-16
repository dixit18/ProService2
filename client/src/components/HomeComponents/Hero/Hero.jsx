/* eslint-disable react/react-in-jsx-scope */
import { Link as NavLink } from "react-router-dom";

const Hero = () => {
  return (
    <div className="container mx-auto max-w-7xl">
      <div className="flex flex-col md:flex-row py-20 md:py-28 items-center justify-center space-y-10 md:space-y-0">
        <div className="flex-1 space-y-5 md:space-y-10">
          <h1 className="font-semibold text-3xl sm:text-4xl lg:text-6xl leading-tight">
            <span className="relative">
              Home Service,
              <div className="absolute w-full h-30% bg-gray-400 bottom-1 left-0 z-0"></div>
            </span>
            <br />
            <span className="text-gray-400">On Demand!</span>
          </h1>
          <p className="text-gray-500">
         
ProService is a convenient platform connecting users with local service providers. Find skilled professionals for various services such as plumbing, electrical work, gardening, and more. Enjoy top-quality services at competitive prices.
          </p>
          <div className="space-x-6 flex flex-col sm:flex-row">

            <NavLink
              to="/services"
              className="rounded-full py-3 px-6 text-white bg-gray-500 hover:bg-gray transition-colors"
            >
              Get started
            </NavLink>
          </div>
        </div>
        <div className="flex-1 relative w-full">
          <div className="absolute w-150% h-150% bg-gray-200 top--20 left-0 z-0"></div>
          <div className="relative h-300 rounded-2xl shadow-2xl overflow-hidden">
            <button className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
             
            </button>
            <img
              className="w-full h-full object-cover"
              src="https://res.cloudinary.com/dvy5v1l8h/image/upload/v1686721959/Images/kkh3d7mx0wskxxc5lepy.jpg"
              alt="Hero Image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
