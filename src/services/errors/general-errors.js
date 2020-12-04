import _ from 'lodash';

class GeneralErrorServices {
  // eslint-disable-next-line class-methods-use-this
  addErrStatus(err, statusCode) {
    if (!err.status) {
      // eslint-disable-next-line no-param-reassign
      err.status = statusCode;
    }

    // eslint-disable-next-line no-useless-return
    return;
  }

  // eslint-disable-next-line class-methods-use-this
  unprocessableEntity(message) {
    const err = new Error();
    err.status = 422;
    err.message = message;

    throw err;
  }

  // eslint-disable-next-line class-methods-use-this
  unprocessableEntityWrongFields(missingFields, message) {
    const err = new Error();
    err.status = 422;
    err.errors = [];
    _.map(missingFields, (field) => {
      err.errors.push(
        {
          message: message || '',
          path: field
        }
      );
    });

    throw err;
  }

  // eslint-disable-next-line class-methods-use-this
  notFound() {
    const err = new Error();
    err.status = 404;
    err.message = 'not_found';

    throw err;
  }

  // eslint-disable-next-line class-methods-use-this
  forbidden() {
    const err = new Error();
    err.status = 403;

    throw err;
  }

  // eslint-disable-next-line class-methods-use-this
  badRequest(message) {
    const err = new Error();
    err.status = 400;
    if (message) {
      err.message = message;
    }

    throw err;
  }
}

export default new GeneralErrorServices();
