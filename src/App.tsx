import { useRetroState } from "@/state";
import Timer from "@/components/Timer";
import StepControls from "@/components/StepControls";

const App = () => {
  const step = useRetroState((state) => state.step);
  const steps = useRetroState((state) => state.steps);

  return (
    <div className="relative h-[inherit] w-[inherit] text-center dark:bg-neutral-900 dark:text-neutral-200">
      <span className="text-md absolute left-0 right-0 top-4 font-bold dark:text-neutral-600">
        For when you need to host a retro in person with minimal effort 😘
      </span>
      <Timer />
      <StepControls />

      <main className="flex h-[inherit] w-[inherit] flex-col items-center justify-center gap-4">
        {steps[step]}
      </main>
    </div>
  );
};

export default App;
