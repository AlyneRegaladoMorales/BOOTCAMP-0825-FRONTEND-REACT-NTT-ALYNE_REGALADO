
interface ModalProps {
  isOpen: boolean;
  message?: string; 
  children?: React.ReactNode; 
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, message, children, onClose }) => {
  if (!isOpen) return null;

  return (
    <div style={{backgroundColor:"red"}}>
      <div>
        {message && <p>{message}</p>}
        {children && <div>{children}</div>}
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default Modal;