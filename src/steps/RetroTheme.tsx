import { useRetroState } from "@/state";

const RetroThemeStep = () => {
  const retroTheme = useRetroState((state) => state.retroTheme);
  const randomiseRetroTheme = useRetroState(
    (state) => state.randomiseRetroTheme,
  );

  const handleOnReroll = () => randomiseRetroTheme();

  return (
    <>
      <div className="flex max-w-xl flex-col gap-4 text-left">
        <button onClick={handleOnReroll} className="flex w-min">
          🎲
        </button>
        <retroTheme.default />
      </div>
    </>
  );
};

export default RetroThemeStep;
