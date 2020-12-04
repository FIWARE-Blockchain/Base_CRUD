class ErrorParsers {
  // eslint-disable-next-line class-methods-use-this
  sequelizeErrorParser(sequelizeError) {
    const responseError = {};
    if (!sequelizeError.errors) {
      // eslint-disable-next-line no-param-reassign
      sequelizeError.success = false;
      if (sequelizeError.message) {
        responseError.message = sequelizeError.message;
        responseError.success = false;
        return responseError;
      }
      return sequelizeError;
    }

    sequelizeError.errors.forEach((value) => {
      if (value.path === 'passwordNeeded') {
        // eslint-disable-next-line no-param-reassign
        value.path = 'password';
        // eslint-disable-next-line no-param-reassign
        value.message = '';
      }

      if (value.path === 'lower(username::text)') {
        // eslint-disable-next-line no-param-reassign
        value.path = 'username';
        // eslint-disable-next-line no-param-reassign
        value.message = 'value_already_used';
      }

      if (value.type === 'notNull Violation') {
        // eslint-disable-next-line no-param-reassign
        value.message = '';
      }

      responseError[value.path] = value.message;
    });
    return responseError;
  }

  // eslint-disable-next-line class-methods-use-this
  multerErrorParser(errorObject) {
    const responseError = {
      success: false,
      message: errorObject.code,
      status: 422
    };

    if (errorObject.statusCode) {
      responseError.status = errorObject.statusCode;
    }

    if (errorObject.code === 'LIMIT_FILE_COUNT') {
      responseError.message = 'too_many_files';
    }

    if (errorObject.code === 'LIMIT_FILE_SIZE') {
      responseError.message = 'file_size_exceeded';
    }

    return responseError;
  }
}

export default new ErrorParsers();
