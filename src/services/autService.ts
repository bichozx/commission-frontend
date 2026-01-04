// import { LoginPayload } from '@/types/user';

// export async function login(
//   email: string,
//   password: string,
//   payload: LoginPayload
// ) {
//   const res = await fetch(
//     'https://commission-backend-11px.onrender.com/auth/login',
//     {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(payload),
//     }
//   );

//   if (!res.ok) {
//     const error = await res.json();
//     throw new Error(error.message || 'Login failed');
//   }

//   return res.json(); // devuelve { token, user }
// }
// authService.ts
export async function loginService(email: string, password: string) {
  const res = await fetch(
    'https://commission-backend-11px.onrender.com/auth/login',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }
  );

  if (!res.ok) throw await res.json();

  const data = await res.json();

  // data debe contener token, userId y level
  return {
    token: data.access_token,
    userAffiliateId: data.affiliate.id,
    level: data.affiliate.level ?? 1, // default 1 si no viene
  };
}
