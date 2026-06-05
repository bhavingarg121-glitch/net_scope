export default async function handler(
  req,
  res
) {

  res.status(200).json({
    success:true
  });

}
async function testUpload() {

  const size =
    5 * 1024 * 1024;

  const data =
    new Uint8Array(size);

  crypto.getRandomValues(data);

  const start =
    performance.now();

  await fetch("/api/upload", {
    method:"POST",
    body:data
  });

  const end =
    performance.now();

  const seconds =
    (end - start) / 1000;

  const mbps =
    (
      (size * 8) /
      seconds /
      1024 /
      1024
    );

  return mbps.toFixed(2);
}
