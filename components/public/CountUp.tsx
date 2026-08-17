"use client";

function format(value: number, decimals: number) {
  return decimals > 0
    ? value.toFixed(decimals)
    : Math.round(value).toLocaleString("en-NG");
}

export function CountUp({
  value,
  suffix = "",
  prefix = "",
  decimals = 0
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}) {
  return (
    <span>
      {prefix}
      {format(value, decimals)}
      {suffix}
    </span>
  );
}
