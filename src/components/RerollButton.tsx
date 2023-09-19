import { FC } from "react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type RerollButtonProps = {
  onClick: () => void;
};

const RerollButton: FC<RerollButtonProps> = ({ onClick }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={onClick}
            variant="outline"
            className="flex w-min text-xl"
          >
            🎲
          </Button>
        </TooltipTrigger>
        <TooltipContent>Click to reroll</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default RerollButton;
