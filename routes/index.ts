/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  return res.send('in server');
});

router.get('/test', (req, res, next) => res.send('in server test'));

export default router;
