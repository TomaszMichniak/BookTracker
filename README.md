# Book Tracker

Book Tracker is an application for managing books – it allows you to add new titles, browse the list, and mark books as read

---

## Technologies

- **Backend:** Node.js, Express, TypeScript, TypeORM, SQLite
- **Frontend:** React, TypeScript, Vite, TailwindCSS
- **Tests:** Jest, Supertest

---

## Backend – Setup / Running

To run the backend, follow these steps:

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The server will be available by default at: http://localhost:3000

---

## Frontend – Setup / Running

To run the frontend, follow these steps:

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available by default at: http://localhost:5173

---

## API – Main Endpoints

- `GET /books` – fetch the list of books
- `POST /books` – add a new book
- `PATCH /books/:id/read` – mark a book as read

---

## Tests

To run tests, follow these steps:

1. Navigate to the backend directory.
2. Run tests:
   ```bash
   npm test
   ```