import type { FC } from "react";
import { ModalContainer,  Overlay, PrimaryButton } from "./Modal.styled";

interface ModalProps {
  isOpen: boolean;
  message?: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({ isOpen, message, children, onClose }) => {
  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalContainer>
        <PrimaryButton>
   
        <button onClick={onClose}>X</button>  
        </PrimaryButton>

        {message && <p>{message}</p>} {children && <div>{children}</div>}

      </ModalContainer>
    </Overlay>
  );
};

export default Modal;