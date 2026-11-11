const express = require('express');
const bukuRoutes = require('./src/buku.routes.cjs');
const { HttpError } = require('./src/errors.cjs');

const app = express();

app.disable('x-powered-by');

app.use((req, res, next) => {
  console.log(`[HTTP] ${req.method} ${req.path}`);
  res.set('Cache-Control', 'no-store');
  next();
});

app.use(express.json({ limit: '10kb' }));

app.use('/api/buku', bukuRoutes);

const path = require('node:path');
const swaggerUi = require('swagger-ui-express');

const specPath = path.join(__dirname, 'docs', 'openapi.json');

app.get('/openapi.json', (req, res) => res.sendFile(specPath));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(null, {
  swaggerOptions: {
    url: '/openapi.json',
    validatorUrl: null
  }
}));

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'ROUTE_NOT_FOUND',
      message: 'Rute tidak ditemukan.'
    }
  });
});

app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);

  let status = 500;
  let code = 'INTERNAL_ERROR';
  let message = 'Terjadi kesalahan pada server.';

  if (err instanceof HttpError) {
    ({ status, code, message } = err);
  } else if (err.type === 'entity.parse.failed') {
    status = 400;
    code = 'INVALID_JSON';
    message = 'Body harus berupa objek JSON yang valid.';
  } else if (err.status >= 400 && err.status < 500) {
    status = err.status;
    code = status === 413 ? 'PAYLOAD_TOO_LARGE' : 'BAD_REQUEST';
    message = status === 413
      ? 'Body melebihi batas 10kb.'
      : 'Permintaan tidak dapat diproses.';
  }

  if (status === 500) {
    console.error('Kesalahan internal server.');
  }

  res.status(status).json({
    success: false,
    error: { code, message }
  });
});

module.exports = app;
