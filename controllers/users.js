import HttpStatus from 'http-status';

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data,
  statusCode,
});

const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
  error: message,
}, statusCode);

class UsersController {
  constructor(User) {
    this.User = User;
  }

  getAll() {
    return this.User.findAll({})
            .then(result => defaultResponse(result))
            .catch(error => errorResponse(error.message));
  }

  findById(params) {
    return this.User.findOne({ where: params })
            .then(result => defaultResponse(result))
            .catch(error => errorResponse(error.message));
  }

  create(user) {
    return this.User.create(user)
            .then(result => defaultResponse(result, HttpStatus.CREATED))
            .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  update(user, params) {
    return this.User.update(user, { where: params })
            .then(result => defaultResponse(result))
            .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  delete(params) {
    return this.User.destroy({ where: params })
            .then(result => defaultResponse(result, HttpStatus.NO_CONTENT))
            .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }
}

export default UsersController;
