import StepTitle from "@/components/StepTitle";
import { useRetroState } from "@/state";

const IntroStep = () => {
  const introTitle = useRetroState((state) => state.introTitle);

  return (
    <>
      <StepTitle>Intro</StepTitle>
      <h1 className="text-5xl font-bold">{introTitle}</h1>
    </>
  );
};

export default IntroStep;
