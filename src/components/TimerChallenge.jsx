import {useRef, useState} from "react";
import ResultModal from "./ResultModal.jsx";

export default function ({title, targetTime}) {
    const timer = useRef();
    const dialog = useRef();

    const [timerStarted, setTimerStarted] = useState(false);

    function handleStart() {
        timer.current = setTimeout(() => {
            dialog.current.showModal();
        }, targetTime * 1000);
        setTimerStarted(true);
    }

    function handleStop() {
        clearTimeout(timer.current);
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
                    <button onClick={timerStarted ? handleStop : handleStart}>
                        {timerStarted ? 'Stop' : 'Start'} Challenge
                    </button>
                </p>
                <p className="">
                    {timerStarted ? 'Time is running' : 'Time inactive'}
                </p>
            </section>
        </>
    );
}
