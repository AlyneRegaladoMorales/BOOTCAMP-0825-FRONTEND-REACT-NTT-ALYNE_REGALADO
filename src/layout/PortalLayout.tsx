import type { JSX } from "react";
import Navbar from "../components/Navbar";

const PortalLayout = ({ children }: { children: React.ReactNode }): JSX.Element => {
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
