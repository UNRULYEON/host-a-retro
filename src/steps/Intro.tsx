import { useRetroState } from "@/state";

const IntroStep = () => {
  const introGif = useRetroState((state) => state.introGif);
  const randomiseIntroGif = useRetroState((state) => state.randomiseIntroGif);

  const handleRandomiseIntroGif = () => randomiseIntroGif();

  return (
    <div className="flex h-[inherit] w-[inherit] items-center justify-center">
      <img
        className="h-fit w-full cursor-pointer rounded-lg md:w-[70%]"
        src={introGif}
        onClick={handleRandomiseIntroGif}
      />
    </div>
  );
};

export default IntroStep;
