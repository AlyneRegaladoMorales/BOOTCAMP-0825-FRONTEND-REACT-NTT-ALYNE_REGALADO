# DemoStore

Aplicación web desarrollada en **React + TypeScript** como parte del proyecto integrador.  
Incluye autenticación, gestión de carrito de compras y visualización de productos.

---

## Instalación y ejecución

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/AlyneRegaladoMorales/BOOTCAMP-0825-FRONTEND-REACT-NTT-ALYNE_REGALADO.git
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Cambiar a la rama de desarrollo**
   ```bash
   git checkout feature/proyecto-integrador
   ```

4. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

---

## Organización de carpetas

```
├── public/              # Recursos estáticos
├── src/
│   ├── assets/          # Imágenes e íconos
│   ├── components/      # Componentes reutilizables (Navbar, Toast, etc.)
│   ├── context/         # Context API (Auth, Cart)
│   ├── layout/          # Estilos globales y layouts
│   ├── model/           # Definición de tipos y enums (Product, CartActions, etc.)
│   ├── pages/           # Páginas principales (Home, Summary, Me)
│   ├── services/        # Llamadas a la API y funciones auxiliares
│   ├── utils/           # Constantes, tema y estilos globales
│   └── main.tsx         # Punto de entrada de la app
├── package.json
├── tsconfig.json
└── vite.config.ts
```
