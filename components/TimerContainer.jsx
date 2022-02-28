import React from "react";
import { useState, useEffect } from "react";
import Timer from "./src/components/Timer";

const TimerContainer = (props) => {
  const { initialMinutes, initialSeconds, setOutOfTime } = props;
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
          setOutOfTime(true);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => {
      clearInterval(myInterval);
    };
  }, [minutes, seconds, setOutOfTime]);

  return <Timer minutes={minutes} seconds={seconds} />;
};

export default TimerContainer;
