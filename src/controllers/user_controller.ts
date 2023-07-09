import { Database } from '../models/index.ts';
import { response_json } from '../helpers/index.ts';
import { UserRepository } from '../repositories/index.ts';
import { Request, Response } from 'https://deno.land/x/oak@v12.6.0/mod.ts';

// @desc    Get all user
// @route   GET /user
const index = async ({ response }: { response: Response }) => {
  try {
    UserRepository.index({ response, Database });
  } catch (error) {
    response_json(response, 500, {
      success: true,
      message: error.toString(),
      data: []
    });
  } finally {
    await Database.end();
  }
};

// @desc    Create single user
// @route   POST /user
const create = async ({ response, request }: { response: Response, request: Request }) => {
  try {
    UserRepository.create({ response, request, Database });
  } catch (error) {
    response_json(response, 500, {
      success: true,
      message: error.toString(),
      data: []
    });
  } finally {
    await Database.end();
  }
};

// @desc    Get single user
// @route   GET /user/:id
const find = async ({ response, params }: { response: Response, params: { id: string } }) => {
  try {
    UserRepository.find({ response, params, Database });
  } catch (error) {
    response_json(response, 500, {
      success: true,
      message: error.toString(),
      data: []
    });
  } finally {
    await Database.end();
  }
};

// @desc    Update single user
// @route   PUT /user/:id
const update = async ({ response, request, params }: { response: Response, request: Request, params: { id: string } }) => {
  try {
    UserRepository.update({ response, request, params, Database });
  } catch (error) {
    response_json(response, 500, {
      success: true,
      message: error.toString(),
      data: []
    });
  } finally {
    await Database.end();
  }
};

// @desc    Delete single user
// @route   DELETE /user/:id
const destroy = async ({ response, params }: { response: Response, params: { id: string } }) => {
  try {
    UserRepository.destroy({ response, params, Database });
  } catch (error) {
    response_json(response, 500, {
      success: true,
      message: error.toString(),
      data: []
    });
  } finally {
    await Database.end();
  }
};

export {
  index,
  create,
  find,
  update,
  destroy
}