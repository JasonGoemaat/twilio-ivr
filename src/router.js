const twilio = require('twilio');
const Router = require('express').Router;
const ivrRouter = require('./ivr/router');
const historyRouter = require('./history/router');

const router = new Router();

// GET: / - home page
router.get('/', (req, res) => {
  res.render('index');
});

router.use('/ivr', twilio.webhook({validate: false}), ivrRouter);

router.use('/history', twilio.webhook({validate: false}), historyRouter);

module.exports = router;
