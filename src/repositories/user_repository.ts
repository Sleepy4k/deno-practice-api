import type { UserType } from '../types/index.ts';
import { response_json } from '../helpers/index.ts';
import { Client } from 'https://deno.land/x/postgres@v0.17.0/mod.ts';
import { Request, Response } from 'https://deno.land/x/oak@v12.6.0/mod.ts';

// @desc    Handle query for get users
const index = async ({ response, Database }: { response: Response, Database: Client }) => {
  await Database.connect();

  const data = await Database.queryObject<UserType>('select id, email, role from users');
  
  response_json(response, 200, {
    success: true,
    message: 'Successfully get all users',
    data: data.rows
  });
};

// @desc    Handle query for create user
const create = async ({ response, request, Database }: { response: Response, request: Request, Database: Client }) => {
  await Database.connect();

  const body = request.body();
  const { email, password, password_confirmation } = await body.value;

  if (!email || !password || !password_confirmation) {
    return response_json(response, 400, {
      success: false,
      message: 'Email, password, and password confirmation are required',
      data: []
    });
  }

  if (password !== password_confirmation) {
    return response_json(response, 400, {
      success: false,
      message: 'Password confirmation not match',
      data: []
    });
  }

  const validate = await Database.queryObject<UserType>(`select id, email, role from users where email = '${email}'`);

  if (validate.rowCount !== 0) {
    return response_json(response, 400, {
      success: false,
      message: 'Email already exists',
      data: []
    });
  }

  const data = await Database.queryObject<UserType>(`insert into users (email, role, password) values ('${email}', 'user', '${password}') returning id, email, role`);
  
  response_json(response, 201, {
    success: true,
    message: 'Successfully create user',
    data: data.rows
  });
};

// @desc    Handle query for get single user
const find = async ({ response, params, Database }: { response: Response, params: { id: string }, Database: Client }) => {
  await Database.connect();

  const data = await Database.queryObject<UserType>(`select id, email, role from users where id = ${params.id}`);
  
  if (data.rowCount === 0) {
    response_json(response, 404, {
      success: false,
      message: 'User not found',
      data: []
    });
  } else {
    response_json(response, 200, {
      success: true,
      message: 'Successfully get user',
      data: data.rows
    });
  }
};

// @desc    Handle query for update single user
const update = async ({ response, request, params, Database }: { response: Response, request: Request, params: { id: string }, Database: Client }) => {
  await Database.connect();

  const body = request.body();
  const { email, password, password_confirmation } = await body.value;

  if (!email || !password || !password_confirmation) {
    return response_json(response, 400, {
      success: false,
      message: 'Email, password, and password confirmation are required',
      data: []
    });
  }

  if (password !== password_confirmation) {
    return response_json(response, 400, {
      success: false,
      message: 'Password confirmation not match',
      data: []
    });
  }

  const validate = await Database.queryObject<UserType>(`select id, email, role from users where email = '${email}'`);

  if (validate.rowCount !== 0) {
    return response_json(response, 400, {
      success: false,
      message: 'Email already exists',
      data: []
    });
  }

  const data = await Database.queryObject<UserType>(`update users set email = '${email}', password = '${password}' where id = ${params.id} returning id, email, role`);
  
  if (data.rowCount === 0) {
    response_json(response, 404, {
      success: false,
      message: 'User not found',
      data: []
    });
  } else {
    response_json(response, 200, {
      success: true,
      message: 'Successfully update user',
      data: data.rows
    });
  }
};

// @desc    Handle query for delete single user
const destroy = async ({ response, params, Database }: { response: Response, params: { id: string }, Database: Client }) => {
  await Database.connect();

  const data = await Database.queryObject<UserType>(`delete from users where id = ${params.id} returning id, email, role`);
  
  if (data.rowCount === 0) {
    response_json(response, 404, {
      success: false,
      message: 'User not found',
      data: []
    });
  } else {
    response_json(response, 200, {
      success: true,
      message: 'Successfully delete user',
      data: data.rows
    });
  }
};

export {
  index,
  create,
  find,
  update,
  destroy
}