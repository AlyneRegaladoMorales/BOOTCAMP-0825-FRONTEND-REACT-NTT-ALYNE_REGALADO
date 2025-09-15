import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/AppRouter";
import { AuthProvider } from "./context/AuthProvider";
import { CartProvider } from "./context/CartContext";

import { ThemeProvider } from "styled-components";
import { theme } from "./layout/styles/theme";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>


  </StrictMode>
);
