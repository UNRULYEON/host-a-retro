import { useRetroState } from "@/state";
import Timer from "@/components/Timer";
import StepControls from "@/components/StepControls";
import { ThemeModeToggle } from "@/components/ThemeModeToggle";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import CommandPalette from "@/components/CommandPalette";
import getOS from "@/utils/getOS";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

enum STEPS {
  "intro",
  "action-items",
  "energiser",
  "retro-theme",
}

const App = () => {
  const step = useRetroState((state) => state.step);
  const setStep = useRetroState((state) => state.setStep);
  const steps = useRetroState((state) => state.steps);
  const toggle = useRetroState((s) => s.toggleOpenCommandPalette);

  return (
    <div className="flex h-[inherit] w-[inherit] flex-col gap-2 overflow-hidden p-4 md:gap-4">
      <div className="flex select-none flex-row justify-end gap-2 md:gap-4">
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
        <div className="visible flex w-full sm:invisible sm:hidden">
          <Select
            onValueChange={(v) => {
              Object.values(STEPS).forEach((step, i) => {
                if (v === step) {
                  setStep(i);
                }
              });
            }}
            value={STEPS[step]}
            defaultValue={STEPS[step]}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Step" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={STEPS[0]}>Intro</SelectItem>
              <SelectItem value={STEPS[1]}>Action items</SelectItem>
              <SelectItem value={STEPS[2]}>Energiser</SelectItem>
              <SelectItem value={STEPS[3]}>Retro theme</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Timer />
      </div>
      <Tabs
        defaultValue={STEPS[step]}
        value={STEPS[step]}
        className="invisible hidden justify-center sm:visible sm:flex"
      >
        <TabsList>
          <TabsTrigger value={STEPS[0]} onClick={() => setStep(0)}>
            Intro
          </TabsTrigger>
          <TabsTrigger value={STEPS[1]} onClick={() => setStep(1)}>
            Action items
          </TabsTrigger>
          <TabsTrigger value={STEPS[2]} onClick={() => setStep(2)}>
            Energiser
          </TabsTrigger>
          <TabsTrigger value={STEPS[3]} onClick={() => setStep(3)}>
            Retro theme
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Card className="flex h-[inherit] w-[inherit] p-4">{steps[step]}</Card>
      <div className="flex flex-row justify-between">
        <Button size="icon" variant="ghost" asChild>
          <a href="https://github.com/UNRULYEON/host-a-retro" target="_blank">
            <GitHubLogoIcon />
          </a>
        </Button>
        <ThemeModeToggle />
      </div>
      <CommandPalette />
      <StepControls />
    </div>
  );
};

export default App;
