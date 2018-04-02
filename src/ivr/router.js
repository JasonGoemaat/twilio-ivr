const Router = require('express').Router;
const {welcome, menu, planets} = require('./handler');
const log = require('../logger');

const router = new Router();

// POST: /ivr/welcome
router.post('/welcome', (req, res) => {
  log.add(req);
  let from = null;
  if (req.body.From) {
    from = req.body.From;
    if (from.length > 4) {
      from = from.substring(from.length - 4);
    }
  }
  res.send(welcome(from));
});

router.get('/welcome', (req, res) => {
  log.add(req);
  res.send(welcome());
});

// POST: /ivr/menu
router.post('/menu', (req, res) => {
  log.add(req);
  const digit = req.body.Digits;
  return res.send(menu(digit));
});

router.get('/menu', (req, res) => {
  log.add(req);
  res.send(menu('1'));
});

// POST: /ivr/planets
router.post('/planets', (req, res) => {
  log.add(req);
  const digit = req.body.Digits;
  res.send(planets(digit));
});

router.get('/planets', (req, res) => {
  log.add(req);
  res.send(planets('1'));
});

module.exports = router;
