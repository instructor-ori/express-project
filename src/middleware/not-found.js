export function notFound(req, res, next) {
  res.status(404).send({
    message: `Not Found - ${req.method} ${req.url}`,
  });
}
