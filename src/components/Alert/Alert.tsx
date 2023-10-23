import { useState } from "react";
import { GrFormClose } from "react-icons/gr";
import Button from "../Button";

interface AlertProps {
  title?: string;
  content?: string;
  hasActions?: true;
  hasConfirm?: true;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const Alert = ({ title, content, hasActions, hasConfirm, onConfirm, onCancel }: AlertProps) => {
  const [show, setShow] = useState(true);

  return (
    <>
      {show && (
        <div className="absolute top-0 left-0 bg-opacity-50 w-screen h-screen bg-black z-[999999]">
          <div className="w-full h-full relative">
            <div className="flex flex-col gap-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/5 p-6 bg-white shadow-2xl rounded">
              <header className="flex justify-end items-center">
                {title && <h1 className="text-lg font-medium w-full">{title}</h1>}
                <GrFormClose size={24} className="cursor-pointer" onClick={() => setShow(false)} />
              </header>
              {content && <p className="text-justify">{content}</p>}
              {hasActions && (
                <footer className="w-full flex justify-end gap-4">
                  <Button
                    className="bg-red-500"
                    onClick={() => {
                      setShow(false);
                      onCancel ? onCancel!() : () => null;
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    className="bg-emerald-500"
                    onClick={() => {
                      setShow(false);
                      onConfirm ? onConfirm!() : () => null;
                    }}
                  >
                    Confirmar
                  </Button>
                </footer>
              )}
              {hasConfirm && (
                <footer className="w-full flex justify-end gap-4">
                  <Button
                    className="w-full"
                    onClick={() => {
                      setShow(false);
                      onConfirm ? onConfirm!() : () => null;
                    }}
                  >
                    OK
                  </Button>
                </footer>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Alert;
