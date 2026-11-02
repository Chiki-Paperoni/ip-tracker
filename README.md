# IP Tracker

A minimal Node.js + Express web app: the start page shows the visitor's IP address.

## Run locally

```bash
npm install
npm start
```

Open http://localhost:3000. JSON endpoint: `/api/ip`.

## Deploy on Render

New → Web Service → connect this repository.

- Runtime: Node
- Build command: `npm install`
- Start command: `npm start`

Render sets `PORT` automatically. The app runs behind Render's proxy, so the client IP is taken from the `X-Forwarded-For` header (`trust proxy`).
