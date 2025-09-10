import type { JSX } from "react";
import Navbar from "../../components/NavBar/Navbar";
import type React from "react";
import { MainContent } from "./PortalLayout.styled";

const PortalLayout:React.FC<React.PropsWithChildren> = ({ children }) : JSX.Element => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <MainContent>{children}</MainContent>
      </main>
    </>
  );
};

export default PortalLayout;
