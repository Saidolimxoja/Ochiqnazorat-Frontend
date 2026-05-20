const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4200/api/v1';

// Проверяем, содержит ли URL уже /api/v1
const shouldAddPrefix = !API_URL.includes('/api/v1');

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: number;
    username: string;
    full_name: string;
    role_id: number;
    role_name: string;
    level: string;
    region_id: number | null;
    district_id: number | null;
  };
  access_token: string;
}

export interface UserProfile {
  id: number;
  username: string;
  full_name: string;
  pinfl: string;
  birthday_date: string;
  phone_number: string;
  responsible_module: string;
  temporary_modules: string[] | null;
  level: string;
  role_id: number;
  role_name: string;
  region_id: number | null;
  region_name: string | null;
  district_id: number | null;
  district_name: string | null;
  created_at: string;
  updated_at: string | null;
  is_blocked: boolean;
  is_deleted: boolean;
}

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_URL;
  }

  private getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('access_token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = this.getAuthToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const url = shouldAddPrefix ? `${this.baseUrl}/api/v1${endpoint}` : `${this.baseUrl}${endpoint}`;

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    return this.request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async getProfile(): Promise<UserProfile> {
    return this.request<UserProfile>('/auth/profile');
  }
}

export const apiClient = new ApiClient();
