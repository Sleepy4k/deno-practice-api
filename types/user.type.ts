/**
 * @desc User type
 * 
 * @interface UserType
 */
interface UserType {
  id: number;
  email: string;
  role: string;
}

/**
 * @desc Full user type
 * 
 * @interface FullUserType
 */
interface FullUserType {
  id: number;
  email: string;
  role: string;
  password: string;
}

export type { UserType, FullUserType };