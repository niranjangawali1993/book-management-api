var express = require('express');
var commonFunc = require('./common-function');
var router = express.Router();
var mysqlConnection = require('../mysql-connect');
const queryUtility = require('./../utils/QueryUtility');
const Util = require('./../utils/Util');

/* GET all books */
router.get('/', async (req, res) => {
  let msyqlConn = new mysqlConnection();
  let query = new queryUtility();
  let util = new Util();
  let conn = await msyqlConn.createDbConnection();
  let commonfunc = new commonFunc();
  conn.connect();

  req.check('pageNo', 'pageNo is mantoary field!').notEmpty();
  req.check('pageNo', 'pageNo should be numeric!').isNumeric();

  const errors = req.validationErrors();
  if (errors) {
    util.BAD_REQUEST.message = await commonfunc.getValidationMessage(errors);
    return res.status(400).send(util.BAD_REQUEST);
  }

  let limit = parseInt(process.env.PAGE_SIZE);
  let offset = (req.query.pageNo - 1) * limit;

  conn.query(query.GET_ALL_BOOKS, [limit, offset], async (err, data) => {
    if (err) {
      util.INTERNAL_SERVER_ERROR.message = err.message;
      return res.status(500).send(util.INTERNAL_SERVER_ERROR);
    }
    util.SUCCESS.data = data;
    res.status(200).send(util.SUCCESS);
    conn.end();
  });
});

/* Get book by id */
router.get('/:id', async (req, res) => {
  let msyqlConn = new mysqlConnection();
  let query = new queryUtility();
  let util = new Util();
  let conn = await msyqlConn.createDbConnection();
  let commonfunc = new commonFunc();
  conn.connect();

  req.check('id', 'id should be numeric!').isNumeric();
  const errors = req.validationErrors();
  if (errors) {
    util.BAD_REQUEST.message = await commonfunc.getValidationMessage(errors);
    return res.status(400).send(util.BAD_REQUEST);
  }

  try {
    let bookData = await commonfunc.getBookById(conn, req.params.id);
    if (!bookData.status) {
      return res.status(404).send(util.BOOK_NOT_FOUND);
    }
    util.SUCCESS.data = bookData.data;
    res.status(200).send(util.SUCCESS);
    conn.end();
  } catch (err) {
    util.INTERNAL_SERVER_ERROR.message = err.message;
    return res.status(500).send(util.INTERNAL_SERVER_ERROR);
  }
});

/* Add a new book */
router.post('/', async (req, res) => {
  let msyqlConn = new mysqlConnection();
  let query = new queryUtility();
  let util = new Util();
  let conn = await msyqlConn.createDbConnection();
  let commonfunc = new commonFunc();
  conn.connect();

  req.check('title', 'title id mandatory field!').notEmpty();
  req.check('author', 'author id mandatory field!').notEmpty();
  req.check('language', 'language id mandatory field!').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    util.BAD_REQUEST.message = await commonfunc.getValidationMessage(errors);
    return res.status(400).send(util.BAD_REQUEST);
  }

  let reqBody = [req.body.title, req.body.author, req.body.language];

  conn.query(query.ADD_BOOK, [reqBody], async (err, data) => {
    if (err) {
      util.INTERNAL_SERVER_ERROR.message = err.message;
      return res.status(500).send(util.INTERNAL_SERVER_ERROR);
    }
    res.status(200).send(util.ADD_SUCCESS);
    conn.end();
  });
});

/* Delete book by id */
router.delete('/:id', async (req, res) => {
  let msyqlConn = new mysqlConnection();
  let query = new queryUtility();
  let util = new Util();
  let conn = await msyqlConn.createDbConnection();
  let commonfunc = new commonFunc();
  conn.connect();

  req.check('id', 'id should be numeric!').isNumeric();
  const errors = req.validationErrors();
  if (errors) {
    util.BAD_REQUEST.message = await commonfunc.getValidationMessage(errors);
    return res.status(400).send(util.BAD_REQUEST);
  }

  try {
    let bookData = await commonfunc.getBookById(conn, req.params.id);
    if (!bookData.status) {
      return res.status(404).send(util.BOOK_NOT_FOUND);
    }
    conn.query(query.DELETE_BOOK, [req.params.id], async (err, data) => {
      if (err) {
        util.INTERNAL_SERVER_ERROR.message = err.message;
        return res.status(500).send(util.INTERNAL_SERVER_ERROR);
      }
      res.status(200).send(util.DELETE_SUCCESS);
      conn.end();
    });
  } catch (err) {
    util.INTERNAL_SERVER_ERROR.message = err.message;
    return res.status(500).send(util.INTERNAL_SERVER_ERROR);
  }
});

/* Update book */
router.put('/:id', async (req, res) => {
  let msyqlConn = new mysqlConnection();
  let util = new Util();
  let conn = await msyqlConn.createDbConnection();
  let commonfunc = new commonFunc();
  conn.connect();

  req.check('id', 'id should be numeric!').isNumeric();
  const errors = req.validationErrors();
  if (errors) {
    util.BAD_REQUEST.message = await commonfunc.getValidationMessage(errors);
    return res.status(400).send(util.BAD_REQUEST);
  }

  const columns = Object.keys(req.body);
  if (columns.length == 0) return res.status(404).send(util.BAD_REQUEST);

  try {
    let bookData = await commonfunc.getBookById(conn, req.params.id);
    if (!bookData.status) {
      return res.status(404).send(util.BOOK_NOT_FOUND);
    }

    let sql = `update books set ${columns.join(' = ? ,')} = ? where id = ${
      req.params.id
    };`;
    conn.query(sql, Object.values(req.body), async (err, data) => {
      if (err) {
        util.INTERNAL_SERVER_ERROR.message = err.message;
        return res.status(500).send(util.INTERNAL_SERVER_ERROR);
      }
      res.status(200).send(util.EDIT_SUCCESS);
      conn.end();
    });
  } catch (err) {
    util.INTERNAL_SERVER_ERROR.message = err.message;
    return res.status(500).send(util.INTERNAL_SERVER_ERROR);
  }
});

module.exports = router;
