import { useRetroState } from "@/state";
import { ReactNode, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

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
    <div className="flex select-none flex-row gap-2 text-neutral-500">
      <StepButton onClick={handlePreviousStep} disabled={step === 0}>
        <ChevronLeftIcon />
      </StepButton>
      <StepButton onClick={handleNextStep} disabled={step === steps.length - 1}>
        <ChevronRightIcon />
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
  <Button size="icon" onClick={onClick} disabled={disabled}>
    {children}
  </Button>
);

export default StepControls;
