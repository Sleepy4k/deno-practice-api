import { Database } from '../models/_index.ts';
import { response_json } from '../helpers/_index.ts';
import { UserRepository } from '../repositories/_index.ts';
import { Status, RouterContext } from 'https://deno.land/x/oak@v12.6.0/mod.ts';

/**
 * @desc Get all users
 * 
 * @param context RouterContext<"/user">
 * 
 * @return void
 */
const index = async (context: RouterContext<"/user">) => {
  try {
    const data = await UserRepository.index({ Database });

    response_json(context, Status.OK, {
      success: true,
      message: 'Successfully get all users',
      data: data.rows
    });
  } catch (error) {
    response_json(context, Status.InternalServerError, {
      success: false,
      message: error.toString(),
      data: []
    });
  }
};

/**
 * @desc Create single user
 * 
 * @param context RouterContext<"/user">
 * 
 * @return void
 */
const create = async (context: RouterContext<"/user">) => {
  try {
    const request = context.request;
    const data = await UserRepository.create({ request, Database });

    if (typeof(data) === 'string') {
      return response_json(context, Status.BadRequest, {
        success: false,
        message: data,
        data: []
      });
    }

    response_json(context, Status.Created, {
      success: true,
      message: 'Successfully create user',
      data: data.rows
    });
  } catch (error) {
    response_json(context, 500, {
      success: false,
      message: error.toString(),
      data: []
    });
  }
};

/**
 * @desc Get single user
 * 
 * @param context RouterContext<"/user">
 * 
 * @return void
 */
const find = async (context: RouterContext<"/user/:id">) => {
  try {
    const id = context.params.id as string;
    const data = await UserRepository.find({ id, Database });

    if (typeof(data) == 'string') {
      return response_json(context, Status.NotFound, {
        success: false,
        message: data,
        data: []
      });
    }

    response_json(context, Status.OK, {
      success: true,
      message: 'Successfully get single user',
      data: data.rows
    });
  } catch (error) {
    response_json(context, 500, {
      success: true,
      message: error.toString(),
      data: []
    });
  }
};

/**
 * @desc Update single user
 * 
 * @param context RouterContext<"/user">
 * 
 * @return void
 */
const update = async (context: RouterContext<"/user/:id">) => {
  try {
    const request = context.request;
    const id = context.params.id as string;
    const data = await UserRepository.update({ request, id, Database });

    if (typeof(data) == 'string') {
      return response_json(context, Status.NotFound, {
        success: false,
        message: data,
        data: []
      });
    }

    response_json(context, Status.OK, {
      success: true,
      message: 'Successfully update single user',
      data: data.rows
    });
  } catch (error) {
    response_json(context, 500, {
      success: true,
      message: error.toString(),
      data: []
    });
  }
};

/**
 * @desc Delete single user
 * 
 * @param context RouterContext<"/user">
 * 
 * @return void
 */
const destroy = async (context: RouterContext<"/user/:id">) => {
  try {
    const id = context.params.id as string;
    const data = await UserRepository.destroy({ id, Database });

    if (typeof(data) == 'string') {
      return response_json(context, Status.NotFound, {
        success: false,
        message: data,
        data: []
      });
    }

    response_json(context, Status.OK, {
      success: true,
      message: 'Successfully delete user',
      data: data.rows
    });
  } catch (error) {
    response_json(context, 500, {
      success: true,
      message: error.toString(),
      data: []
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