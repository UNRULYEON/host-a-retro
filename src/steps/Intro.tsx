import { Button } from "@/components/ui/button";
import { useRetroState } from "@/state";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const IntroStep = () => {
  const introGif = useRetroState((state) => state.introGif);
  const randomiseIntroGif = useRetroState((state) => state.randomiseIntroGif);

  const handleRandomiseIntroGif = () => randomiseIntroGif();

  return (
    <div className="relative flex h-[inherit] w-[inherit] flex-col items-center justify-center gap-8">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="absolute top-0">How it works</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="text-left">
            <DialogTitle className="mb-4 text-4xl">Easy as 1-2-3</DialogTitle>
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
                  Energiser and retro themes are randomised. Reroll them if
                  you're feeling lucky
                </span>
              </span>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <img
        className="max-h-min w-full cursor-pointer rounded-lg md:w-[70%]"
        src={introGif}
        onClick={handleRandomiseIntroGif}
      />
    </div>
  );
};

export default IntroStep;
