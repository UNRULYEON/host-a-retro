import StepTitle from "@/components/StepTitle";
import { useRetroState } from "@/state";

const RetroThemeStep = () => {
  const retroTheme = useRetroState((state) => state.retroTheme);
  const randomiseRetroTheme = useRetroState(
    (state) => state.randomiseRetroTheme,
  );

  const handleOnReroll = () => randomiseRetroTheme();

  return (
    <>
      <StepTitle>Retro theme</StepTitle>
      <div className="flex max-w-xl flex-col gap-4 text-left">
        <button onClick={handleOnReroll} className="flex w-min">
          🎲
        </button>
        <span className="text-5xl font-bold">{retroTheme.title}</span>
        {retroTheme.description && <p>{retroTheme.description}</p>}
        <ol className="list-decimal">
          {retroTheme.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </div>
    </>
  );
};

export default RetroThemeStep;
