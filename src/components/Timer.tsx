import { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import useAudio from "@/hooks/useAudio";
import {
  PlusIcon,
  MinusIcon,
  ResetIcon,
  PauseIcon,
  PlayIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <Card className="group absolute right-4 top-4 z-10 select-none">
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row items-center gap-4">
            <Button size="icon" onClick={handleIncreaseTimer}>
              <PlusIcon />
            </Button>
            {minutes}:
            {seconds === 0 ? "00" : seconds < 10 ? `0${seconds}` : seconds}
            <Button size="icon" onClick={handleDecreaseTimer}>
              <MinusIcon />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row justify-center gap-2">
          <Button
            size="icon"
            onClick={handleOnRestart}
            disabled={totalSeconds === timestampOffset.offset}
          >
            <ResetIcon />
          </Button>
          {isRunning ? (
            <Button size="icon" onClick={handleOnPause}>
              <PauseIcon />
            </Button>
          ) : (
            <Button size="icon" onClick={handleOnStart}>
              <PlayIcon />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Timer;
