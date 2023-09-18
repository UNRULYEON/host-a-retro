import { useRetroState } from "@/state";

const EnergiserStep = () => {
  const energiser = useRetroState((state) => state.energiser);
  const randomiseEnergiser = useRetroState((state) => state.randomiseEnergiser);

  const handleOnReroll = () => randomiseEnergiser();

  return (
    <>
      <div className="flex max-w-xl flex-col gap-4 text-left">
        <button onClick={handleOnReroll} className="flex w-min">
          🎲
        </button>
        <energiser.default />
      </div>
    </>
  );
};

export default EnergiserStep;
