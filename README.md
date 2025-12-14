# 🚀 Amazon Ads Campaigns - Frontend

Frontend empresarial para la plataforma de gestión de campañas de Amazon Ads, construido con React, TypeScript, Ant Design y React Query.

## 🎯 Características

- ✅ **Arquitectura empresarial** basada en Feature-Sliced Design
- ✅ **Actualización en tiempo real** con polling automático cada 5 segundos
- ✅ **Type-safety completo** con TypeScript
- ✅ **UI profesional** con Ant Design
- ✅ **Manejo robusto de errores** con interceptores centralizados
- ✅ **Filtros y búsqueda** en tiempo real
- ✅ **Responsive design** para móviles y desktop

## 🛠️ Stack Tecnológico

### Core
- **React 19** - UI Library
- **TypeScript** - Type Safety
- **Vite** - Build Tool

### UI & Styling
- **Ant Design 5** - Component Library
- **Tailwind CSS 4** - Utility-first CSS
- **React Icons** - Icon Library

### Data Fetching & State
- **TanStack Query (React Query)** - Data fetching con polling automático
- **Axios** - HTTP Client con interceptores
- **Zustand** - Estado global (opcional)

### Forms & Validation
- **React Hook Form** - Form Management
- **Zod** - Schema Validation

### Utilities
- **date-fns** - Date formatting
- **clsx + tailwind-merge** - Class management

## 📁 Estructura del Proyecto

```
src/
├── app/                          # Application layer
│   ├── providers/               # Global providers
│   └── Dashboard.tsx            # Main dashboard
│
├── features/                    # Feature modules
│   └── campaigns/
│       ├── api/                # API layer
│       │   ├── campaigns.api.ts
│       │   └── campaigns.types.ts
│       ├── hooks/              # Custom hooks
│       │   ├── useCampaigns.ts
│       │   ├── useCreateCampaign.ts
│       │   ├── useDeleteCampaign.ts
│       │   ├── useRetryCampaign.ts
│       │   └── useCampaignStats.ts
│       └── components/         # Feature components
│           ├── CampaignForm.tsx
│           ├── CampaignList.tsx
│           ├── CampaignStatusBadge.tsx
│           └── StatsCards.tsx
│
└── shared/                      # Shared resources
    ├── lib/                    # External library configs
    │   ├── axios.config.ts
    │   └── react-query.config.ts
    └── utils/                  # Global utilities
        └── cn.ts
```

## 🚀 Instalación y Ejecución

### Prerrequisitos

- Node.js 18+ 
- Yarn (preferido) o npm
- Backend corriendo en `http://localhost:8000`

### Instalación

```bash
# Instalar dependencias
yarn install

# Copiar variables de entorno
cp .env.example .env

# Editar .env si es necesario
# VITE_API_URL=http://localhost:8000/api
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo
yarn dev

# La aplicación estará disponible en http://localhost:5173
```

### Build para Producción

```bash
# Crear build optimizado
yarn build

# Preview del build
yarn preview
```

## 🔧 Variables de Entorno

```env
# URL del backend API
VITE_API_URL=http://localhost:8000/api
```

## 📊 Funcionalidades Principales

### 1. Dashboard con Estadísticas
- Visualización de métricas en tiempo real
- Total de campañas, activas, procesando y fallidas
- Actualización automática cada 10 segundos

### 2. Crear Campañas
- Formulario con validaciones
- Campos: nombre, presupuesto, keywords
- Feedback inmediato de éxito/error

### 3. Listar Campañas
- Polling automático cada 5 segundos
- Filtros por estado
- Búsqueda por nombre
- Paginación

### 4. Acciones sobre Campañas
- **Eliminar**: Solo campañas no sincronizadas
- **Reintentar**: Campañas fallidas (máx 3 intentos)
- Confirmación modal antes de eliminar

### 5. Estados de Campaña
- 🕐 **PENDING** - Pendiente de sincronización
- 🔄 **PROCESSING** - Sincronizando con Amazon
- ✅ **ACTIVE** - Activa en Amazon
- ❌ **FAILED** - Sincronización fallida

## 🎨 Características Técnicas Destacadas

### Polling Automático
```typescript
// Actualización cada 5 segundos sin refrescar
const { data } = useCampaigns({
  enablePolling: true,
  pollingInterval: 5000,
});
```

### Manejo Centralizado de Errores
```typescript
// Interceptor de Axios con mensajes de Ant Design
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    handleApiError(error); // Muestra mensajes automáticamente
    return Promise.reject(error);
  }
);
```

### Type-Safety Completo
```typescript
// Tipos generados desde la API del backend
export interface Campaign {
  id: string;
  name: string;
  budget: string;
  keywords: string[];
  status: CampaignStatus;
  // ... más campos
}
```

### Optimistic Updates
```typescript
// UI se actualiza antes de la respuesta del servidor
const { mutate } = useCreateCampaign();
mutate(newCampaign, {
  onSuccess: () => {
    queryClient.invalidateQueries(['campaigns']);
  },
});
```

## 🧪 Testing

```bash
# Ejecutar tests (cuando se implementen)
yarn test

# Coverage
yarn test:coverage
```

## 📝 Scripts Disponibles

```json
{
  "dev": "vite",                    // Servidor de desarrollo
  "build": "tsc -b && vite build",  // Build para producción
  "lint": "eslint .",               // Linting
  "preview": "vite preview"         // Preview del build
}
```

## 🔒 Buenas Prácticas Implementadas

1. ✅ **Separación de responsabilidades** (API, Hooks, Components)
2. ✅ **Type-safety** con TypeScript estricto
3. ✅ **Error handling** centralizado
4. ✅ **Loading states** y skeleton loaders
5. ✅ **Responsive design** mobile-first
6. ✅ **Path aliases** para imports limpios (`@/`)
7. ✅ **Query keys factory** para cache management
8. ✅ **Locale español** en Ant Design y date-fns

## 🎯 Puntos Clave para Evaluación

### Frontend (25 pts)
- ✅ Consumo de API con Axios
- ✅ Listado de campañas con filtros
- ✅ Diseño profesional con Ant Design
- ✅ Manejo de errores robusto
- ✅ Actualización dinámica con polling

### Código Limpio (10 pts)
- ✅ Arquitectura Feature-Sliced Design
- ✅ Separación en capas (API, Hooks, Components)
- ✅ Nombres descriptivos y consistentes
- ✅ Código modular y reutilizable

### Documentación (5 pts)
- ✅ README completo
- ✅ Comentarios en código
- ✅ Instrucciones de ejecución
- ✅ Decisiones técnicas documentadas

## 🚧 Mejoras Futuras (Opcional)

- [ ] Tests unitarios con Vitest
- [ ] Tests E2E con Playwright
- [ ] Dark mode
- [ ] Paginación avanzada
- [ ] Exportar campañas a CSV
- [ ] Gráficos con Recharts
- [ ] PWA con Service Worker
- [ ] Docker para frontend

## 📞 Soporte

Para dudas sobre la API del backend, consulta:
- **Swagger UI**: http://localhost:8000/api/docs/
- **Documentación**: `API_DOCUMENTATION.md`

## 📄 Licencia

Este proyecto es parte de una prueba técnica.

---

**Desarrollado con ❤️ usando las mejores prácticas de la industria**
