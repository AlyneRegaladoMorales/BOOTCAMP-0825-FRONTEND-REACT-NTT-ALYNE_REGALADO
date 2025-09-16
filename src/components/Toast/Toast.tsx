import { ToastBox } from "./ToastBox.style";

interface ToastProps {
  message: string;
  type?: "success" | "error" ;
}

const Toast = ({ message, type = "success" }: ToastProps) => {
  return <ToastBox type={type}>{message}</ToastBox>;
};

export default Toast;
