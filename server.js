const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Render (and most PaaS) put the app behind a proxy, so the real client IP
// arrives in the X-Forwarded-For header; trust proxy makes req.ip use it.
app.set("trust proxy", true);

function clientIp(req) {
  const ip = req.ip || req.socket.remoteAddress || "unknown";
  return ip.replace(/^::ffff:/, "");
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

app.get("/", (req, res) => {
  const ip = escapeHtml(clientIp(req));
  res.send(`<!doctype html>
<html lang="uk">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Трекер IP</title>
  <style>
    body { font-family: system-ui, sans-serif; display: grid; place-items: center; min-height: 100vh; margin: 0; background: #f4f6f8; color: #1d2733; }
    main { text-align: center; padding: 2rem; }
    .ip { font-size: 2.5rem; font-weight: 700; margin: 1rem 0; word-break: break-all; }
  </style>
</head>
<body>
  <main>
    <h1>Трекер</h1>
    <p>Ваша IP-адреса:</p>
    <div class="ip">${ip}</div>
  </main>
</body>
</html>`);
});

app.get("/api/ip", (req, res) => {
  res.json({ ip: clientIp(req) });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
