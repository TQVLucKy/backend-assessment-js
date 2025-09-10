# MindArc Backend Assessment

## Libraries
1. Neon Serverless Postgres

---

## How to run:

```bash
1. npm install
2. npm start
```

---

## Environment Variables:

You need to provide environment variables for the project.  
In this setup, values are added in `.dev.vars`:

```toml
DATABASE_URL="postgres://username:password@neon.db/database_name"
```

## How to get your DATABASE_URL
1. Go to [Neon Console](https://console.neon.tech/) and create a new project
2. Enter your project name and click Create
3. Once the project is created, click Connect.
4. Copy the connection string provided, which looks like: `postgres://username:password@neon.db/database_name"`

---

## Postman Collection

Postman collection is available at:

```
utils/postman/products.postman_collection.json
```

You can import this file into Postman to test the available APIs.

---

## Code Structure

```
src/
├── database.ts
├── index.test.ts
├── index.ts
utils/
└── postman/
    └── products.postman_collection.json
```
