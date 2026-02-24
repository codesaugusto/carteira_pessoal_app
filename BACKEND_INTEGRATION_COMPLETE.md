# 🔧 Guia Completo de Integração Backend - Carteira Pessoal App

## 📋 Índice

1. [Arquitetura da Aplicação](#arquitetura)
2. [Autenticação](#autenticação)
3. [Endpoints Necessários](#endpoints)
4. [Estrutura de Dados](#estrutura-de-dados)
5. [Fluxos de Integração](#fluxos-de-integração)
6. [Exemplo de Implementação](#exemplo-de-implementação)
7. [Tratamento de Erros](#tratamento-de-erros)
8. [Boas Práticas](#boas-práticas)

---

## 📐 Arquitetura {#arquitetura}

### Estrutura de Pastas

```
src/
├── components/
│   ├── Avatar/              # Componente de avatar do usuário
│   ├── BottomNav/           # Navegação inferior
│   ├── Header/              # Header com notificações
│   ├── Home/                # Dashboard principal
│   ├── Categorias/          # Gerenciamento de categorias
│   ├── Carteira/            # Carteira/Transações
│   ├── Config/              # Configurações e perfil
│   └── Notifications/       # Painel de notificações
├── pages/
│   ├── MeuPerfil.tsx        # Visualização do perfil
│   └── EditProfile.tsx      # Edição do perfil
├── utils/
│   ├── notifications/       # Sistema de notificações (contexto)
│   └── util.ts             # Utilitários
└── App.tsx                  # App principal com roteamento
```

### Fluxo de Navegação

```
App.tsx
  ├── NotificationProvider (Global)
  ├── Header (com notificações)
  ├── Pages (renderizadas por índice)
  │   ├── 0: Home (Dashboard)
  │   ├── 1: Categorias
  │   ├── 2: Carteira
  │   └── 3: Config (Perfil/Configurações)
  ├── BottomNav (Navegação)
  └── NotificationPanel (Modal)
```

---

## 🔐 Autenticação {#autenticação}

### Fluxo de Login (A Implementar)

**Estrutura recomendada para adicionar autenticação:**

```tsx
// src/utils/authContext.tsx (NOVO)
import React, { createContext, useContext, useState } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        localStorage.setItem("token", data.token);
      } else {
        throw new Error(data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const updateProfile = async (data: Partial<User>) => {
    const response = await fetch("/api/profile/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify(data),
    });

    const updated = await response.json();
    if (response.ok) {
      setUser({ ...user, ...updated });
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
};
```

### Token Management

- Armazenar token em `localStorage`
- Incluir em headers de todas as requisições: `Authorization: Bearer {token}`
- Implementar refresh token para expiração

```tsx
// Interceptor para adicionar token automaticamente
const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("token");
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };
  return fetch(url, { ...options, headers });
};
```

---

## 🔌 Endpoints Necessários {#endpoints}

### 1. **Autenticação**

#### POST `/api/auth/login`

```typescript
// Request
{
  email: string;
  password: string;
}

// Response
{
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  token: string;
  expiresIn: number;
}
```

#### POST `/api/auth/register`

```typescript
// Request
{
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

// Response
{
  user: {
    (id, name, email);
  }
  token: string;
}
```

#### POST `/api/auth/refresh`

```typescript
// Request (vazio, usa token do header)

// Response
{
  token: string;
  expiresIn: number;
}
```

---

### 2. **Perfil do Usuário**

#### GET `/api/profile`

```typescript
// Response
{
  id: string;
  name: string;
  email: string;
  avatar?: string;
  fallback: string;
  joinDate: string; // ISO date
}
```

#### PUT `/api/profile/update`

```typescript
// Request (FormData)
{
  name?: string;
  avatar?: File; // Imagem
}

// Response
{
  id: string;
  name: string;
  email: string;
  avatar?: string;
  fallback: string;
}
```

---

### 3. **Dashboard / Home**

#### GET `/api/dashboard`

```typescript
// Response
{
  balance: number;           // Saldo atual
  spent: number;             // Gasto do mês
  percentSpent: number;      // Percentual de gastos (0-100)
  recentExpenses: {
    id: string;
    name: string;
    description: string;
    amount: number;
    categoryId: string;
    date: string; // ISO date
    icon?: string;
  }[];
  topCategories: {
    id: string;
    name: string;
    spent: number;
    color: string;
  }[];
}
```

---

### 4. **Categorias**

#### GET `/api/categories`

```typescript
// Response
{
  categories: {
    id: string;
    name: string;
    color: string;
    icon?: string;
    spent?: number;
    budget?: number;
  }[];
}
```

#### POST `/api/categories`

```typescript
// Request
{
  name: string;
  color: string;
  icon?: string;
  budget?: number;
}

// Response
{
  id: string;
  name: string;
  color: string;
}
```

#### PUT `/api/categories/:id`

```typescript
// Request
{
  name?: string;
  color?: string;
  budget?: number;
}

// Response
{ id, name, color }
```

#### DELETE `/api/categories/:id`

```typescript
// Response
{
  success: true;
}
```

---

### 5. **Transações / Carteira**

#### GET `/api/transactions`

```typescript
// Query Parameters
{
  month?: number;           // 0-11
  year?: number;
  categoryId?: string;
  limit?: number;
  offset?: number;
}

// Response
{
  transactions: {
    id: string;
    name: string;
    amount: number;
    categoryId: string;
    category?: { name, color };
    date: string; // ISO date
    description?: string;
    type: "income" | "expense";
  }[];
  total: number;
  count: number;
}
```

#### POST `/api/transactions`

```typescript
// Request
{
  name: string;
  amount: number;
  categoryId: string;
  date: string; // ISO date
  description?: string;
  type: "income" | "expense";
}

// Response
{
  id: string;
  name: string;
  amount: number;
  categoryId: string;
  date: string;
}
```

#### PUT `/api/transactions/:id`

```typescript
// Request
{
  name?: string;
  amount?: number;
  categoryId?: string;
  date?: string;
  description?: string;
}

// Response
{ id, ...updated }
```

#### DELETE `/api/transactions/:id`

```typescript
// Response
{
  success: true;
}
```

---

### 6. **Notificações**

#### GET `/api/notifications`

```typescript
// Response
{
  notifications: {
    id: number;
    title: string;
    message: string;
    type: "success" | "warning" | "error" | "info";
    read: boolean;
    timestamp: string; // ISO date
  }
  [];
}
```

#### PUT `/api/notifications/:id/read`

```typescript
// Response
{ id, read: true }
```

#### DELETE `/api/notifications/:id`

```typescript
// Response
{
  success: true;
}
```

---

## 📊 Estrutura de Dados {#estrutura-de-dados}

### User

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  password?: string; // Nunca retornar
  joinDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

### Transaction

```typescript
interface Transaction {
  id: string;
  userId: string;
  name: string;
  amount: number;
  categoryId: string;
  type: "income" | "expense";
  date: Date;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Category

```typescript
interface Category {
  id: string;
  userId: string;
  name: string;
  color: string;
  icon?: string;
  budget?: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Notification

```typescript
interface Notification {
  id: number;
  userId: string;
  title: string;
  message: string;
  type: "success" | "warning" | "error" | "info";
  read: boolean;
  timestamp: Date;
  createdAt: Date;
}
```

---

## 🔄 Fluxos de Integração {#fluxos-de-integração}

### 1. **Fluxo de Inicialização da App**

```tsx
// App.tsx (Modificado)
import { AuthProvider } from "./utils/authContext";
import { NotificationProvider } from "./utils/notifications";

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <AppContent />
      </NotificationProvider>
    </AuthProvider>
  );
}

function AppContent() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <LoginPage />; // A criar
  }

  return <MainApp />;
}
```

### 2. **Fluxo de Carregamento de Dashboard**

```tsx
// Home.tsx (Modificado)
import { useEffect, useState } from "react";
import { useAuth } from "../utils/authContext";
import { useNotifications } from "../utils/notifications";

const Home = () => {
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch("/api/dashboard", {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });

        if (!response.ok) throw new Error("Erro ao carregar dashboard");

        const data = await response.json();
        setDashboard(data);
      } catch (error) {
        addNotification("Erro", error.message, "error");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboard();
    }
  }, [user]);

  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      <BalanceCard balance={dashboard.balance} />
      <RecentExpenses expenses={dashboard.recentExpenses} />
    </div>
  );
};
```

### 3. **Fluxo de Atualização de Perfil**

```tsx
// EditProfile.tsx (Modificado - método handleSaveProfile)
const handleSaveProfile = async () => {
  setIsLoading(true);
  try {
    const formData = new FormData();
    formData.append("name", profile.name);

    if (previewImage) {
      const blob = await fetch(previewImage).then((r) => r.blob());
      formData.append("avatar", blob, "profile.jpg");
    }

    const response = await fetch("/api/profile/update", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
      body: formData,
    });

    if (!response.ok) throw new Error("Erro ao salvar perfil");

    const updatedProfile = await response.json();
    await updateProfile(updatedProfile); // Atualizar context

    addNotification("Sucesso!", "Perfil atualizado com sucesso", "success");
    onBack();
  } catch (error) {
    addNotification("Erro", error.message, "error");
  } finally {
    setIsLoading(false);
  }
};
```

---

## 💻 Exemplo de Implementação {#exemplo-de-implementacao}

### API Client Service (Recomendado)

```typescript
// src/services/api.ts
class ApiClient {
  private baseURL =
    process.env.REACT_APP_API_URL || "http://localhost:3000/api";
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem("token");
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem("token", token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem("token");
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (this.token && !headers["Authorization"]) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      // Token expirado
      this.clearToken();
      window.location.href = "/login";
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Erro na requisição");
    }

    return data;
  }

  // Auth
  async login(email: string, password: string) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  async register(data: any) {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // Profile
  async getProfile() {
    return this.request("/profile");
  }

  async updateProfile(data: FormData) {
    return this.request("/profile/update", {
      method: "PUT",
      body: data,
      headers: {}, // Deixar browser definir Content-Type
    });
  }

  // Dashboard
  async getDashboard() {
    return this.request("/dashboard");
  }

  // Transactions
  async getTransactions(params?: any) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/transactions?${query}`);
  }

  async createTransaction(data: any) {
    return this.request("/transactions", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateTransaction(id: string, data: any) {
    return this.request(`/transactions/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteTransaction(id: string) {
    return this.request(`/transactions/${id}`, {
      method: "DELETE",
    });
  }

  // Categories
  async getCategories() {
    return this.request("/categories");
  }

  async createCategory(data: any) {
    return this.request("/categories", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateCategory(id: string, data: any) {
    return this.request(`/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteCategory(id: string) {
    return this.request(`/categories/${id}`, {
      method: "DELETE",
    });
  }
}

export const apiClient = new ApiClient();
```

### Uso do API Client

```tsx
// Home.tsx (Usando o client)
import { apiClient } from "../services/api";

const Home = () => {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    apiClient
      .getDashboard()
      .then((data) => setDashboard(data))
      .catch((error) => console.error(error));
  }, []);

  return <div>{/* ... */}</div>;
};
```

---

## ⚠️ Tratamento de Erros {#tratamento-de-erros}

### Códigos HTTP Esperados

| Código | Situação               |
| ------ | ---------------------- |
| 200    | Sucesso                |
| 201    | Criado com sucesso     |
| 400    | Erro de validação      |
| 401    | Não autenticado        |
| 403    | Não autorizado         |
| 404    | Recurso não encontrado |
| 500    | Erro do servidor       |

### Estrutura de Erro Padrão

```typescript
interface ErrorResponse {
  message: string;
  code?: string;
  errors?: { field: string; message: string }[];
}
```

### Tratamento Recomendado

```tsx
const handleRequest = async () => {
  try {
    const data = await apiClient.getDashboard();
    setData(data);
  } catch (error) {
    if (error instanceof Error) {
      const message = error.message;

      if (message.includes("401")) {
        // Redirecionar para login
        window.location.href = "/login";
      } else if (message.includes("network")) {
        addNotification("Erro", "Verifique sua conexão", "error");
      } else {
        addNotification("Erro", message, "error");
      }
    }
  }
};
```

---

## ✅ Boas Práticas {#boas-práticas}

### 1. **Variáveis de Ambiente**

```env
# .env
REACT_APP_API_URL=http://localhost:3000
REACT_APP_API_TIMEOUT=10000
```

### 2. **Paginação**

```typescript
// Em requisições que retornam muitos itens
GET /api/transactions?limit=20&offset=0
```

### 3. **Cache de Dados**

```tsx
// Implementar SWR ou React Query
import useSWR from "swr";

const { data, error } = useSWR("/api/dashboard", apiClient.getDashboard, {
  revalidateOnFocus: false,
  dedupingInterval: 60000, // 1 minuto
});
```

### 4. **Rate Limiting (Frontend)**

```tsx
// Prevenir múltiplos cliques
const [isSubmitting, setIsSubmitting] = useState(false);

const handleSave = async () => {
  if (isSubmitting) return;
  setIsSubmitting(true);
  try {
    // ... requisição
  } finally {
    setIsSubmitting(false);
  }
};
```

### 5. **Versionamento da API**

```typescript
// Usar caminho com versão
/api/1v / transactions / api / v2 / transactions;
```

### 6. **Validação no Frontend**

```tsx
const validateProfile = (profile: UserProfile): string[] => {
  const errors: string[] = [];

  if (!profile.name.trim()) {
    errors.push("Nome é obrigatório");
  }

  if (profile.name.length > 50) {
    errors.push("Nome não pode ter mais de 50 caracteres");
  }

  return errors;
};
```

### 7. **Loading States**

```tsx
// Sempre mostrar feedback de carregamento
{
  isLoading && <LoadingSpinner />;
}
{
  isLoading && (
    <button disabled>
      <Loader className="animate-spin" /> Salvando...
    </button>
  );
}
```

---

## 🚀 Checklist de Implementação

- [ ] Criar endpoint de autenticação (login, register)
- [ ] Implementar `AuthContext` na aplicação
- [ ] Criar `ApiClient` service
- [ ] Integrar Dashboard (GET `/api/dashboard`)
- [ ] Integrar Atualização de Perfil (PUT `/api/profile/update`)
- [ ] Integrar Categorias (CRUD)
- [ ] Integrar Transações (CRUD)
- [ ] Implementar tratamento de erros global
- [ ] Adicionar loading states
- [ ] Testar com Postman/Insomnia
- [ ] Implementar refresh token
- [ ] Adicionar logging
- [ ] Deploy em produção

---

## 📚 Documentação Adicional

- [Repositório Frontend](.)
- [Componentes React](./src/components)
- [Utilitários](./src/utils)
- [Páginas](./src/pages)

---

**Versão**: 1.0.0  
**Data**: 24/02/2026  
**Status**: 🟢 Pronto para Backend Development
