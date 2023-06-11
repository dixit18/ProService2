import React, { useState, useEffect } from "react";
import image1 from "../../../assets/images/hero1.png";
import image2 from "../../../assets/images/hero2.png";
import image3 from "../../../assets/images/hero3.png";
import image4 from "../../../assets/images/hero4.png";
import image5 from "../../../assets/images/hero5.png";
import image6 from "../../../assets/images/hero6.png";

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showOpacityAnimation, setShowOpacityAnimation] = useState(false);

  const changeImage = [image1, image2, image3, image4, image5, image6];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === changeImage.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Show opacity animation for 3 seconds when the image changes
    setShowOpacityAnimation(true);
    const opacityAnimationTimeoutId = setTimeout(() => {
      setShowOpacityAnimation(false);
    }, 1000);

    return () => clearTimeout(opacityAnimationTimeoutId);
  }, [currentImageIndex]);

  const heroStyle = {
    backgroundImage: `url(${changeImage[currentImageIndex]})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <section
      className="w-full h-screen lg:h-[120vh] text-white pt-20 relative"
      style={heroStyle}
    >
      <div className="contain flex flex-col items-start justify-center h-full relative z-10">
        <div className="flex flex-col items-start justify-start gap-5 w-full">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-semibold leading-[120%]">
            Home Service <i className="font-light">On Demand</i> <br />{" "}
          </h2>
          <div className="flex items-center gap-5 sm:flex-wrap sm:flex-col font-weight:600">
            <span>
              Relocated or stuck in the middle of nowhere without an idea of
              where to find artisans to fix your urgent task?
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
