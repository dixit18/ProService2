/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import {
  BsTwitter,
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsPinterest,

} from "react-icons/bs";


const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  const socialIcons = [
    {
      to: "#",
      icon: BsTwitter,
    },
    {
      to: "#",
      icon: BsFacebook,
    },
    {
      to: "#",
      icon: BsLinkedin,
    },
    {
      to: "#",
      icon: BsInstagram,
    },
    {
      to: "#",
      icon: BsPinterest,
    },
  ];
  return (
    <footer className="border-t w-full lg:pb-14 lg:pb-5 pb-3">
      <div className="contain">
        <div className="w-full flex flex-col items-start justify-start gap-10">
          <div className="w-full flex items-center justify-between border-t pt-5 flex-col gap-2 sm:flex-row sm:gap-0">
            <div className="flex items-center justify-start gap-4 flex-col md:flex-row">
              <div className="flex items-end justify-end select-none">
                <h2 className="text-3xl select-none font-black tracking-tighter text-primary">
                  ProService
                </h2>
                <span className="border text-[6px] rounded-full w-3 h-3 flex items-center justify-center">
                  R
                </span>
              </div>
              <p className="text-sm font-medium text-gray-400">
                © ProService International Ltd. {year}
              </p>
            </div>
            <div className="flex items-center justify-end lg:gap-6 flex-col md:flex-row">
              <div className="flex items-center gap-4 text-sm font-medium text-gray-500">
                {socialIcons.map((item, i) => (
                  <a
                    href={item.to}
                    target="_blank"
                    key={i}
                    className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all duration-300 cursor-pointer"
                  >
                    <item.icon size={20} />
                  </a>
                ))}
              </div>
              <div className="flex items-center gap-4 text-sm font-medium text-gray-400">
                <div className="flex items-center gap-2 cursor-pointer"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
