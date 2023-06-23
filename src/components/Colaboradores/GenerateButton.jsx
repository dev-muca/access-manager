import { PiArrowClockwiseBold } from "react-icons/pi";

export function GenerateButton({ text, hiddenText, ...props }) {
  return (
    <button {...props} className="flex flex-row justify-center items-center hover:underline">
      {hiddenText ? <PiArrowClockwiseBold className="hover:animate-spin" /> : <span>{text}</span>}
    </button>
  );
}
