# Sistema de Autenticación - Backend + Frontend React

## Estructura del Proyecto
```
ejemplo_backEnd/
├── index.js              # Servidor backend con Express
├── package.json          # Dependencias del backend
├── frontend/             # Aplicación React
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js     # Componente de login
│   │   │   └── Register.js  # Componente de registro
│   │   ├── App.js           # Componente principal
│   │   └── index.js         # Punto de entrada React
│   ├── public/
│   │   └── index.html       # HTML base
│   └── package.json         # Dependencias del frontend
└── README.md
```

## Instalación y Ejecución

### Backend
1. Instalar dependencias del backend:
   ```bash
   npm install
   ```

2. Iniciar el servidor backend:
   ```bash
   npm start
   ```
   El servidor correrá en http://localhost:3000

### Frontend
1. Navegar al directorio frontend:
   ```bash
   cd frontend
   ```

2. Instalar dependencias de React:
   ```bash
   npm install
   ```

3. Iniciar la aplicación React:
   ```bash
   npm start
   ```
   La aplicación correrá en http://localhost:3001

## Funcionalidades

### Backend
- **POST /login**: Autenticación de usuarios
- **POST /register**: Registro de nuevos usuarios
- Conexión a base de datos MySQL
- Middleware CORS habilitado

### Frontend
- **Componente Login**: Formulario de inicio de sesión
- **Componente Register**: Formulario de registro con validación
- **Navegación**: Cambio entre login y registro
- **Validaciones**: Confirmación de contraseña
- **Feedback**: Mensajes de éxito y error
- **Diseño responsive**: Estilos CSS integrados

## Base de Datos
Asegúrate de tener una tabla `usuarios` en tu base de datos MySQL:

```sql
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
```

## Uso
1. Abre http://localhost:3001 en tu navegador
2. Usa el formulario de registro para crear una cuenta
3. Cambia al login para iniciar sesión
4. Los datos se envían al backend en http://localhost:3000