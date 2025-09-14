import type { FC, JSX, PropsWithChildren } from "react";
import Navbar from "../../components/NavBar/Navbar";
import type React from "react";
import { MainContent } from "./PortalLayout.styled";

const PortalLayout:FC<PropsWithChildren> = ({ children }) : JSX.Element => {
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
