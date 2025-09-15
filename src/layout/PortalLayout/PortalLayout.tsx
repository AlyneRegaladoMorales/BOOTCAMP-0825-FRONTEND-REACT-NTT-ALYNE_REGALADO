import type { FC, PropsWithChildren } from "react";
import Navbar from "../../components/NavBar/Navbar";
import { MainContent } from "./PortalLayout.styled";

const PortalLayout:FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <MainContent>{children}</MainContent>
    </>
  );
};

export default PortalLayout;
