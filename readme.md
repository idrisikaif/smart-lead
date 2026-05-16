
# Smart Leads Dashboard

A lead management dashboard I built as part of a full-stack internship assignment. The goal was to create a clean, working CRUD app with auth, filtering, and role-based access — so I went with the MERN stack since that's what I'm most comfortable with.

## What it does

- Login and registration with JWT auth
- Add, edit, delete leads
- Filter leads by status and source, search by name or email
- Sort by newest or oldest
- Paginated results (10 per page)
- Export leads to CSV
- Admin users can delete leads, sales users cannot

## Stack

React + TypeScript + TailwindCSS on the frontend, Node + Express + TypeScript + MongoDB on the backend.

## Running locally

You'll need Node.js and MongoDB installed.

**Backend:**
bash
cd backend
npm install
# create a .env file based on .env.example
npm run dev


**Frontend:**
bash
cd frontend
npm install
npm run dev


## Environment variables

Create a `.env` file in the backend folder:

PORT=5000
MONGO_URI=mongodb://localhost:27017/smartleads
JWT_SECRET=your_secret_key


## API

Auth routes are at `/api/auth` (register, login). Lead routes are at `/api/leads` and require a Bearer token. Admins can delete leads, sales users can only create and edit. CSV export is at `/api/leads/export`.

## Notes

Debounced search is implemented on the frontend with a 500ms delay. Pagination uses skip/limit on the backend. Delete is restricted to admin role via middleware.
