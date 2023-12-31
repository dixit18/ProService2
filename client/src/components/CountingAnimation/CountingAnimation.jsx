import React, { useEffect, useState } from 'react';

const CountingAnimation = ({ targetNumber }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prevCount => prevCount + 1);
    }, 1); // Adjust the interval to control the speed of the animation
   
    if (count === targetNumber) {
      
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [count, targetNumber]);

  return <span>{count}</span>
};

export default CountingAnimation;
