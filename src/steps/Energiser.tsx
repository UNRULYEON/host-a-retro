import RerollButton from "@/components/RerollButton";
import { Card } from "@/components/ui/card";
import { useRetroState } from "@/state";
import { Badge } from "@/components/ui/badge";
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
      className="m-auto flex h-[inherit] w-[inherit] max-w-2xl flex-col justify-between gap-4 overflow-x-auto rounded-lg p-4"
    >
      <div>
        <energiser.default />
      </div>
      <div className="flex flex-row items-center justify-between gap-4">
        <a href={energiser.source} target="_blank">
          <Badge variant="secondary">{energiser.source}</Badge>
        </a>
        <RerollButton onClick={handleOnReroll} />
      </div>
    </Card>
  );
};

export default EnergiserStep;
