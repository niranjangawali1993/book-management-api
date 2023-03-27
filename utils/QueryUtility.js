function queryUtility() {}

queryUtility.prototype.GET_ALL_BOOKS = `select * from books ORDER BY created_at DESC LIMIT ? OFFSET ?`;
queryUtility.prototype.GET_BOOK_BY_ID = `select * from books where id = ?`;
queryUtility.prototype.ADD_BOOK = `insert into books(title,author,language) values (?)`;

queryUtility.prototype.DELETE_BOOK = `delete from books where id = ?`;
module.exports = queryUtility;
