import React, { useState, useEffect, useRef } from "react";
import { interval, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import "./App.css";
import Timer from "./components/Display/Display";
import Buttons from "./components/Buttons/Buttons";

function App() {
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);


  useEffect(() => {
    const unsubscribe = new Subject();
    const observable$ = interval(1000)
      .pipe(takeUntil(unsubscribe))
      .subscribe(() => {
        if (timerOn) {
          setTime((el) => el + 1);
        }
      });

    return () => {
      unsubscribe.next();
      unsubscribe.complete();
    };
  }, [timerOn]);

  return (
    <div className="App">
      <main className="main-content">
        <section className="stop-watch">
          <Timer time={time} />
        </section>
        <section className="buttons">
          <Buttons
            setTimerOn={setTimerOn}
            setTime={setTime}
            timerOn={timerOn}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
