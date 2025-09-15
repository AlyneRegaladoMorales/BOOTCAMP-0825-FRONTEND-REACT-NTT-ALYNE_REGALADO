import { ToastBox } from "./ToastBox.style";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info" | "warning";
}

const Toast = ({ message, type = "success" }: ToastProps) => {
  return <ToastBox type={type}>{message}</ToastBox>;
};

export default Toast;
