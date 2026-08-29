export default function handler(req, res) {

  const size = 20 * 1024 * 1024;

  const buffer = Buffer.alloc(size);

  res.setHeader(
    "Content-Type",
    "application/octet-stream"
  );

  res.send(buffer);

}
