import { debug } from '../helpers/debug.ts';
import { Database } from '../configs/_index.ts';
import { QueryObjectResult } from "https://deno.land/x/postgres@v0.17.0/query/query.ts";

/**
 * @desc Base model class
 * 
 * @class BaseModel
 */
class BaseModel {
  /**
   * @desc Table name
   * 
   * @var string
   */
  #table: string;

  /**
   * @desc Constructor
   * 
   * @param table string
   */
  constructor(table: string) {
    this.#table = table;
  }

  /**
   * @desc Get data from database
   * 
   * @param column string
   * @param where string
   * 
   * @returns QueryObjectResult<T> | QueryObjectResult<unknown>
   */
  async get<T>({ column, where = '' }: { column: string, where?: string }): Promise<QueryObjectResult<T>> {
    let data: QueryObjectResult<T>;
    await Database.connect();
    
    try {
      data = await Database.queryObject<T>(`select ${column} from ${this.#table} ${where ? `where ${where}` : ''}`);
    } catch (error) {
      debug('error', error);
      throw new Error(error.toString());
    } finally {
      await Database.end();
    }

    debug('log', data.query);
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
  async create<T>({ column, value, returning = '' }: { column: string, value: string, returning?: string }): Promise<QueryObjectResult<T>> {
    await Database.connect();
    const data = await Database.queryObject<T>(`insert into ${this.#table} (${column}) values (${value}) returning ${returning || '*'}`);
    await Database.end();

    debug('log', data.query);
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
  async update<T>({ column, value, where = '', returning = '' }: { column: string, value: string, where?: string, returning?: string }): Promise<QueryObjectResult<T>> {
    let updateQuery;
    
    if (column.split(',').length > 1) {
      const columnArray = column.split(',');
      const valueArray = value.split(',');
      const updateArray = columnArray.map((item, index) => `${item.trim()} = ${valueArray[index].trim()}`);
      updateQuery = updateArray.join(', ');
    }
    
    await Database.connect();
    const data = await Database.queryObject<T>(`update ${this.#table} set ${updateQuery} ${where ? `where ${where}` : ''} returning ${returning || '*'}`);
    await Database.end();

    debug('log', data.query);
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
  async destroy<T>({ where = '', returning = '' }: { where?: string, returning?: string }): Promise<QueryObjectResult<T>> {
    await Database.connect();
    const data = await Database.queryObject<T>(`delete from ${this.#table} ${where ? `where ${where}` : ''} returning ${returning || '*'}`);
    await Database.end();

    debug('log', data.query);
    return data;
  }
}

export default BaseModel;
