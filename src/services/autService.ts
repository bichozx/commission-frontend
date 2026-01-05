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

  return {
    token: data.access_token,
    userAffiliateId: data.affiliate.id,
    level: data.affiliate.level ?? 1,
  };
}
