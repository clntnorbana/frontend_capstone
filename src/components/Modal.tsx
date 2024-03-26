import { ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
};

const Modal = ({ children, isOpen }: ModalProps) => {
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-colors z-40 ${
        isOpen ? "visible bg-black/20" : "invisible"
      }`}
    >
      <div
        className={`bg-white rounded-xl shadow- p-6 transition-all ${
          isOpen ? "scale-100 opacity-100 " : "scale-125 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
