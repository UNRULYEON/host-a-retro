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
import { useTimer } from "./TimerProvider";
import { useEffect, useState } from "react";

const Timer = () => {
  const {
    offset,
    setOffset,
    isRunning,

    seconds,
    minutes,
    totalSeconds,

    pause,
    start,
    restart,
  } = useTimer();
  const [renderVisualPing, setRenderVisualPing] = useState(false);

  const handleIncrease = () => {
    setOffset(offset + 60);
  };

  const handleDecrease = () => {
    if (offset === 60) return;

    setOffset(offset - 60);
  };

  const handleOnRestart = () => {
    restart();
  };

  const handleOnPause = () => {
    pause();
  };

  const handleOnStart = () => {
    start();
  };

  useEffect(() => {
    setRenderVisualPing(true);
  }, []);

  return (
    <div className="group">
      <Popover>
        <PopoverTrigger asChild>
          <div className="relative">
            {totalSeconds === 0 && renderVisualPing && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-md bg-sky-500 dark:bg-blue-700" />
            )}
            <Button variant="outline">
              <TimerIcon className="mr-2 h-4 w-4" />
              {minutes}:
              {seconds === 0 ? "00" : seconds < 10 ? `0${seconds}` : seconds}
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-50 mr-4 grid grid-cols-2 gap-4">
          <Button variant="ghost" onClick={handleIncrease}>
            <PlusIcon className="mr-2 h-4 w-4" />1 minute
          </Button>
          <Button variant="ghost" onClick={handleDecrease}>
            <MinusIcon className="mr-2 h-4 w-4" />1 minute
          </Button>
          <Button
            variant="secondary"
            onClick={handleOnRestart}
            disabled={totalSeconds === offset}
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
