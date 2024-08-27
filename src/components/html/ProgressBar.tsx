type TProgressBarProps = {
  currentStepIndex: number;
  totalSteps: number;
};

const ProgressBar: React.FC<TProgressBarProps> = ({
  currentStepIndex,
  totalSteps,
}) => {
  const progressPercentage = ((currentStepIndex + 1) / totalSteps) * 100;
  return (
    <div className="h-2 w-full rounded-full bg-middle-gray">
      <div
        className="h-2 rounded-full bg-main-purple"
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
