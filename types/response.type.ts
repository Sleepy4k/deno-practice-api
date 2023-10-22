/**
 * @desc Response type
 * 
 * @interface ResponseType
 */
interface ResponseType {
  success: boolean;
  message: string;
  data: object;
}

export type { ResponseType };