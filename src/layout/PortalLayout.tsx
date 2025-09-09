import type { JSX } from "react";
import Navbar from "../components/Navbar";
import type React from "react";

const PortalLayout:React.FC<React.PropsWithChildren> = ({ children }) : JSX.Element => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
    </>
  );
};

export default PortalLayout;
