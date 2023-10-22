import BaseModel from './base.model.ts';

/**
 * @desc User model class
 * 
 * @class UserModel
 */
class UserModel extends BaseModel {
  /**
   * @desc Constructor
   * 
   * @param table string
   */
  constructor() {
    super('users');
  }
}

export default UserModel;
