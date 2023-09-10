import { useRetroState } from "@/state";
import { ReactNode, useEffect } from "react";

const StepControls = () => {
  const step = useRetroState((state) => state.step);
  const steps = useRetroState((state) => state.steps);
  const increaseStep = useRetroState((state) => state.increaseStep);
  const decreaseStep = useRetroState((state) => state.decreaseStep);

  const handlePreviousStep = () => decreaseStep();

  const handleNextStep = () => increaseStep();

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft" || event.key === "p") {
      handlePreviousStep();
    } else if (event.key === "ArrowRight" || event.key === "n") {
      handleNextStep();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown, false);
  }, []);

  return (
    <div className="absolute bottom-4 right-4 z-10 flex select-none flex-row gap-3 text-neutral-500">
      <StepButton onClick={handlePreviousStep} disabled={step === 0}>
        {"<"}
      </StepButton>
      <StepButton onClick={handleNextStep} disabled={step === steps.length - 1}>
        {">"}
      </StepButton>
    </div>
  );
};

type StepButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
};

const StepButton = ({ children, disabled, onClick }: StepButtonProps) => (
  <button
    onClick={onClick}
    className={`aspect-square w-12 rounded-full border-2 border-neutral-300 font-bold text-neutral-300 transition-all ease-in-out ${
      disabled ? "scale-95 cursor-not-allowed opacity-50" : "hover:scale-105"
    }`}
    disabled={disabled}
  >
    {children}
  </button>
);

export default StepControls;
