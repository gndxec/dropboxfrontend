# 🟠 OrangeDrive — Cloud Storage Frontend

Frontend al estilo **Dropbox** con una paleta de colores **naranja vibrante e impactante** que consume la API REST de [gndxec/proyectodropbox](https://github.com/gndxec/proyectodropbox).

> Stack: React 18 + Vite + TypeScript + Tailwind CSS + Docker + Nginx

---

## ✨ Características

- 🔐 Login / Registro con JWT (auto-refresh de token)
- 📁 Dashboard con grid y lista de archivos estilo Dropbox
- ⬆️ Subida drag & drop de archivos
- ⬇️ Descarga directa de archivos
- 🗑️ Eliminación de archivos
- 📊 Barra de almacenamiento usado
- 🎨 Diseño naranja eléctrico impactante
- 📱 Totalmente responsive (mobile-first)
- 🐳 Docker Compose full-stack (backend + frontend + DB + MinIO)

---

## 🚀 Setup rápido

### Prerrequisitos
- Docker + Docker Compose
- Git

### 1. Clonar este repositorio
```bash
git clone https://github.com/gndxec/dropboxfrontend
cd dropboxfrontend
```

### 2. Clonar el backend dentro de la carpeta `backend/`
```bash
git clone https://github.com/gndxec/proyectodropbox ./backend
```

### 3. Configurar variables de entorno
```bash
cp .env.example .env
```

Editar `.env` y completar:
- `DJANGO_SECRET_KEY` — clave secreta de Django
- `FILE_ENCRYPTION_KEY` — generar con:
  ```bash
  python -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"
  ```

### 4. Levantar todo con Docker Compose
```bash
docker compose up --build -d
```

### 5. Abrir la aplicación
| Servicio | URL |
|---|---|
| 🟠 **Frontend OrangeDrive** | http://localhost:3000 |
| 🔧 Backend API Django | http://localhost:8001 |
| 🗄️ MinIO Console | http://localhost:9003 |
| 📦 MinIO API S3 | http://localhost:9002 |

---

## 🎨 Diseño

La interfaz usa una paleta naranja eléctrica agresiva:

| Color | Hex | Uso |
|---|---|---|
| 🟠 Primario | `#FF6B00` | Botones, acciones principales |
| 🔶 Secundario | `#FF8C00` | Hover states, gradientes |
| 🟡 Acento | `#FFA500` | Highlights, bordes |
| 🔥 Hot | `#FF4500` | CTAs, alertas |
| ⬛ Dark | `#1A1A2E` | Sidebar, fondos oscuros |

---

## 🐳 Servicios Docker

```
frontend  → localhost:3000  (React + Nginx, proxea /api/ al backend)
backend   → localhost:8001  (Django REST Framework)
db        → interno         (PostgreSQL 16)
minio     → localhost:9002  (MinIO API S3)
minio     → localhost:9003  (MinIO Console)
```

---

## 🔧 Variables de entorno

| Variable | Descripción | Default |
|---|---|---|
| `DJANGO_SECRET_KEY` | Clave secreta Django | **requerido** |
| `FILE_ENCRYPTION_KEY` | Clave Fernet para cifrado | **requerido** |
| `POSTGRES_PASSWORD` | Contraseña PostgreSQL | `cloud_password` |
| `MINIO_ROOT_USER` | Usuario MinIO | `minioadmin` |
| `MINIO_ROOT_PASSWORD` | Contraseña MinIO | `minioadmin` |

---

## 📁 Estructura del proyecto

```
dropboxfrontend/
├── src/
│   ├── api/client.ts          # Axios + JWT interceptors
│   ├── context/AuthContext.tsx # Contexto global de auth
│   ├── hooks/useFiles.ts      # Hook para manejo de archivos
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   └── Dashboard.tsx
│   ├── components/
│   │   ├── Sidebar.tsx
│   │   ├── Navbar.tsx
│   │   ├── FileCard.tsx
│   │   ├── FileRow.tsx
│   │   ├── UploadZone.tsx
│   │   └── ProtectedRoute.tsx
│   └── types/index.ts
├── Dockerfile                 # Multi-stage: node build → nginx serve
├── nginx.conf                 # Proxy /api/ → backend:8000
├── docker-compose.yml         # Orquestación completa
└── .env.example
```

---

## 🛠️ Comandos útiles

```bash
# Ver logs del frontend
docker compose logs -f frontend

# Ver logs del backend
docker compose logs -f backend

# Reiniciar solo el frontend
docker compose restart frontend

# Reconstruir después de cambios
docker compose up --build -d

# Parar todo
docker compose down
```

---

## 📜 Licencia

MIT
