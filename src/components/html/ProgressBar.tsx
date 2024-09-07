import React from 'react';

type TProgressBarProps = {
  currentStepIndex: number;
  totalSteps: number;
};

const ProgressBar: React.FC<TProgressBarProps> = ({
  currentStepIndex,
  totalSteps,
}) => {
  const progressValue = ((currentStepIndex + 1) / totalSteps) * 100;

  return (
    <></>
    // <Progress
    //   aria-label="Loading..."
    //   size="sm"
    //   value={progressValue}
    //   color="success"
    //   className="mb-8 max-w-full [&>*>*]:!rounded-none [&>*>*]:bg-primary [&>*]:!rounded-none"
    // />
  );
};

export default ProgressBar;
