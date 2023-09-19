import { useRetroState } from "@/state";

const RetroThemeStep = () => {
  const retroTheme = useRetroState((state) => state.retroTheme);
  const randomiseRetroTheme = useRetroState(
    (state) => state.randomiseRetroTheme,
  );

  const handleOnReroll = () => randomiseRetroTheme();

  return (
    <>
      <div className="m-auto flex h-[inherit] w-[inherit] max-w-2xl flex-col md:justify-center">
        <button onClick={handleOnReroll} className="flex w-min">
          🎲
        </button>
        <retroTheme.default />
      </div>
    </>
  );
};

export default RetroThemeStep;
