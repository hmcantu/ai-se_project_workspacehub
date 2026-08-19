import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description: string;
  actions?: ReactNode;
}

export const PageHeader = ({
  title,
  description,
  actions,
}: PageHeaderProps) => {
  return (
    <div className="flex flex-col gap-2 rounded-[20px] bg-gradient-to-r from-ink via-slate-800 to-[#1f4d45] py-5 px-8 text-white shadow-lg md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-xs uppercase text-[#A5B4FC]">WorkspaceHub</p>
        <h1 className="text-3xl font-extrabold">{title}</h1>
        <p className="max-w-2xl text-sm text-[#D1D5DB]">{description}</p>
      </div>
      {actions ? <div className="shrink-0">{actions}</div> : null}
    </div>
  );
};
