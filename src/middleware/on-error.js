export function onError(error, req, res, next) {
  const status = res.statusCode < 500 ? 500 : res.statusCode;
  const message = error.message || "Internal Server Error";

  res.status(status).send({ message });
}
