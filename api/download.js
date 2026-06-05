export default function handler(req, res) {

  const size = 20 * 1024 * 1024;

  const buffer = Buffer.alloc(size);

  res.setHeader(
    "Content-Type",
    "application/octet-stream"
  );

  res.send(buffer);
}
async function testDownload() {

  const fileSize =
    20 * 1024 * 1024;

  const start =
    performance.now();

  const response =
    await fetch(
      "/api/download?x=" +
      Date.now()
    );

  await response.arrayBuffer();

  const end =
    performance.now();

  const seconds =
    (end - start) / 1000;

  const mbps =
    (
      (fileSize * 8) /
      seconds /
      1024 /
      1024
    );

  return mbps.toFixed(2);
}
