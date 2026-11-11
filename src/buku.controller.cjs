const service = require('./buku.service.cjs');

module.exports = {
  list(req, res) {
    res.json({
      success: true,
      data: service.list(req.query.q)
    });
  },

  detail(req, res) {
    res.json({
      success: true,
      data: service.detail(req.bukuId)
    });
  },

  create(req, res) {
    const item = service.create(req.body);

    res.location(`/api/buku/${item.id}`);
    res.status(201).json({
      success: true,
      data: item
    });
  },

  replace(req, res) {
    const item = service.replace(req.bukuId, req.body);

    res.json({
      success: true,
      data: item
    });
  },

  remove(req, res) {
    service.remove(req.bukuId);
    res.status(204).end();
  }
};
