import { useState } from "react";
import { GrFormClose } from "react-icons/gr";
import { Button } from "../Form/Button";

interface AlertProps {
  title?: string;
  subtitle?: string;
  hasActions?: true;
  hasConfirm?: true;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export function Alert({ title, subtitle, hasActions, hasConfirm, onConfirm, onCancel }: AlertProps) {
  const [show, setShow] = useState(true);

  return (
    <>
      {show && (
        <div className="absolute top-0 left-0 bg-opacity-50 w-screen h-screen bg-black">
          <div className="w-full h-full relative">
            <div className="flex flex-col gap-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/5 p-6 bg-white shadow-2xl rounded">
              <header className="flex justify-end items-center">
                {title && <h1 className="text-lg font-medium">{title}</h1>}
                <GrFormClose size={24} className="cursor-pointer" onClick={() => setShow(false)} />
              </header>
              {subtitle && <p className="text-justify">{subtitle}</p>}
              {hasActions && (
                <footer className="w-full flex justify-end gap-4">
                  <Button
                    label="Cancelar"
                    className="bg-red-500"
                    onClick={() => {
                      setShow(false);
                      onCancel!();
                    }}
                  />
                  <Button
                    label="Confirmar"
                    className="bg-emerald-500"
                    onClick={() => {
                      setShow(false);
                      onConfirm!();
                    }}
                  />
                </footer>
              )}
              {hasConfirm && (
                <footer className="w-full flex justify-end gap-4">
                  <Button
                    label="OK"
                    className="w-full"
                    onClick={() => {
                      setShow(false);
                      onConfirm!();
                    }}
                  />
                </footer>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
