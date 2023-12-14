import RerollButton from "@/components/RerollButton";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRetroState } from "@/state";
import { useRef } from "react";

const EnergiserStep = () => {
  const ref = useRef<HTMLDivElement>(null);
  const energiser = useRetroState((state) => state.energiser);
  const randomiseEnergiser = useRetroState((state) => state.randomiseEnergiser);

  const handleOnReroll = () => {
    if (ref.current) ref.current.scrollTo({ top: 0, behavior: "smooth" });
    randomiseEnergiser();
  };

  return (
    <Card
      ref={ref}
      className="m-auto flex h-[inherit] w-[inherit] max-w-2xl flex-col justify-between gap-4 overflow-x-auto rounded-lg"
    >
      <ScrollArea className="h-full">
        <div className="p-4">
          {energiser.emoji && (
            <span className="mb-4 flex text-4xl">{energiser.emoji}</span>
          )}
          <energiser.default />
        </div>
      </ScrollArea>
      <div className="sticky bottom-0 flex flex-row items-center justify-between border-t bg-background p-2">
        <a href={energiser.source} target="_blank">
          <Badge variant="secondary">{energiser.source}</Badge>
        </a>
        <RerollButton onClick={handleOnReroll} />
      </div>
    </Card>
  );
};

export default EnergiserStep;
