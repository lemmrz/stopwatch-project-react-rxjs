import React, { useEffect, useRef } from "react";
import "./Buttons.css";
import { fromEvent } from "rxjs";
import { map, buffer, filter, debounceTime } from "rxjs/operators";

const Buttons = (props) => {
  const { setTimerOn, setTime, timerOn } = props;
  const waitBtnRef = useRef(null);

  //handle wait button double click
  useEffect(() => {
    const click$ = fromEvent(waitBtnRef.current, "click");

    const doubleClick$ = click$.pipe(
      buffer(click$.pipe(debounceTime(300))),
      map((clicks) => clicks.length),
      filter((clicksLength) => clicksLength >= 2)
    );
    doubleClick$.subscribe(() => {
      setTimerOn(false);
    });
    return () => {
      doubleClick$.unsubscribe();
    };
  }, []);

  const handleStart = () => {
    setTimerOn(true);
  };

  const handleStop = () => {
    setTimerOn(false);
    setTime(0);
  };
  const handleReset = () => {
    setTime(0);
  };

  return (
    <div className="btn-container">
      {timerOn ? (
        <button onClick={handleStop} type="button">
          Stop
        </button>
      ) : (
        <button onClick={handleStart} type="button">
          Start
        </button>
      )}

      <button ref={waitBtnRef} type="button">
        Wait
      </button>
      <button onClick={handleReset} type="button">
        Reset
      </button>
    </div>
  );
};

export default Buttons;
