import { useRetroState } from "@/state";
import Timer from "@/components/Timer";
import StepControls from "@/components/StepControls";
import { ThemeModeToggle } from "@/components/ThemeModeToggle";
import { Progress } from "@/components/ui/progress";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import CommandPalette from "@/components/CommandPalette";
import getOS from "./utils/getOS";

const App = () => {
  const step = useRetroState((state) => state.step);
  const steps = useRetroState((state) => state.steps);
  const toggle = useRetroState((s) => s.toggleOpenCommandPalette);

  return (
    <div className="relative h-[inherit] w-[inherit] text-center">
      <div className="absolute top-0 w-full">
        <Progress value={33} className="h-2 rounded-none" />
      </div>
      <span className="text-md absolute left-0 right-0 top-6 font-bold">
        For when you need to host a retro in person with minimal effort 😘
      </span>
      <div className="absolute right-4 top-6 z-10 flex select-none flex-row gap-2 md:gap-4">
        <Button
          variant="ghost"
          onClick={() => toggle()}
          className="invisible hidden sm:visible sm:block"
        >
          <p className="text-sm text-muted-foreground">
            Command palette{" "}
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">
                {getOS() === "MacOS" ? "⌘" : "Ctrl"} + K
              </span>
            </kbd>
          </p>
        </Button>
        <Timer />
      </div>
      <main className="flex h-[inherit] w-[inherit] flex-col items-center justify-center gap-4">
        {steps[step]}
      </main>
      <div className="absolute bottom-4 right-4">
        <StepControls />
      </div>
      <div className="absolute bottom-4 left-4 flex flex-row gap-2 ">
        <ThemeModeToggle />
        <Button size="icon" variant="ghost" asChild>
          <a href="https://github.com/UNRULYEON/host-a-retro" target="_blank">
            <GitHubLogoIcon />
          </a>
        </Button>
      </div>
      <CommandPalette />
    </div>
  );
};

export default App;
