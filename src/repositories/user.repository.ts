import type { UserType, FullUserType } from '../types/_index.ts';
import { Request } from 'https://deno.land/x/oak@v12.6.0/mod.ts';
import { Client } from 'https://deno.land/x/postgres@v0.17.0/mod.ts';

/**
 * @desc Handle query for get users
 * 
 * @param Database Client
 * 
 * @returns QueryObjectResult<UserType>
 */
const index = async ({ Database }: { Database: Client }) => {
  await Database.connect();
  const data = await Database.queryObject<UserType>('select id, email, role from users');
  await Database.end();

  return data;
};

/**
 * @desc Handle query for create user
 * 
 * @param request Request
 * @param Database Client
 * 
 * @returns QueryObjectResult<UserType> | string
 */
const create = async ({ request, Database }: { request: Request, Database: Client }) => {
  const body = request.body();
  const { email, password, password_confirmation } = await body.value;

  if (!email || !password || !password_confirmation) {
    return "Email, password, and password confirmation are required";
  }

  if (password !== password_confirmation) {
    return "Password confirmation not match";
  }

  await Database.connect();
  const validate = await Database.queryObject<UserType>(`select id, email, role from users where email = '${email}'`);

  if (validate.rowCount !== 0) {
    await Database.end();
    return "Email already exists";
  }

  const data = await Database.queryObject<UserType>(`insert into users (email, role, password) values ('${email}', 'user', '${password}') returning id, email, role`);
  await Database.end();
  
  return data;
};

/**
 * @desc Handle query for get single user
 * 
 * @param id string
 * @param Database Client
 * 
 * @returns QueryObjectResult<UserType> | string
 */
const find = async ({ id, Database }: { id: string, Database: Client }) => {
  await Database.connect();

  const data = await Database.queryObject<UserType>(`select id, email, role from users where id = ${id}`);
  await Database.end();
  
  if (data.rowCount === 0) {
    return "User not found";
  }

  return data;
};

/**
 * @desc Handle query for update single user
 * 
 * @param request Request
 * @param id string
 * @param Database Client
 * 
 * @returns QueryObjectResult<UserType> | string
 */
const update = async ({ request, id, Database }: { request: Request, id: string, Database: Client }) => {
  const body = request.body();
  const { email, password, password_confirmation } = await body.value;

  if (!email || !password || !password_confirmation) {
    return "Email, password, and password confirmation are required";
  }

  if (password !== password_confirmation) {
    return "Password confirmation not match";
  }

  await Database.connect();
  const validate = await Database.queryObject<FullUserType>(`select id, email, role, password from users where email = '${email}'`);

  if (validate.rowCount !== 0) {
    await Database.end();
    return "Email already exists";
  }

  const data = await Database.queryObject<UserType>(`update users set email = '${email}', password = '${password}' where id = ${id} returning id, email, role`);
  await Database.end();

  if (data.rowCount === 0) {
    return "User not found";
  }

  return data;
};

/**
 * @desc Handle query for delete single user
 * 
 * @param id string
 * @param Database Client
 * 
 * @returns QueryObjectResult<UserType> | string
 */
const destroy = async ({ id, Database }: { id: string, Database: Client }) => {
  await Database.connect();

  const data = await Database.queryObject<UserType>(`delete from users where id = ${id} returning id, email, role`);
  await Database.end();
  
  if (data.rowCount === 0) {
    return "User not found";
  }

  return data;
};

export {
  index,
  create,
  find,
  update,
  destroy
}