import { useRetroState } from "@/state";

const EnergiserStep = () => {
  const energiser = useRetroState((state) => state.energiser);
  const randomiseEnergiser = useRetroState((state) => state.randomiseEnergiser);

  const handleOnReroll = () => randomiseEnergiser();

  return (
    <>
      <div className="m-auto flex h-[inherit] w-[inherit] max-w-2xl flex-col md:justify-center">
        <button onClick={handleOnReroll} className="flex w-min">
          🎲
        </button>
        <energiser.default />
      </div>
    </>
  );
};

export default EnergiserStep;
