import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { useCart } from "../../context/CartContext";
import {
  Avatar,
  Icon,
  Logo,
  MainNav,
  NavbarContainer,
  NavLinks,
  TopBanner,
} from "./Navbar.styled";
import cartIcon from "../../assets/icons/cart.svg";


const Navbar = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { state, dispatch } = useCart();

  const handleSignOut = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    auth.signOut();
    dispatch({ type: "CLEAR_CART" });
    localStorage.removeItem("cart");
    navigate("/");
  };
  

  const totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <NavbarContainer>
      <TopBanner>
        <p>Bienvenido a DemoStore – Explora todos los productos disponibles</p>
      </TopBanner>

      <MainNav>
        <Logo>DEMOSTORE</Logo>

        <NavLinks>
          <li>
            <Link to="/home">Lista de productos</Link>
          </li>

          <li>
            <Link to="/summary">
              <Icon src={cartIcon} alt="Carrito" /> ({totalItems})
            </Link>
          </li>

          <li>
            <Link to="/me">
              <Avatar
                src={auth.getUser()?.image || "assets/img/default-avatar.png"}
                alt={auth.getUser()?.firstName ?? "avatar"}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/default-avatar.png";
                }}
              />
              Hola, {auth.getUser()?.firstName ?? ""}
            </Link>
          </li>

          <li>
            <a href="#" onClick={handleSignOut}>
              Salir
            </a>
          </li>
        </NavLinks>
      </MainNav>
    </NavbarContainer>
  );
};

export default Navbar;

