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

## Environment Setup

This project requires a `.dev.vars` file containing your database credentials.

1. Copy the example file:
```bash
cp .dev.vars.example .dev.vars
```
2. Open `.dev.vars` and replace the placeholder values with your actual database credentials:
```toml
# Database username
DB_USER="myuser"

# Database password
DB_PASSWORD="mypassword"

# Database host (Neon project pool)
DB_HOST="myproject-pooler.c-2.us-east-1.aws.neon.tech"

# Database name
DB_NAME="mydatabase"

# Full connection string
DATABASE_URL="postgresql://myuser:mypassword@myproject-pooler.c-2.us-east-1.aws.neon.tech/mydatabase?sslmode=require&channel_binding=require"
```

## How to get your DATABASE_URL

1. Go to [Neon Console](https://console.neon.tech/) and create a new project
2. Enter your project name and click Create
3. Once the project is created, click Connect.
4. Copy the connection string provided, which looks like:
`postgresql://<user>:<password>@<host>/<database>?sslmode=require&channel_binding=require`
5. Explanation of each part:

| Part       | Description |
|------------|-------------|
| `<user>`    | Database username |
| `<password>`| Password for the database user |
| `<host>`    | Hostname of your Neon project pool |
| `<database>`| Name of your database |
| `sslmode=require&channel_binding=require` | SSL and security settings required by Neon |

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
