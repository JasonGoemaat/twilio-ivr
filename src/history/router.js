const Router = require('express').Router;
const {viewHistory} = require('./handler');
const log = require('../logger');

const router = new Router();

router.get('/view', (req, res) => {
  res.render('history', { history: log.history, historyJSON: JSON.stringify(log.history, null, 2) });
});

module.exports = router;
