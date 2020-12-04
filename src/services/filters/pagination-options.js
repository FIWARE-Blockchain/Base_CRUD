/* eslint-disable class-methods-use-this */
class PaginationOptions {
  findAllResponseObject(response, queryParams) {
    return {
      pageNumber: queryParams.page,
      pageSize: queryParams.perPage,
      totalRecordCount: response.count,
      records: response.rows
    };
  }
}

export default new PaginationOptions();
