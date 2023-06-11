import React from "react";
import "./Featured.scss";
import picSvg from '../../../public/img/hero.85ac8da0.svg'

function Featured() {
 
  return (
    // <div className="featured">
    //   <div className="container">
    //     <div className="left">
    //       <h1>
    //  Home services , 
    //         on demand.
    //       </h1>
    //       <div className="search">
    //         <div className="searchInput">
    //           <img src="./img/search.png" alt="" />
    //           <input type="text" placeholder='Search for Services' />
    //         </div>
    //         <button>Search</button>
    //       </div>
    //       <div className="popular">
    //         <span>Popular:</span>
    //         <button>Salon for Women </button>
    //         <button>Electicians </button>
    //         <button>Cleaning</button>
    //         <button>Plumbers</button>
    //       </div>
    //     </div>
       
    //   </div>
    // </div>
    <div className="featured">
    <div className="container">
      <div className="left">
        <h1>
         Home Service <span>On Demand</span> 
        </h1>
        <div className="search">
          <div className="searchInput">
            <img className="back-img"src="./img/search.png" alt="" />
       
            <input
              type="text"
              placeholder='Search for Services'
             
            />
          </div>
          <button >Search</button>
        </div>
        <div className="popular">
          <h3>Relocated or stuck in the middle of nowhere without an idea of
            where to find artisans to fix your urgent task? </h3>


        </div>
<h3>Worry less! We got you! .</h3>
      </div>
      <div className="right">
        <img src="./img/man.png" alt="" />
      </div>
    </div>
  </div>
  );
}

export default Featured;
