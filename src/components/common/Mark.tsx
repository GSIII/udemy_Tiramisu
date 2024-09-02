export default function Mark({ label }: {label: string}) {
  return (
    <div className="flex h-[20px] items-center rounded-2xl border-2 border-main-purple flex-shrink-0">
      <span className="px-[3px] py-[6px] text-xs font-semibold text-main-purple">
        {label}
      </span>
    </div>
  );
};