# my-jewelry-site

Monorepo for a jewelry shop demo. Includes a Node.js backend with Express and TypeORM and a React frontend built with Vite.

## Development

```bash
npm install
npm run lint
npm test
```

Backend commands:

```bash
cd backend
npm run dev
npm run seed
npm run build
```

Frontend:

```bash
cd frontend
npm run dev
```

### Environment

Create a `.env` file in `backend` with the following variables:

```
DB_HOST=db
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=jewelry
JWT_SECRET=secret
```

Run migrations:

```bash
cd backend
npx typeorm-ts-node-commonjs migration:run -d ../ormconfig.ts
```
