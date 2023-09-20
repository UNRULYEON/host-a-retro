import { ReactNode, useEffect } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useTheme } from "./themeProvider";
import { useRetroState } from "@/state";
import getOS from "@/utils/getOS";
import { useTimer } from "./TimerProvider";

const CommandPalette = () => {
  const { setTheme } = useTheme();
  const open = useRetroState((s) => s.openCommandPalette);
  const setOpen = useRetroState((s) => s.setOpenCommandPalette);
  const toggle = useRetroState((s) => s.toggleOpenCommandPalette);
  const step = useRetroState((s) => s.step);
  const steps = useRetroState((s) => s.steps);
  const increaseStep = useRetroState((s) => s.increaseStep);
  const decreaseStep = useRetroState((s) => s.decreaseStep);
  const { isRunning, pause, start, restart, setOffset } = useTimer();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleOnSelect = (f: () => void) => (_value: string) => {
    f();
    toggle();
  };

  const handleOnStartTimer = (offset: number) => {
    setOffset(offset, true);
  };

  const handleSetStep = (direction: "increase" | "decrease") => {
    if (direction === "increase") {
      increaseStep();
    } else {
      decreaseStep();
    }
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Timer">
          <CommandItem onSelect={handleOnSelect(() => handleOnStartTimer(60))}>
            <span>Start 1 min timer</span>
          </CommandItem>
          <CommandItem onSelect={handleOnSelect(() => handleOnStartTimer(120))}>
            <span>Start 2 min timer</span>
          </CommandItem>
          <CommandItem onSelect={handleOnSelect(() => handleOnStartTimer(300))}>
            <span>Start 5 min timer</span>
          </CommandItem>
          <CommandItem onSelect={handleOnSelect(() => handleOnStartTimer(600))}>
            <span>Start 10 min timer</span>
          </CommandItem>
          <CommandItem onSelect={handleOnSelect(() => restart())}>
            <span>Reset timer</span>
          </CommandItem>
          <CommandItem
            onSelect={handleOnSelect(() => (isRunning ? pause() : start()))}
          >
            <span>{isRunning ? "Pause" : "Start"} timer</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Steps">
          <CommandItem
            onSelect={handleOnSelect(() => handleSetStep("increase"))}
            disabled={step === steps.length - 1}
          >
            <span>Next step</span>
            <CommandShortcut>
              <ShortcutStyled noModifier>→</ShortcutStyled>
            </CommandShortcut>
          </CommandItem>
          <CommandItem
            onSelect={handleOnSelect(() => handleSetStep("decrease"))}
            disabled={step === 0}
          >
            <span>Previous step</span>
            <CommandShortcut>
              <ShortcutStyled noModifier>←</ShortcutStyled>
            </CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Theme">
          <CommandItem onSelect={handleOnSelect(() => setTheme("light"))}>
            Light mode
          </CommandItem>
          <CommandItem onSelect={handleOnSelect(() => setTheme("dark"))}>
            Dark mode
          </CommandItem>
          <CommandItem onSelect={handleOnSelect(() => setTheme("system"))}>
            System theme
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

const ShortcutStyled = ({
  noModifier = false,
  children,
}: {
  noModifier?: boolean;
  children: ReactNode;
}) => (
  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
    <span className="text-xs">
      {noModifier ? "" : getOS() === "MacOS" ? "⌘ + " : "Ctrl + "}
      {children}
    </span>
  </kbd>
);

export default CommandPalette;
