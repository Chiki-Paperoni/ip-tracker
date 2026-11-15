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

## Tests and CI/CD (lab 3)

```bash
npm test
```

Runs the unit tests in `test/` with the built-in Node.js test runner (`node --test`).

GitHub Actions workflow [`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs on every push and pull request. It has two sequential jobs:

1. **Run tests**: `npm ci` and `npm test`. The job fails if any test fails.
2. **Deploy (simulation)**: prints `Deployed`. Because of `needs: test`, it runs only after the tests pass.
