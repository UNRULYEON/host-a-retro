import { ReactNode, useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import useAudio from "@/hooks/useAudio";

const Timer = () => {
  const {
    isPlaying: isPlayingChime,
    play: playChime,
    pause: pauseChime,
  } = useAudio("/headspace-softchime.mp3");
  const [timestampOffset, setTimestampOffset] = useState({
    offset: 300,
    mutated: new Date(),
  });
  const { seconds, minutes, isRunning, totalSeconds, pause, start, restart } =
    useTimer({
      expiryTimestamp: new Date(),
    });

  const handleIncreaseTimer = () => {
    setTimestampOffset((prev) => ({ ...prev, offset: prev.offset + 60 }));
  };

  const handleDecreaseTimer = () => {
    if (timestampOffset.offset === 60) return;

    setTimestampOffset((prev) => ({ ...prev, offset: prev.offset - 60 }));
  };

  const handleOnRestart = () => {
    setTimestampOffset({ offset: timestampOffset.offset, mutated: new Date() });
  };

  const handleOnPause = () => {
    pause();
  };

  const handleOnStart = () => {
    start();
  };

  useEffect(() => {
    const newExpiryTimestamp = new Date();
    newExpiryTimestamp.setSeconds(
      newExpiryTimestamp.getSeconds() + timestampOffset.offset,
    );

    restart(newExpiryTimestamp, false);
  }, [timestampOffset]);

  useEffect(() => {
    if (totalSeconds === 0 && !isRunning) {
      playChime();
    } else if (isPlayingChime) {
      pauseChime();
    }
  }, [totalSeconds, isRunning]);

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.code) {
      case "ArrowUp":
        handleIncreaseTimer();
        break;
      case "ArrowDown":
        handleDecreaseTimer();
        break;
      case "Space":
        if (isRunning) {
          handleOnPause();
        } else {
          handleOnStart();
        }
        break;
      case "KeyR":
        handleOnRestart();
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown, false);
  }, [timestampOffset, isRunning]);

  return (
    <div className="group absolute right-4 top-4 z-10 flex select-none flex-col gap-2 rounded-lg border-2 border-neutral-500 p-3 text-neutral-500 transition-all ease-in-out hover:border-neutral-300">
      <div className="flex items-center gap-2 text-2xl transition-all ease-in-out group-hover:text-neutral-300">
        <AdjustTimerButton onClick={handleIncreaseTimer}>+</AdjustTimerButton>
        <div
          className={`transition-all ease-in-out group-hover:text-neutral-300 ${
            isRunning ? "text-neutral-300" : "text-neutral-500"
          }`}
        >
          {minutes}:
          {seconds === 0 ? "00" : seconds < 10 ? `0${seconds}` : seconds}
        </div>
        <AdjustTimerButton onClick={handleDecreaseTimer}>-</AdjustTimerButton>
      </div>
      <div className="flex justify-between transition-all ease-in-out group-hover:text-neutral-300">
        <TimerActions
          onClick={handleOnRestart}
          disabled={totalSeconds === timestampOffset.offset}
        >
          Restart
        </TimerActions>
        {isRunning ? (
          <TimerActions onClick={handleOnPause}>Pause</TimerActions>
        ) : (
          <TimerActions onClick={handleOnStart}>Start</TimerActions>
        )}
      </div>
    </div>
  );
};

type AdjustTimerButtonProps = {
  onClick: () => void;
  children: ReactNode;
};

const AdjustTimerButton = ({ onClick, children }: AdjustTimerButtonProps) => (
  <button
    onClick={onClick}
    className="flex aspect-square h-6 items-center justify-center rounded-full border-2 border-neutral-500 text-xs font-bold transition-all ease-in-out group-hover:border-neutral-300 group-hover:text-neutral-300"
  >
    {children}
  </button>
);

type TimerActionsProps = {
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
};

const TimerActions = ({ onClick, disabled, children }: TimerActionsProps) => (
  <button
    onClick={onClick}
    className={`text-xs font-bold uppercase transition-all ease-in-out ${
      disabled ? "opacity-50" : ""
    }`}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Timer;
