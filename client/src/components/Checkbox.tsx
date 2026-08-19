interface CheckboxProps {
  checked: boolean;
  disabled?: boolean;
  label?: string;
  onChange?: (checked: boolean) => void;
}

export const Checkbox = ({
  checked,
  disabled,
  label,
  onChange,
}: CheckboxProps) => (
  <label
    className={[
      "group inline-flex items-center gap-2",
      disabled ? "cursor-not-allowed opacity-50" : "",
    ].join(" ")}
  >
    <span
      className={[
        "relative flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-[6px] border-[1.5px] transition",
        checked
          ? "border-success bg-success group-hover:opacity-80"
          : "border-slate-200 bg-white group-hover:border-slate-300",
      ].join(" ")}
    >
      <input
        checked={checked}
        className="absolute inset-0 h-full w-full opacity-0"
        disabled={disabled}
        onChange={(event) => onChange?.(event.target.checked)}
        type="checkbox"
      />
      {checked ? (
        <svg
          className="h-[9px] w-[12px] text-white"
          fill="none"
          viewBox="0 0 12 9"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.9996 2.25L4.50015 6.3747L2.0004 4.49984"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
        </svg>
      ) : null}
    </span>
    {label}
  </label>
);
