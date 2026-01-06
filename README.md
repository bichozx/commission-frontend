Commission Frontend (Provisional)

Repositorio provisional del frontend de Commission App, desplegado en: https://commission-frontend-nine.vercel.app/login

prueba= danger5@test.com
pasword=Password123

Tecnologías

Next.js 13+

TypeScript

TailwindCSS

Zustand para manejo de estado global

Axios para consumo de API REST

Vercel para despliegue

Scripts disponibles

# Instalar dependencias

npm install

# Correr en modo desarrollo

npm run dev

# Compilar y exportar versión de producción

npm run build
npm run start

# Linting

npm run lint

El frontend corre por defecto en: http://localhost:3000

Variables de entorno

Crea un archivo .env.local en la raíz del proyecto:

NEXT_PUBLIC_API_URL=https://commission-backend-11px.onrender.com
NEXT_PUBLIC_AUTH_TOKEN=<tu_token_de_prueba>

Nota: NEXT*PUBLIC* es necesario para exponer las variables al cliente en Next.js.

Estructura principal
/pages
├─ index.tsx # Home / Dashboard
├─ \_app.tsx # Configuración global (Zustand, Tailwind)
└─ api/ # Llamadas API (opcional)
/components
├─ ParticipantCard.tsx
├─ ParticipantTree.tsx
└─ ...otros componentes
/services
├─ affiliate.ts # Llamadas a /affiliates/tree y jerarquía
├─ commissionservice.ts
└─ hierarchyUtils.ts # buildHierarchy y flattenHierarchy
/types
└─ hirerachy.ts # Interfaces Participant, AffiliateTreeNode
/store
└─ commissionStore.ts # Zustand store

Consumo de API

Obtener árbol de afiliados

import { affiliateTree } from '@/services/affiliate';

const tree = await affiliateTree(userId, token);
console.log(tree);

Ejemplo de respuesta:

{
"id": "9ffaf2f0-7a5d-4922-a0ba-67c272d17257",
"name": "Napoleon Robertpo",
"email": "danger5@test.com",
"level": 2,
"totalEarned": 250,
"status": "active",
"parentId": "088973b7-e56b-4036-aed9-47f5590f3c5f",
"children": [
{
"id": "08a6ca6f-0aad-4eca-ba47-bf3b214592ae",
"name": "Eliana Martha",
"email": "danger6@test.com",
"level": 3,
"totalEarned": 0,
"status": "active",
"parentId": "9ffaf2f0-7a5d-4922-a0ba-67c272d17257",
"children": []
}
]
}

Otros endpoints

GET /affiliates/hierarchy

GET /affiliates/tree/:id

POST /affiliates

PUT /affiliates/:id

GET /affiliates?level=<number>

Estado global con Zustand
import { useCommissionStore } from '@/store/commissionStore';

const { participants, flatParticipants, fetchHierarchyData } = useCommissionStore();

useEffect(() => {
fetchHierarchyData(userId, token);
}, [userId, token]);

participants → árbol jerárquico

flatParticipants → lista plana para tablas o filtros

Visualización

Componente ParticipantCard
Muestra nombre, email, nivel, total ganado y referidos directos.

Componente ParticipantTree
Renderiza el árbol de afiliados de forma anidada.

Debug / Logs

console.log('🚀 affiliateTree response:', tree);

console.table(flatParticipants);

Útil para verificar que la jerarquía se normaliza correctamente.

Despliegue en Vercel

Este proyecto ya está desplegado en: https://commission-frontend-nine.vercel.app/login

Para actualizar: git push → Vercel detecta cambios y redeploy automático.
