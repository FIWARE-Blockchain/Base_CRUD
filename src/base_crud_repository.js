import generalFactories from './services/general-factories';

export default class BaseCRUDRepository {
  constructor() {
    this.model = null;
  }

  findOneById(id) {
    return this.model.findOne({
      where: {
        // eslint-disable-next-line object-shorthand
        id: id
      }
    });
  }

  findAndCountAllByFilter(options) {
    return this.model.findAndCountAll({
      where: options.filters,
      order: options.sorting,
      offset: options.pagination.offset,
      limit: options.pagination.limit
    });
  }

  create(entry) {
    const createObject = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const key of this.createFields) {
      createObject[key] = entry[key];
    }

    return this.model.create(createObject);
  }

  update(id, entry, updateEntry) {
    const updateObject = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const key of this.updateFields) {
      updateObject[key] = generalFactories
        .changeIfHasProperty(entry, updateEntry, key);
    }
    return entry.update(updateObject, {
      where: {
        id
      }
    });
  }
}
