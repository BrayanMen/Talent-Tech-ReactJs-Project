# Proyecto Final ReactJS - Talent Tech | eCommerce

Este proyecto es la entrega final del curso **ReactJS** de **Talento Tech**. Se trata de una aplicación **eCommerce completa**, funcional y modular, construida en React con gestión de estados, autenticación, consumo de API externa y diseño adaptativo.

---

## 🧠 Descripción General

El objetivo fue construir una tienda online que permita:

- Autenticarse para acceder a funcionalidades avanzadas.
- Explorar un catálogo de productos.
- Agregar, eliminar y editar productos (CRUD) vía MockAPI (Solo si eres admin).
- Comprar productos usando un sistema de carrito.
- Navegar en un entorno responsivo, moderno y optimizado.

---

## ✅ Funcionalidades Implementadas

### 1. 🔐 Autenticación de Usuario
- Simulada mediante **LocalStorage y MockAPI**.
- Estado global de autenticación manejado por `AuthContext`.
- Rutas protegidas para el área de carrito y administrador.
- `LoginModal.jsx` permite al usuario ingresar con un credenciales de usuario.

### 2. 🛒 Carrito de Compras
- Implementado con `CartContext`.
- Agregar, eliminar y vaciar productos del carrito.
- Cálculo de totales.
- Pasarela de Pago
- Ticket Simualdo de Compra

### 3. 📦 CRUD de Productos (MockAPI)
- `ProductContext` administra el catálogo completo desde **MockAPI**.
- Crear, editar y eliminar productos desde la interfaz.
- Componente `ProductModal.jsx` con validaciones:
  - Nombre obligatorio.
  - Precio > 0.
  - Descripción > 10 caracteres.
- Confirmación de eliminación con modal.
- Manejo de errores y estados de carga.

### 4. 🎨 Estilos y UX
- Estilos realizados **100% con CSS nativo por componente**.
- Hoja de estilo `global` para resets y ajustes generales.
- Diseño responsivo con **Flexbox/Grid** y clases propias.
- Sin uso de Bootstrap, completamente personalizado.

### 5. 🎯 Iconografía
- Se utilizó la librería **Lucide React** para íconos modernos en la UI.

### 6. 💬 Sistema de Notificaciones
- Componente `Toast.jsx` desarrollado a medida con clases CSS.
- Notificaciones de éxito, error e información sin usar librerías externas.

### 7. 🌐 Navegación y Estructura
- Navegación con `React Router DOM`.
- `NavBar.jsx` y `MainLayout.jsx` como estructura base.
- Páginas: `Home`, `Productos`, `Detalle`, `Admin`, `NotFound`.

---

## 📂 Estructura del Proyecto
```
src/
├── components/ # Componentes reutilizables
├── context/ # Contextos globales (Auth, Cart, Product)
├── hooks/ # Hooks personalizados
├── layout/ # Estructura y navegación general
├── pages/ # Páginas principales
├── service/ # Conexión a MockAPI
└── index.css # Estilos globales
```
## ⚙️ Instalación y Uso

1. Cloná el repositorio:

```
git clone https://github.com/BrayanMen/Talent-Tech-ReactJs-Project.git
cd <REPO>
npm install

Ejecutá en entorno local:
npm run dev
```

### 8.📦 Tecnologías Usadas
- ReactJS + Vite
- React Router DOM
- Context API (Auth, Cart, Product)
- MockAPI
- Lucide React
- CSS modular (por componente)
- LocalStorage
- Toast personalizado (sin librerías externas)

### 9.📱 Responsividad
El sitio fue probado en:
Teléfonos móviles
Tablets
Escritorio

Con una experiencia fluida, legible y accesible.
