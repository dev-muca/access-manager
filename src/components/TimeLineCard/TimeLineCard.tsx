import { ReactNode } from "react";
import { FaCheckCircle, FaClock, FaExclamationCircle, FaTimesCircle } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

interface TimeLineProps {
  data?: string;
  title?: string;
  children?: ReactNode;
  icon?: "check" | "clock" | "cancel" | "exclamation";
  color?: "green" | "yellow" | "red" | "gray";
}

const TimeLineCard = ({ title, data, children, icon = "exclamation", color = "gray" }: TimeLineProps) => {
  const iconStrToIcon: any = {
    check: <FaCheckCircle />,
    clock: <FaClock />,
    cancel: <FaTimesCircle />,
    exclamation: <FaExclamationCircle />,
  };

  const colorToClass = {
    red: { background: "bg-red-500", text: "text-white", border: "border-t border-t-red-400" },
    gray: { background: "bg-gray-300", text: "text-gray-400", border: "border-t border-t-gray-400" },
    green: { background: "bg-green-500", text: "text-white", border: "border-t border-t-green-600" },
    yellow: { background: "bg-yellow-400", text: "text-white", border: "border-t border-t-yellow-500" },
  };

  return (
    <div className="w-full p-0">
      <div className="w-full">
        <div className="w-full flex flex-col md:grid grid-cols-12 text-gray-50">
          <div className="w-full flex md:contents">
            <div className="col-start-1 col-end-2 mr-10 md:mx-auto relative">
              <div className="h-full w-6 flex items-center justify-center">
                <div className={twMerge("h-full w-1 pointer-events-none", colorToClass[color].background)}></div>
              </div>
              <div
                className={twMerge(
                  "w-6 h-6 absolute top-1/2 -mt-3 rounded-full shadow flex justify-center items-center",
                  colorToClass[color].background
                )}
              >
                {iconStrToIcon[icon]}
              </div>
            </div>
            <div
              className={twMerge(
                "w-full col-start-2 col-end-12 p-4 rounded-xl my-4 mr-auto shadow-md",
                colorToClass[color].background
              )}
            >
              <h3 className={twMerge("font-semibold text-lg mb-1", colorToClass[color].text)}>{title}</h3>
              <div className="leading-tight text-justify w-full text-white">
                {data && <span>{data}</span>}
                {children && (
                  <div
                    className={twMerge(
                      "mt-3 pt-2",
                      colorToClass[color].border,
                      color === "gray" ? colorToClass[color].text : null
                    )}
                  >
                    {children}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLineCard;
