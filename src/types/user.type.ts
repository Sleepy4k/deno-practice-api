interface UserType {
  id: number;
  email: string;
  role: string;
}

interface FullUserType {
  id: number;
  email: string;
  role: string;
  password: string;
}

export type { UserType, FullUserType };