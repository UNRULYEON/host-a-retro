import RerollButton from "@/components/RerollButton";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useRetroState } from "@/state";
import { useRef } from "react";

const RetroThemeStep = () => {
  const ref = useRef<HTMLDivElement>(null);
  const retroTheme = useRetroState((state) => state.retroTheme);
  const randomiseRetroTheme = useRetroState(
    (state) => state.randomiseRetroTheme,
  );

  const handleOnReroll = () => {
    if (ref.current) ref.current.scrollTo({ top: 0, behavior: "smooth" });
    randomiseRetroTheme();
  };

  return (
    <Card
      ref={ref}
      className="m-auto flex h-[inherit] w-[inherit] max-w-2xl flex-col justify-between gap-4 overflow-x-auto rounded-lg"
    >
      <div className="p-4">
        {retroTheme.emoji && (
          <span className="mb-4 flex text-4xl">{retroTheme.emoji}</span>
        )}
        <retroTheme.default />
      </div>
      <div className="sticky bottom-0 flex flex-row items-center justify-between border-t bg-background p-2">
        <a href={retroTheme.source} target="_blank">
          <Badge variant="secondary">{retroTheme.source}</Badge>
        </a>
        <RerollButton onClick={handleOnReroll} />
      </div>
    </Card>
  );
};

export default RetroThemeStep;
