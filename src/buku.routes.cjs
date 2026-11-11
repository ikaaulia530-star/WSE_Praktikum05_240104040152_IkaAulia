const express = require('express');
const controller = require('./buku.controller.cjs');
const { HttpError, parseId } = require('./errors.cjs');

const router = express.Router();

function jsonOnly(req, res, next) {
  const mediaType = (req.get('Content-Type') || '')
    .split(';')[0]
    .trim()
    .toLowerCase();

  if (mediaType !== 'application/json') {
    throw new HttpError(415, 'UNSUPPORTED_MEDIA_TYPE',
      'Gunakan Content-Type application/json.');
  }

  next();
}

router.param('id', (req, res, next, value) => {
  req.bukuId = parseId(value);
  next();
});

router.get('/', controller.list);
router.get('/:id', controller.detail);
router.post('/', jsonOnly, controller.create);
router.put('/:id', jsonOnly, controller.replace);
router.delete('/:id', controller.remove);

module.exports = router;
