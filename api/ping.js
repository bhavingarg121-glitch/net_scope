async function testPing() {

  const samples = [];

  for (let i = 0; i < 5; i++) {

    const start = performance.now();

    await fetch("/api/ping?t=" + Date.now(), {
      cache: "no-store"
    });

    const end = performance.now();

    samples.push(end - start);
  }

  const avg =
    samples.reduce((a,b)=>a+b,0) /
    samples.length;

  return avg.toFixed(1);
}
