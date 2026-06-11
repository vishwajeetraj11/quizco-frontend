import React from "react";

interface Props {
  children: React.ReactNode;
  tone?: "brand" | "neutral";
  className?: string;
}

const toneStyles: Record<NonNullable<Props["tone"]>, string> = {
  brand:
    "border-teal-100 bg-teal-50/85 text-teal-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]",
  neutral:
    "border-slate-200 bg-slate-100/80 text-slate-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]",
};

export const TagChip: React.FC<Props> = ({
  children,
  tone = "brand",
  className = "",
}) => (
  <span
    className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-semibold ${toneStyles[tone]} ${className}`.trim()}
  >
    {children}
  </span>
);
