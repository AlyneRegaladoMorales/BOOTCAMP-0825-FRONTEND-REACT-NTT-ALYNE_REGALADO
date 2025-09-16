import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { useCart } from "../../context/CartContext";
import {
  Avatar,
  BannerText,
  Burger,
  Icon,
  Logo,
  MainNav,
  NavbarContainer,
  NavLinks,
  TopBanner,
} from "./Navbar.styled";
import cartIcon from "../../assets/icons/cart.svg";
import { useState } from "react";
import { AppActions } from "../../model/CartActions";
import { IMAGES } from "../../utils/Images";


const Navbar = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { state, dispatch } = useCart();
  const [open, setOpen] = useState(false);


  const handleSignOut = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    auth.signOut();
    dispatch({ type: AppActions.Clear });
    localStorage.removeItem("cart");
    navigate("/");
  };


  const totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <NavbarContainer>
      <TopBanner>
        <BannerText>
          <p>Bienvenido a DemoStore – Explora todos los productos disponibles</p>
        </BannerText>
      </TopBanner>

      <MainNav>
        <Logo>DEMOSTORE</Logo>
        <Burger onClick={() => setOpen(!open)}>
          <span />
          <span />
          <span />
        </Burger>

        <NavLinks $open={open}>
          <li>
            <Link to="/home" onClick={() => setOpen(false)}>Lista de productos</Link>
          </li>

          <li>
            <Link to="/summary" onClick={() => setOpen(false)}>
              <Icon src={cartIcon} alt="Carrito" /> ({totalItems})
            </Link>
          </li>

          <li>
            <Link to="/me" onClick={() => setOpen(false)}>
              <Avatar
                src={auth.getUser()?.image || IMAGES.DEFAULT_AVATAR}
                alt={auth.getUser()?.firstName ?? "avatar"}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = IMAGES.DEFAULT_AVATAR;
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

