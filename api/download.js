export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Support dynamic size requested by client or default to 10MB
  const requestedBytes = parseInt(req.query?.bytes || req.query?.size, 10);
  const size = (!isNaN(requestedBytes) && requestedBytes > 0 && requestedBytes <= 25 * 1024 * 1024)
    ? requestedBytes
    : 10 * 1024 * 1024; // 10 MB default

  const buffer = Buffer.alloc(size);

  res.setHeader("Content-Type", "application/octet-stream");
  res.setHeader("Content-Length", size.toString());

  return res.status(200).send(buffer);
}
