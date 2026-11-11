class HttpError extends Error {
  constructor(status, code, message) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

function parseId(value) {
  const id = Number(value);

  if (!/^[1-9]\d*$/.test(value) ||
      !Number.isSafeInteger(id)) {
    throw new HttpError(400, 'INVALID_ID',
      'ID harus berupa bilangan bulat positif.');
  }

  return id;
}

function validateBuku(body) {
  if (!body || typeof body !== 'object' ||
      Array.isArray(body)) {
    throw new HttpError(400, 'INVALID_BOOK',
      'Body harus berupa objek buku.');
  }

  const allowed = ['judul', 'tersedia'];

  const extra = Object.keys(body).some(
    (key) => !allowed.includes(key)
  );

  if (extra || typeof body.judul !== 'string' ||
      body.judul.trim().length < 1 ||
      body.judul.trim().length > 120 ||
      typeof body.tersedia !== 'boolean') {
    throw new HttpError(400, 'INVALID_BOOK',
      'Isi hanya judul 1-120 karakter dan tersedia boolean.');
  }

  return {
    judul: body.judul.trim(),
    tersedia: body.tersedia
  };
}

module.exports = { HttpError, parseId, validateBuku };
