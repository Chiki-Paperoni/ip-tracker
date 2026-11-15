const test = require("node:test");
const assert = require("node:assert/strict");
const { app, clientIp, escapeHtml } = require("../server");

test("clientIp strips the IPv4-mapped IPv6 prefix", () => {
  assert.equal(clientIp({ ip: "::ffff:203.0.113.7", socket: {} }), "203.0.113.7");
});

test("clientIp falls back to the socket address, then to 'unknown'", () => {
  assert.equal(clientIp({ socket: { remoteAddress: "198.51.100.1" } }), "198.51.100.1");
  assert.equal(clientIp({ socket: {} }), "unknown");
});

test("escapeHtml escapes HTML special characters", () => {
  assert.equal(escapeHtml(`<b>"Tom" & 'Jerry'</b>`), "&lt;b&gt;&quot;Tom&quot; &amp; &#39;Jerry&#39;&lt;/b&gt;");
});

test("GET /api/ip returns the client IP as JSON", async (t) => {
  const server = app.listen(0);
  t.after(() => server.close());
  const { port } = server.address();
  const res = await fetch(`http://127.0.0.1:${port}/api/ip`, { headers: { "X-Forwarded-For": "203.0.113.7" } });
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ip: "203.0.113.7" });
});

test("GET / shows the IP on the HTML page", async (t) => {
  const server = app.listen(0);
  t.after(() => server.close());
  const { port } = server.address();
  const res = await fetch(`http://127.0.0.1:${port}/`);
  assert.equal(res.status, 200);
  assert.match(await res.text(), /<div class="ip">127\.0\.0\.1<\/div>/);
});
