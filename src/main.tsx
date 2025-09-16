import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/AppRouter";
import { AuthProvider } from "./context/AuthProvider";
import { CartProvider } from "./context/CartContext";


createRoot(document.getElementById("root")!).render(
  <StrictMode>

      <AuthProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </AuthProvider>



  </StrictMode>
);
