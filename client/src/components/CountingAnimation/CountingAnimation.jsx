import React, { useEffect, useState } from 'react';

const CountingAnimation = ({ targetNumber }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prevCount => prevCount + 1);
    }, 10); // Adjust the interval to control the speed of the animation
    console.log(targetNumber,"jkiijnekdek")
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
