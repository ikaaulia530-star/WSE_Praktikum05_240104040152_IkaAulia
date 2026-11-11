const repo = require('./buku.repository.cjs');
const { HttpError, validateBuku } = require('./errors.cjs');

function detail(id) {
  const item = repo.find(id);

  if (!item) {
    throw new HttpError(404, 'BOOK_NOT_FOUND',
      'Buku tidak ditemukan.');
  }

  return item;
}

module.exports = {
  list(q) {
    if (q !== undefined &&
        (typeof q !== 'string' || q.length > 80)) {
      throw new HttpError(400, 'INVALID_QUERY',
        'q harus berupa satu teks maksimal 80 karakter.');
    }

    return repo.list((q || '').trim());
  },

  detail,

  create(body) {
    return repo.create(validateBuku(body));
  },

  replace(id, body) {
    const data = validateBuku(body);
    detail(id);
    return repo.replace(id, data);
  },

  remove(id) {
    detail(id);
    repo.remove(id);
  }
};
