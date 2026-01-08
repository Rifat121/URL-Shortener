# URL Shortener Application

A full-stack URL Shortener application that allows users to convert long URLs into short, shareable links, track click counts, and manage generated URLs through a modern dashboard interface.

---

## Features

- Generate short URLs from long links
- Redirect short URLs to original URLs
- Track click count for each short URL
- Copy short URLs to clipboard with visual feedback
- Delete generated URLs
- Responsive and clean UI

---

## Tech Stack

### Frontend
- React
- Tailwind CSS
- Axios
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/url-shortener.git
cd url-shortener
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

---

### 3. Environment Variables Setup

Create a `.env` file inside the `backend` directory:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/urlShortener
BASE_URL=http://localhost:5000
```

#### Environment Variables Explanation

| Variable | Description |
|--------|-------------|
| PORT | Port number for backend server |
| MONGO_URI | MongoDB connection string |
| BASE_URL | Base URL for generating short URLs |

---

### 4. Run Backend Server

```bash
npm run dev
```

---

### 5. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## Project Structure

```
url-shortener/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
|   |   ├── services/
│   │   └── styles/
│   └── package.json
│
└── README.md
```

---

## API Documentation

### Create Short URL

### Register
- **POST** `/api/auth/register`
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```
-  **Response**
```json
{
    "message": "User registered successfully"
}
```
### Login to website
- **POST** `/api/auth/login`

```json
{
  "email": "test@example.com",
  "password": "password123"
}
```
-  **Response**
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTVkNThiOGVlN2QyYzlkNjRmYTM4N2YiLCJpYXQiOjE3Njc4OTgwMzYsImV4cCI6MTc2Nzk4NDQzNn0.Wzv11sOsvs4gfpGyeuMSu640JvZzs_Bnzrb2a29ZLS0",
    "user": {
        "id": "695d58b8ee7d2c9d64fa387f",
        "name": "Test User",
        "email": "test@example.com"
    }
}
```
### Submit a URL to Shorten
- **POST** `/api/urls`
```header
Authorization: Bearer <token>
```
```json
{
  "originalUrl": "https://example.com"
}
```
-  **Response**
```json
{
    "message": "Short URL created successfully",
    "data": {
        "id": "695ffd10afe2746d1a320f31",
        "originalUrl": "https://www.example.com",
        "shortCode": "1_z_Ig8",
        "shortUrl": "http://localhost:5000/1_z_Ig8",
        "clicks": 0,
        "createdAt": "2026-01-08T18:53:04.647Z"
    }
}
```

### Get All URLs

- **GET** `/api/urls`
```header
Authorization: Bearer <token>
```
-  **Response**
```json
{
    "data": [
        {
        "id": "695ffd10afe2746d1a320f31",
        "originalUrl": "https://www.example.com",
        "shortCode": "1_z_Ig8",
        "shortUrl": "http://localhost:5000/1_z_Ig8",
        "clicks": 0,
        "createdAt": "2026-01-08T18:53:04.647Z"
    }
    ]
}
```

### Redirect Short URL

- **GET** `/:shortCode`
```header
Authorization: Bearer <token>
```
-  **Response**
```sh
# Response from the Original URL
```

### Delete URL

- **DELETE** `/api/urls/:id`
```header
Authorization: Bearer <token>
```
-  **Response**
```json
{
    "message": "URL deleted successfully"
}
```
---

## Design Decisions

- Clean separation of backend layers
- Minimal schema design for scalability
- Truncated URLs for better UI readability
- Clipboard feedback for improved UX

## Future Improvements
- Pagination in URL Table in the Dashboard Page
- Maintain Navigation Bar at the Top/Side for Better Experience
---
