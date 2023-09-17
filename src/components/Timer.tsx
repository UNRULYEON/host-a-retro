import { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import useAudio from "@/hooks/useAudio";
import {
  TimerIcon,
  PlusIcon,
  MinusIcon,
  ResetIcon,
  PauseIcon,
  PlayIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
    <div className="group">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <TimerIcon className="mr-2 h-4 w-4" />
            {minutes}:
            {seconds === 0 ? "00" : seconds < 10 ? `0${seconds}` : seconds}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-50 mr-4 grid grid-cols-2 gap-4">
          <Button variant="ghost" onClick={handleIncreaseTimer}>
            <PlusIcon className="mr-2 h-4 w-4" />
            Increase
          </Button>
          <Button variant="ghost" onClick={handleDecreaseTimer}>
            <MinusIcon className="mr-2 h-4 w-4" />
            Decrease
          </Button>
          <Button
            variant="secondary"
            onClick={handleOnRestart}
            disabled={totalSeconds === timestampOffset.offset}
          >
            <ResetIcon className="mr-2 h-4 w-4" />
            Reset
          </Button>
          {isRunning ? (
            <Button onClick={handleOnPause}>
              <PauseIcon className="mr-2 h-4 w-4" />
              Pause
            </Button>
          ) : (
            <Button onClick={handleOnStart}>
              <PlayIcon className="mr-2 h-4 w-4" />
              Start
            </Button>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Timer;
