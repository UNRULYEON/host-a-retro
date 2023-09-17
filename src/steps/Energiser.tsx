import StepTitle from "@/components/StepTitle";
import { useRetroState } from "@/state";

const EnergiserStep = () => {
  const energiserTitle = useRetroState((state) => state.energiserTitle);
  const energiser = useRetroState((state) => state.energiser);
  const randomiseEnergiser = useRetroState((state) => state.randomiseEnergiser);

  const handleOnReroll = () => randomiseEnergiser();

  return (
    <>
      <div className="flex max-w-xl flex-col gap-4 text-left">
        <button onClick={handleOnReroll} className="flex w-min">
          🎲
        </button>
        <span className="text-5xl font-bold">{energiser.title}</span>
        {energiser.description && <p>{energiser.description}</p>}
        <ol className="list-decimal">
          {energiser.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </div>
    </>
  );
};

export default EnergiserStep;
