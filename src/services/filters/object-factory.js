// eslint-disable-next-line no-unused-vars
import _ from 'lodash';
import filter from './filter';

class ObjectFactory {
  // eslint-disable-next-line class-methods-use-this
  addPaginationOptions(queryString) {
    return {
      limit: queryString.perPage,
      offset: queryString.perPage * queryString.page
    };
  }

  queryOptions(queryString, sortingArray) {
    const options = {};
    options.pagination = this.addPaginationOptions(queryString);
    options.filters = filter.filterObject(queryString, sortingArray);
    options.sorting = filter.sortingObject(queryString);
    options.relations = filter.addRelationDetails(queryString);
    options.search = filter.addSearchText(queryString);

    return options;
  }
}

export default new ObjectFactory();
