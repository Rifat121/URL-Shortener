# URL-Shortener

POST http://localhost:5000/api/url
Headers: Authorization: Bearer <token>
Body:
{ "originalUrl": "https://www.google.com" }

GET http://localhost:5000/api/url
Headers: Authorization: Bearer <token>

GET http://localhost:5000/<shortCode>/redirect

DELETE http://localhost:5000/api/url/<urlId>
Headers: Authorization: Bearer <token>


POST http://localhost:5000/api/auth/register
Body JSON
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
