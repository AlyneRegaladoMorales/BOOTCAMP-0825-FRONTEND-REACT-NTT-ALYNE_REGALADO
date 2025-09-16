import type { FC, PropsWithChildren } from "react";
import Navbar from "../../components/NavBar/Navbar";
import { MainContent } from "../../utils/GlobalStyle";
import Footer from "../../components/Footer/footer";

const PortalLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <MainContent>{children}</MainContent>
      <Footer />
    </>
  );
};

export default PortalLayout;
