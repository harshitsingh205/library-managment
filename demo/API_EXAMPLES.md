# Library Management System - API Examples

## Authentication & Setup

### Environment Variables
Create a `.env` file:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/library
JWT_SECRET=demo_secret_key
```

## API Endpoints

### Books
#### Get All Books
```bash
GET /api/books?page=1&limit=10&genre=Fiction

Response:
{
  "success": true,
  "count": 10,
  "total": 45,
  "page": 1,
  "pages": 5,
  "data": [...]
}
```

#### Get Book by ID
```bash
GET /api/books/:id
```

#### Add New Book
```bash
POST /api/books
Content-Type: application/json

{
  "title": "The Hobbit",
  "isbn": "978-0-547-92832-6",
  "author": "507f1f77bcf86cd799439011",
  "publisher": "Allen & Unwin",
  "publicationYear": 1937,
  "genre": "Fiction",
  "totalCopies": 5,
  "availableCopies": 3,
  "condition": "Good",
  "price": 11.99
}
```

#### Update Book
```bash
PUT /api/books/:id
Content-Type: application/json

{
  "availableCopies": 2,
  "condition": "Excellent"
}
```

#### Delete Book
```bash
DELETE /api/books/:id
```

---

### Members
#### Get All Members
```bash
GET /api/members?page=1&limit=10&status=Active
```

#### Create New Member
```bash
POST /api/members
Content-Type: application/json

{
  "firstName": "Alice",
  "lastName": "Wonder",
  "email": "alice@example.com",
  "phone": "555-9999",
  "membershipType": "Premium",
  "status": "Active",
  "address": {
    "street": "999 Broadway",
    "city": "Boston",
    "state": "MA",
    "zipCode": "02101",
    "country": "USA"
  },
  "borrowingLimit": 10
}
```

#### Update Member
```bash
PUT /api/members/:id
Content-Type: application/json

{
  "membershipType": "Student",
  "status": "Suspended"
}
```

---

### Borrowing
#### Get Borrowing Records
```bash
GET /api/borrowing?status=Borrowed&page=1&limit=10
```

#### Borrow a Book
```bash
POST /api/borrowing/borrow
Content-Type: application/json

{
  "bookId": "507f1f77bcf86cd799439011",
  "memberId": "507f1f77bcf86cd799439012",
  "dueDate": "2024-04-30"
}
```

#### Return a Book
```bash
POST /api/borrowing/return/:id

Response:
{
  "success": true,
  "message": "Book returned successfully",
  "data": {
    "bookId": "507f1f77bcf86cd799439011",
    "memberId": "507f1f77bcf86cd799439012",
    "borrowDate": "2024-04-16",
    "dueDate": "2024-04-30",
    "returnDate": "2024-05-02",
    "status": "Returned",
    "fineAmount": 10.00
  }
}
```

---

### Authors
#### Get All Authors
```bash
GET /api/authors?page=1&limit=10&isActive=true
```

#### Create Author
```bash
POST /api/authors
Content-Type: application/json

{
  "firstName": "J.K.",
  "lastName": "Rowling",
  "email": "jk@example.com",
  "bio": "British author known for Harry Potter series",
  "birthYear": 1965,
  "nationality": "British",
  "awards": ["Hugo Award", "British Book Award"]
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error or bad input"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

---

## Demo Usage Tips

1. **Start the server**: `npm start`
2. **Run demo data**: `npm run seed`
3. **Test endpoints**: Use Postman, curl, or Insomnia
4. **Check health**: `GET /health`

All endpoints support JSON responses with standardized success/error formatting.
