import generalErrors from './services/errors/general-errors';
import objectFactory from './services/filters/object-factory';
import paginationOptions from './services/filters/pagination-options';

export default class BaseCRUDController {
  constructor() {
    this.repository = null;
    this.filters = [];
  }

  getAll(req, res, next) {
    const options = objectFactory.queryOptions(
      req.query,
      this.filters
    );

    return this.repository
      .findAndCountAll(options)
      .then((entries) => {
        res.jsonp(paginationOptions.findAllResponseObject(
          entries,
          req.query
        ));
      })
      .catch((err) => {
        generalErrors.addErrStatus(err, 422);
        return next(err);
      });
  }

  allEntries(req, res, next) {
    const options = objectFactory.queryOptions(
      req.query,
      this.filters
    );

    return this.repository
      .findAndCountAllByFilter(options)
      .then((entries) => {
        res.jsonp(paginationOptions.findAllResponseObject(
          entries,
          req.query
        ));
      })
      .catch((err) => {
        generalErrors.addErrStatus(err, 422);

        return next(err);
      });
  }

  oneSpecifiedEntry(req, res, next) {
    return this.repository
      .findOneById(req.params.id)
      // eslint-disable-next-line consistent-return
      .then((entry) => {
        if (entry) {
          res.jsonp(entry);

          return null;
        }

        generalErrors.notFound();
      })
      .catch((err) => {
        generalErrors.addErrStatus(err, 400);

        return next(err);
      });
  }

  createEntry(req, res, next) {
    return this.repository.create(req.body)
      .then((entry) => {
        res.jsonp(entry);
        return null;
      })
      .catch((err) => {
        generalErrors.addErrStatus(err, 422);

        return next(err);
      });
  }

  updateEntry(req, res, next) {
    return this.repository.findOneById(req.params.id)
      // eslint-disable-next-line consistent-return
      .then((entry) => {
        if (entry) {
          return this.repository.update(req.params.id, entry, req.body);
        }
        generalErrors.notFound();
      })
      .then((updatedEntry) => {
        res.jsonp(updatedEntry);

        return null;
      })
      .catch((err) => {
        generalErrors.addErrStatus(err, 422);

        return next(err);
      });
  }

  deleteEntry(req, res, next) {
    return this.repository.findOneById(req.params.id)
      // eslint-disable-next-line consistent-return
      .then((entry) => {
        if (entry) {
          return entry.destroy();
        }

        generalErrors.notFound();
      })
      .then(() => res.jsonp(
        {
          success: true,
          message: 'deleted_successfully'
        }
      ))
      .catch((err) => {
        if (err.name === 'SequelizeForeignKeyConstraintError') {
          // eslint-disable-next-line no-param-reassign
          err.message = 'SequelizeForeignKeyConstraintError';
          // eslint-disable-next-line no-param-reassign
          err.status = 400;

          return next(err);
        }
        generalErrors.addErrStatus(err, 400);

        return next(err);
      });
  }
}
