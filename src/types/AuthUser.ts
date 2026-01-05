export interface AuthAffiliate {
  id: string;
  level: number;
  commissionRate?: number;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface AuthState {
  token: string | null;
  user: AuthUser | null;
  affiliateId: string | null;
  affiliate: AuthAffiliate | null;
  isHydrated: boolean;

  login: (payload: {
    token: string;
    user: AuthUser;
    affiliate: AuthAffiliate | null;
  }) => void;

  logout: () => void;
}
