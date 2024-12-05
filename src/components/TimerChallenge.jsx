import {useRef, useState} from "react";
import ResultModal from "./ResultModal.jsx";

export default function ({title, targetTime}) {
    const targetTimeInMillis = targetTime * 1000;

    const timer = useRef();
    const dialog = useRef();

    const [timeRemaining, setTimeRemaining] = useState(targetTimeInMillis);

    const isTimerActive = timeRemaining > 0 && timeRemaining < targetTimeInMillis;

    if (timeRemaining <= 0) {
        clearInterval(timer.current);
        setTimeRemaining(targetTimeInMillis);
        dialog.current.open();
    }

    function handleStart() {
        timer.current = setInterval(() => {
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10);
        }, 10);
    }

    function handleStop() {
        dialog.current.open();
        clearInterval(timer.current);
    }

    return (
        <>
            <ResultModal ref={dialog} targetTime={targetTime} result="lost"/>
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={isTimerActive ? handleStop : handleStart}>
                        {isTimerActive ? 'Stop' : 'Start'} Challenge
                    </button>
                </p>
                <p className={isTimerActive ? 'active' : undefined}>
                    {isTimerActive ? 'Time is running' : 'Time inactive'}
                </p>
            </section>
        </>
    );
}
