require('dotenv').config();
var commonFunc = function () {};
var mysqlConnection = require('./../mysql-connect');
let queryUtility = require('../utils/QueryUtility');

commonFunc.prototype.getValidationMessage = async (errArray) => {
  for (let y = 0; y < errArray.length; y++) {
    if (errArray[y].msg != null || errArray[y].msg != '') {
      return errArray[y].msg;
    }
  }
};

commonFunc.prototype.getBookById = async (conn, bookId) => {
  let query = new queryUtility();
  let promiseCount = new Promise(async (resolve, reject) => {
    conn.query(query.GET_BOOK_BY_ID, [bookId], async (err, data) => {
      if (err) {
        return reject(err);
      }
      let result = {};
      result.data = data.length > 0 ? data[0] : {};
      if (data.length == 0) result.status = false;
      else result.status = true;
      resolve(result);
    });
  });
  return promiseCount;
};

module.exports = commonFunc;
