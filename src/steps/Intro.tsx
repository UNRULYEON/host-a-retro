import { Button } from "@/components/ui/button";
import { useRetroState } from "@/state";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Close } from "@radix-ui/react-dialog";
import localStorage from "@/utils/localStorage";

const IntroStep = () => {
  const introGif = useRetroState((state) => state.introGif);
  const randomiseIntroGif = useRetroState((state) => state.randomiseIntroGif);
  const openExplanationDialogOnMount = localStorage.get<boolean>(
    "explanation-dialog-seen",
  )
    ? false
    : true;

  const handleRandomiseIntroGif = () => randomiseIntroGif();

  const handleOnCloseExplanationDialog = (value: boolean) => {
    console.log(value);
    console.log(openExplanationDialogOnMount);
    if (
      !value &&
      (openExplanationDialogOnMount === null || openExplanationDialogOnMount)
    ) {
      console.log("update local storage");
      localStorage.set("explanation-dialog-seen", true);
    }
  };

  return (
    <div className="relative flex h-[inherit] w-[inherit] flex-col items-center justify-center gap-8">
      <Dialog
        defaultOpen={openExplanationDialogOnMount}
        onOpenChange={handleOnCloseExplanationDialog}
      >
        <DialogTrigger asChild>
          <Button className="absolute top-0">How it works</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="text-left">
            <DialogTitle className="flex flex-col text-4xl">
              <span>How it works</span>
              <span className="text-lg text-neutral-500 dark:text-neutral-400">
                Easy as 1-2-3
              </span>
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="flex flex-col gap-2 text-lg">
            <span className="flex flex-row gap-2">
              <span>🎯</span>
              <span>
                Select at the top at what step you're at in your retro
              </span>
            </span>
            <span className="flex flex-row gap-2">
              <span>⏱️</span>
              <span>Use the timer to timebox</span>
            </span>
            <span className="flex flex-row gap-2">
              <span>🎲</span>
              <span>
                Energisers and retro themes are randomised. Reroll them if
                you're feeling lucky
              </span>
            </span>
          </DialogDescription>
          <DialogFooter>
            <Close asChild>
              <Button className="w-full">I got it!</Button>
            </Close>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <img
        className="h-fit max-h-[80%] max-w-[80%] cursor-pointer rounded-lg md:w-[70%] xl:w-[900px]"
        src={introGif}
        onClick={handleRandomiseIntroGif}
      />
    </div>
  );
};

export default IntroStep;
