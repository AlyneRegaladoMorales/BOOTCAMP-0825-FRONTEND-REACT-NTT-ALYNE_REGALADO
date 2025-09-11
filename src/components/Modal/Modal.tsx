import { ModalContainer,  Overlay, PrimaryButton } from "./Modal.styled";

interface ModalProps {
  isOpen: boolean;
  message?: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, message, children, onClose }) => {
  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalContainer>
        {message && <p>{message}</p>} {children && <div>{children}</div>}
        <PrimaryButton onClick={onClose}>Cerrar</PrimaryButton>

      </ModalContainer>
    </Overlay>
  );
};

export default Modal;