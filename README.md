<<<<<<< HEAD
# Hardware Hub

A responsive hardware catalog built with HTML, CSS, browser JavaScript, Node.js, Express, and MongoDB. The cool midnight-blue interface includes searchable/filterable product cards, demo photography, and a MongoDB-backed API.

## Requirements

- Node.js 18 or newer
- A running local MongoDB instance or a MongoDB Atlas connection string

## Run locally

1. Copy `.env.example` to `.env` and set `MONGODB_URI` if your MongoDB connection differs from the local default.
2. Install dependencies with `npm install`.
3. Add the demo catalog to MongoDB with `npm run seed`.
4. Start the app with `npm run dev` (or `npm start`).
5. Open <http://localhost:3000>.

The seed command replaces the existing hardware collection with eight sample products. Product photos are remote Unsplash image URLs, so the browser needs internet access to display them.

## API

- `GET /api/health` — server and database status
- `GET /api/hardware` — list hardware (`category`, `search`, and `sort` query parameters supported)
- `GET /api/hardware/:id` — retrieve one item

The MongoDB model is in `server.js`. Add write endpoints and authentication before using this starter for a public inventory system.
=======
# Hardwareshop
>>>>>>> d451500ff4420300391dda6e0b8b80ebcbb85078
