/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// 'use client';

// import { login as loginService } from '@/services/autService';
// import { useAuth } from '@/hooks/useAuth';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';

// export default function LoginPage() {
//   const router = useRouter();
//   const { login } = useAuth();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const data = await loginService(email, password);
//       console.log(data);

//       // Mapea correctamente la respuesta del backend
//       const token = data.token;
//       const userId = data.userId;
//       const level = data.level;

//       login(token, userId, level); // <- ahora todo tiene valor

//       router.push('/dashboard'); // Redirige al dashboard
//     } catch (err: any) {
//       setError(err.response?.data?.message || 'Login failed');
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="p-2 border rounded"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="p-2 border rounded"
//         />
//         <button type="submit" className="bg-blue-600 text-white p-2 rounded">
//           Login
//         </button>
//         {error && <span className="text-red-500">{error}</span>}
//       </form>
//     </div>
//   );
// }

// src/app/login/page.tsx
'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Aquí llamarías a tu API real de login
      // Ejemplo:
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });

      // const data = await response.json();

      // Simulación de respuesta exitosa
      const mockResponse = {
        token: 'mock-jwt-token-12345',
        userId: 'e078c59f-6225-4372-8532-92f4f54f0fcf',
        level: 3,
        user: {
          id: 'e078c59f-6225-4372-8532-92f4f54f0fcf',
          name: 'Eliana Martha',
          email: formData.email,
        },
      };

      // Guardar en el store
      login(
        mockResponse.token,
        mockResponse.userId,
        mockResponse.level,
        mockResponse.user
      );

      // Redirigir al dashboard
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Error en el login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Contraseña</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
}
