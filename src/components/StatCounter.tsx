import { useCountUp } from '../hooks/useCountUp';

interface StatCounterProps {
  num: string;
  label: string;
  suffix?: string;
}

export function StatCounter({ num, label, suffix = "" }: StatCounterProps) {
  const numericValue = parseInt(num.replace(/[^0-9]/g, ""));
  const { count, ref } = useCountUp(numericValue);
  
  return (
    <div className="flex flex-col text-center md:text-left" ref={ref}>
      <span className="text-[28px] md:text-[36px] font-[800] text-[#008751] leading-[1.2]">₦{count}{suffix}</span>
      <span className="text-[13px] md:text-[14px] text-[#6b7280] font-[500]">{label}</span>
    </div>
  );
}
