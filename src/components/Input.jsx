import { FaInfoCircle } from "react-icons/fa";

export function Input({ error = false, errorMessage = null, ...props }) {
  const InputClassName = error
    ? `h-10 px-2 py-1 rounded border border-red-400 outline-red-600 text-red-400 placeholder:text-red-400`
    : `h-10 border px-2 py-1 rounded`;

  return (
    <label className="flex flex-col gap-2">
      <input {...props} className={InputClassName} />
      {error && (
        <p className="pl-2 text-sm text-red-400 font-medium flex items-center gap-1">
          <FaInfoCircle />
          <span>{errorMessage}</span>
        </p>
      )}
    </label>
  );
}
