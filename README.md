# 📚 Library Management System

A professional, full-featured Library Management System built with Node.js, Express, and MongoDB. Perfect for managing books, members, and borrowing transactions.

## ✨ Features

- **📖 Book Management**: Add, update, and manage book inventory with ISBN, genre, and availability tracking
- **👥 Member Management**: Handle member profiles, borrowing limits, and membership tiers
- **🔄 Borrowing System**: Track book borrowing and returns with automatic fine calculation
- **📊 Author Database**: Maintain comprehensive author information and records
- **🔍 Advanced Search**: Filter and search with pagination support
- **💰 Fine Management**: Automatic overdue fine calculation ($5/day)
- **📈 Reporting**: View system health and statistics
- **🔐 Security**: Password hashing and data validation

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas URI)
- npm or yarn

### Installation

1. **Clone and Setup**
```bash
cd library
npm install
```

2. **Configure Environment**
```bash
cp .env.example .env
```

Edit `.env` with your MongoDB URI:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/library
JWT_SECRET=your_secret_key
```

3. **Start the Server**
```bash
npm start
# or for development with auto-reload:
npm run dev
```

The server will start on `http://localhost:5000`

### Health Check
```bash
curl http://localhost:5000/health
```

## 📁 Project Structure

```
library/
├── src/
│   ├── models/              # Database schemas
│   │   ├── Book.js
│   │   ├── Member.js
│   │   ├── Borrowing.js
│   │   └── Author.js
│   ├── routes/              # API routes
│   │   ├── bookRoutes.js
│   │   ├── memberRoutes.js
│   │   ├── borrowingRoutes.js
│   │   └── authorRoutes.js
│   ├── middleware/          # Custom middleware
│   ├── controllers/         # Business logic
│   ├── config/              # Configuration files
│   ├── utils/               # Utility functions
│   └── app.js              # Express app setup
├── demo/                    # Demo data and scripts
│   ├── sample-data/         # Sample JSON files
│   ├── API_EXAMPLES.md      # API usage examples
│   └── run-demo.js          # Demo runner script
├── tests/                   # Test files
├── docs/                    # Documentation
├── package.json
├── .env.example
└── README.md
```

## 🔌 API Endpoints

### Books
```
GET    /api/books                 # List all books (paginated)
GET    /api/books/:id             # Get book details
POST   /api/books                 # Add new book
PUT    /api/books/:id             # Update book
DELETE /api/books/:id             # Delete book
```

### Members
```
GET    /api/members               # List all members
GET    /api/members/:id           # Get member details
POST   /api/members               # Register new member
PUT    /api/members/:id           # Update member profile
DELETE /api/members/:id           # Remove member
```

### Borrowing
```
GET    /api/borrowing             # View borrowing records
POST   /api/borrowing/borrow      # Borrow a book
POST   /api/borrowing/return/:id  # Return a book
```

### Authors
```
GET    /api/authors               # List authors
GET    /api/authors/:id           # Get author details
POST   /api/authors               # Add author
PUT    /api/authors/:id           # Update author
DELETE /api/authors/:id           # Delete author
```

## 💾 Database Models

### Book Schema
- Title, ISBN, Author reference
- Genre (Fiction, Science, History, etc.)
- Publication year, Publisher
- Available copies tracking
- Physical location (shelf, row, section)
- Condition rating

### Member Schema
- First/Last name, Email, Phone
- Membership type (Basic, Premium, Student)
- Address information
- Borrowing limit and current count
- Fine tracking

### Borrowing Schema
- Book and Member references
- Borrow date, Due date, Return date
- Status (Borrowed, Returned, Overdue)
- Fine amount and payment status

### Author Schema
- Bio, Birth year, Nationality
- Awards and achievements
- Active status

## 📊 Response Format

All API responses follow a consistent structure:

**Success:**
```json
{
  "success": true,
  "data": { /* resource data */ },
  "count": 10,
  "total": 50,
  "page": 1
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error description"
}
```

## 🧪 Testing

```bash
npm test                    # Run all tests
npm test -- --coverage      # With coverage report
```

## 📝 Demo Mode

### Load Sample Data
```bash
npm run seed
```

### Run Demo
```bash
npm run demo
```

This will populate the database with sample books, members, and borrowing records for testing.

See [demo/API_EXAMPLES.md](demo/API_EXAMPLES.md) for detailed API usage examples.

## 🛠️ Usage Examples

### Register a Member
```bash
curl -X POST http://localhost:5000/api/members \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "555-1234",
    "membershipType": "Premium"
  }'
```

### Add a Book
```bash
curl -X POST http://localhost:5000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Great Gatsby",
    "isbn": "978-0-7432-7356-5",
    "author": "507f1f77bcf86cd799439011",
    "totalCopies": 5,
    "genre": "Fiction"
  }'
```

### Borrow a Book
```bash
curl -X POST http://localhost:5000/api/borrowing/borrow \
  -H "Content-Type: application/json" \
  -d '{
    "bookId": "507f1f77bcf86cd799439011",
    "memberId": "507f1f77bcf86cd799439012",
    "dueDate": "2024-05-15"
  }'
```

## 🔐 Security Features

- Input validation on all endpoints
- Password hashing with bcryptjs
- MongoDB injection prevention
- Rate limiting (configured in env)
- CORS support ready
- Error handling middleware

## 📈 Business Logic

### Fine System
- Automatic fine calculation for overdue books
- $5 per day after due date
- Fine tracking per member
- Payment status management

### Borrowing Limits
- Basic members: 5 books
- Premium members: 10 books
- Student members: 7 books
- Enforced at borrow time

### Book Availability
- Tracks total and available copies
- Updates on borrow/return
- Prevents over-borrowing

## 🚧 Future Enhancements

- [ ] Email notifications for due dates
- [ ] Advanced reporting dashboard
- [ ] Book reviews and ratings
- [ ] Reservation system
- [ ] Mobile app integration
- [ ] Multi-branch support
- [ ] Document upload (book covers)
- [ ] SMS reminders

## 📄 License

MIT License - Feel free to use this project for educational and commercial purposes.

## 👨‍💻 Support

For issues, suggestions, or contributions, please check the documentation or create an issue in the project repository.

---

**Made with ❤️ for Library Managers**
