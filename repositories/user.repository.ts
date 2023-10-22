import { userModel } from '../models/_index.ts';
import { hash_password } from "../helpers/hashing.ts";
import type { UserType, FullUserType } from '../types/_index.ts';
import { Request } from 'https://deno.land/x/oak@v12.6.0/mod.ts';

/**
 * @desc User Repository Class
 * 
 * @class UserRepository
 */
class UserRepository {
  /**
   * @desc UserModel
   * 
   * @private
   * @static
   */
  static #userModel = new userModel();

  /**
   * @desc Get data from database
   * 
   * @param column string
   * @param where string
   * 
   * @returns QueryObjectResult<T> | QueryObjectResult<unknown>
   */
  static async index() {
    const data = await UserRepository.#userModel.get<UserType>({ column: 'id, email, role' });

    return data;
  }

  /**
   * @desc Create data to database
   * 
   * @param column string
   * @param value string
   * @param returning string
   * 
   * @returns QueryObjectResult<T> | QueryObjectResult<unknown>
   */
  static async create({ request }: { request: Request }) {
    const body = request.body();
    const { email, password, password_confirmation } = await body.value;

    if (!email || !password || !password_confirmation) return "Email, password, and password confirmation are required";
    if (password !== password_confirmation) return "Password confirmation not match";

    const validate = await UserRepository.#userModel.get<FullUserType>({ column: '*', where: `email = '${email}'` });
    if (validate.rowCount !== 0) return "Email already exists";

    const password_hash = await hash_password(password);
    const data = await UserRepository.#userModel.create<UserType>({ column: 'email, role, password', value: `'${email}', 'user', '${password_hash}'`, returning: 'id, email, role' });

    return data;
  }

  /**
   * @desc Get data from database
   * 
   * @param column string
   * @param where string
   * 
   * @returns QueryObjectResult<T> | QueryObjectResult<unknown>
   */
  static async find({ id }: { id: string }) {
    const data = await UserRepository.#userModel.get<UserType>({ column: 'id, email, role', where: `id = ${id}` });
    if (data.rowCount === 0) return "User not found";

    return data;
  }

  /**
   * @desc Update data to database
   * 
   * @param column string
   * @param value string
   * @param where string
   * @param returning string
   * 
   * @returns QueryObjectResult<T> | QueryObjectResult<unknown>
   */
  static async update({ request, id }: { request: Request, id: string }) {
    const body = request.body();
    const { email, password, password_confirmation } = await body.value;

    if (!email || !password || !password_confirmation) return "Email, password, and password confirmation are required";
    if (password !== password_confirmation) return "Password confirmation not match";

    const validate = await UserRepository.#userModel.get<FullUserType>({ column: '*', where: `email = '${email}'` });
    if (validate.rowCount === 0) return "User not found";
    if (validate.rowCount !== 0 && validate.rows[0].id !== parseInt(id)) return "Email already exists";

    const password_hash = (await hash_password(password)).split(",").join("|");
    const data = await UserRepository.#userModel.update<UserType>({ column: 'email, password', value: `'${email}', '${password_hash.toString()}'`, where: `id = ${id}`, returning: 'id, email, role' });

    return data;
  }

  /**
   * @desc Delete data from database
   * 
   * @param where string
   * @param returning string
   * 
   * @returns QueryObjectResult<T> | QueryObjectResult<unknown>
   */
  static async destroy({ id }: { id: string }) {
    const data = await UserRepository.#userModel.destroy<UserType>({ where: `id = ${id}`, returning: 'id, email, role' });
    if (data.rowCount === 0) return "User not found";

    return data;
  }
}

export default UserRepository;
