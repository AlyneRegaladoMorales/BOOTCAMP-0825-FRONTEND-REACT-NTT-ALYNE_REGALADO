import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const {state} =useCart();

  const handleSignOut = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    auth.signOut(); 
    navigate("/");
  };

  const totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);


  return (
    <nav>
      <ul>
        <li><Link to="/home">Lista de productos</Link></li>
        <li><Link to="/summary">Resumen de compra ({totalItems})</Link></li>
        <li><Link to="/me">Profile</Link></li>
        <li><Link to="/me">{auth.getUser()?.username ?? ""}</Link></li>
        <li><a href="#" onClick={handleSignOut}>Sign Out</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
