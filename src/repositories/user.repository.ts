import { userModel } from '../models/_index.ts';
import type { UserType, FullUserType } from '../types/_index.ts';
import { Request } from 'https://deno.land/x/oak@v12.6.0/mod.ts';

/**
 * @desc Handle query for get users
 * 
 * @returns QueryObjectResult<UserType>
 */
const index = async () => {
  const data = await userModel.get<UserType>({ column: 'id, email, role' });
  return data;
};

/**
 * @desc Handle query for create user
 * 
 * @param request Request
 * 
 * @returns QueryObjectResult<UserType> | string
 */
const create = async ({ request }: { request: Request }) => {
  const body = request.body();
  const { email, password, password_confirmation } = await body.value;

  if (!email || !password || !password_confirmation) return "Email, password, and password confirmation are required";
  if (password !== password_confirmation) return "Password confirmation not match";

  const validate = await userModel.get<UserType>({ column: 'id, email, role', where: `email = '${email}'` });
  if (validate.rowCount !== 0) return "Email already exists";

  const data = await userModel.create<UserType>({ column: 'email, role, password', value: `'${email}', 'user', '${password}'`, returning: 'id, email, role' });
  return data;
};

/**
 * @desc Handle query for get single user
 * 
 * @param id string
 * 
 * @returns QueryObjectResult<UserType> | string
 */
const find = async ({ id }: { id: string }) => {
  const data = await userModel.get<UserType>({ column: 'id, email, role', where: `id = ${id}` });
  if (data.rowCount === 0) return "User not found";

  return data;
};

/**
 * @desc Handle query for update single user
 * 
 * @param request Request
 * @param id string
 * 
 * @returns QueryObjectResult<UserType> | string
 */
const update = async ({ request, id }: { request: Request, id: string }) => {
  const body = request.body();
  const { email, password, password_confirmation } = await body.value;

  if (!email || !password || !password_confirmation) return "Email, password, and password confirmation are required";
  if (password !== password_confirmation) return "Password confirmation not match";

  const validate = await userModel.get<FullUserType>({ column: '*', where: `email = '${email}'` });
  if (validate.rowCount !== 0) return "Email already exists";

  const data = await userModel.update<UserType>({ column: 'email, password', value: `'${email}', '${password}'`, where: `id = ${id}`, returning: 'id, email, role' });
  if (data.rowCount === 0) return "User not found";

  return data;
};

/**
 * @desc Handle query for delete single user
 * 
 * @param id string
 * 
 * @returns QueryObjectResult<UserType> | string
 */
const destroy = async ({ id }: { id: string }) => {
  const data = await userModel.destroy<UserType>({ where: `id = ${id}`, returning: 'id, email, role' });
  if (data.rowCount === 0) return "User not found";

  return data;
};

export {
  index,
  create,
  find,
  update,
  destroy
}