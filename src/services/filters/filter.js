import _ from 'lodash';

class FilterObject {
  // first parameter is for req.query and second for
  // the fields that you need to create on the filterObject.
  // eslint-disable-next-line class-methods-use-this
  filterObject(queryStrings, fieldNamesToFilterArray) {
    const filterObject = {};

    if (_.isEmpty(queryStrings)) {
      return filterObject;
    }

    fieldNamesToFilterArray.forEach((value) => {
      if (queryStrings[value]) {
        filterObject[value] = queryStrings[value];
      }
    });

    return filterObject;
  }

  // eslint-disable-next-line class-methods-use-this
  sortingObject(queryString) {
    const sortingOrder = [];
    const sortingString = queryString.sort;

    // if no sorting query params are defined, default:  id, ASC
    if (!sortingString) {
      return [['id', 'ASC']];
    }
    const sortingArray = sortingString.split(',');
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < sortingArray.length; i++) {
      let sortType = 'ASC';

      if (_.head(sortingArray[i]) === '-') {
        sortingArray[i] = sortingArray[i].slice(1);
        sortType = 'DESC';
      }

      const object = [];
      object.push(sortingArray[i]);
      object.push(sortType);

      sortingOrder.push(object);
    }

    if (sortingOrder.length === 0) {
      return [['id', 'ASC']];
    }

    return sortingOrder;
  }

  // eslint-disable-next-line class-methods-use-this
  addSearchText(queryString) {
    if (queryString.search) {
      return queryString.search;
    }

    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  addRelationDetails(queryString) {
    if (queryString.relations === 'true') {
      return null;
    }

    return [];
  }
}

export default new FilterObject();
