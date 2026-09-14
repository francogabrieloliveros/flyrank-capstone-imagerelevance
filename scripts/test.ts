const BASE_URL = "http://localhost:3000";

async function main() {
  const res = await fetch(`${BASE_URL}/api/eval`);

  if (!res.ok) {
    console.error(`GET /api/eval failed: ${res.status} ${await res.text()}`);
    process.exit(1);
  }

  const result = await res.json();
  console.log(JSON.stringify(result, null, 2));
}

main().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
