import { ReactNode } from "react";

type StepTitleProps = {
  children: ReactNode;
};

const StepTitle = ({ children }: StepTitleProps) => {
  return (
    <span className="text-md absolute top-12 font-bold uppercase">
      {children}
    </span>
  );
};

export default StepTitle;
