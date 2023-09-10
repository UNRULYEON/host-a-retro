import { useEffect, useMemo, useState } from "react";

const useAudio = (source: string) => {
  const memoizedAudio = useMemo<HTMLAudioElement>(
    () => new Audio(source),
    [source],
  );
  const [audio] = useState(memoizedAudio);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!audio) return;

    if (playing) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [playing, audio]);

  const play = () => setPlaying(true);
  const pause = () => setPlaying(false);

  return { isPlaying: playing, play, pause } as const;
};

export default useAudio;
