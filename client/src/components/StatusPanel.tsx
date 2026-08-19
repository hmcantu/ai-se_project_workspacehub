interface StatusPanelProps {
  title: string;
  message?: string;
}

export const StatusPanel = ({ title, message }: StatusPanelProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <h2 className="text-lg font-semibold text-ink">{title}</h2>
      {message ? (
        <p className="mt-2 text-sm text-slate-600">{message}</p>
      ) : null}
    </div>
  );
};
