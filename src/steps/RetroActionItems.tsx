import StepTitle from "@/components/StepTitle";

const RetroActionItemsStep = () => {
  return (
    <>
      <StepTitle>Retrospective action items</StepTitle>
      <h1 className="text-5xl font-bold">
        Items that call for actions retroactively
      </h1>
      <span className="text-xl">You either did 'em or not</span>
    </>
  );
};

export default RetroActionItemsStep;
