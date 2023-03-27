function statusMgmt() {}

statusMgmt.prototype.SUCCESS = {
  message: 'Success',
  statusCode: 200,
  status: true,
  data: {},
};

statusMgmt.prototype.BAD_REQUEST = {
  message: 'Bad Request!!',
  statusCode: 400,
  status: false,
};

statusMgmt.prototype.INTERNAL_SERVER_ERROR = {
  message: 'Internal Server Error!!!',
  statusCode: 500,
  status: false,
};

statusMgmt.prototype.BOOK_NOT_FOUND = {
  message: 'book with provided id is not present!!',
  statusCode: 404,
  status: false,
};

statusMgmt.prototype.DELETE_SUCCESS = {
  message: 'Book deleted successfully!!',
  statusCode: 200,
  status: true,
};

statusMgmt.prototype.EDIT_SUCCESS = {
  message: 'Book edited successfully!!',
  statusCode: 200,
  status: true,
};

statusMgmt.prototype.ADD_SUCCESS = {
  message: 'Book added successfully!!',
  statusCode: 200,
  status: true,
};

module.exports = statusMgmt;
