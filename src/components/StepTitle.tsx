import { ReactNode } from "react";

type StepTitleProps = {
  children: ReactNode;
};

const StepTitle = ({ children }: StepTitleProps) => {
  return (
    <span className="text-md absolute top-12 font-bold uppercase dark:text-neutral-400">
      {children}
    </span>
  );
};

export default StepTitle;
