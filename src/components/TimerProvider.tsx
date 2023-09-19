import useAudio from "@/hooks/useAudio";
import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useTimer as useTimerHook } from "react-timer-hook";

type TimerContext = {
  offset: number;
  setOffset: (offset: number, autoStart?: boolean) => void;
  isRunning: boolean;

  seconds: number;
  minutes: number;
  totalSeconds: number;

  handleIncreaseTimer: () => void;
  handleDecreaseTimer: () => void;

  pause: () => void;
  start: () => void;
  restart: () => void;
};

const Context = createContext<TimerContext | undefined>(undefined);

type TimerProviderProps = {
  context?: Partial<TimerContext>;
  children: ReactNode;
};

const TimerProvider: FC<TimerProviderProps> = ({ context, children }) => {
  const {
    isPlaying: isPlayingChime,
    play: playChime,
    pause: pauseChime,
  } = useAudio("/headspace-softchime.mp3");
  const { seconds, minutes, isRunning, totalSeconds, pause, start, restart } =
    useTimerHook({
      expiryTimestamp: new Date(),
    });
  const [timestampOffset, setTimestampOffset] = useState({
    offset: 300,
    mutated: new Date(),
  });

  const handleSetTimestapOffset = (
    offset: number,
    autoStart: boolean = false,
  ) => {
    setTimestampOffset({
      offset,
      mutated: new Date(),
    });

    const newExpiryTimestamp = new Date();
    newExpiryTimestamp.setSeconds(newExpiryTimestamp.getSeconds() + offset);

    restart(newExpiryTimestamp, autoStart);
  };

  const handleIncreaseTimer = () => {
    handleSetTimestapOffset(timestampOffset.offset + 60);
  };

  const handleDecreaseTimer = () => {
    handleSetTimestapOffset(timestampOffset.offset - 60);
  };

  const handleOnRestart = () => {
    handleSetTimestapOffset(timestampOffset.offset);
  };

  const handleOnPause = () => {
    pause();
  };

  const handleOnStart = () => {
    start();
  };

  useEffect(() => {
    handleSetTimestapOffset(timestampOffset.offset);
  }, []);

  useEffect(() => {
    if (totalSeconds === 0 && !isRunning) {
      playChime();
    } else if (isPlayingChime) {
      pauseChime();
    }
  }, [totalSeconds, isRunning]);

  return (
    <Context.Provider
      value={{
        offset: timestampOffset.offset,
        setOffset: handleSetTimestapOffset,
        isRunning,

        seconds,
        minutes,
        totalSeconds,

        handleIncreaseTimer,
        handleDecreaseTimer,

        pause: handleOnPause,
        start: handleOnStart,
        restart: handleOnRestart,

        ...context,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("useTimer must be used within a TimerProvider");
  }

  return context;
};

export default TimerProvider;
