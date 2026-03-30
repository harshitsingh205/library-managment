# Getting Started Guide

## Prerequisites

Before you begin, ensure you have installed:
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - [Download here](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** (optional) - [Download here](https://git-scm.com/)
- **Postman or Insomnia** (for API testing)

## Step 1: Installation

### 1.1 Navigate to Project Directory
```bash
cd library
```

### 1.2 Install Dependencies
```bash
npm install
```

This will install all required packages:
- `express` - Web framework
- `mongoose` - MongoDB ORM
- `dotenv` - Environment variable management
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT authentication (for future use)

## Step 2: Configuration

### 2.1 Create Environment File
```bash
cp .env.example .env
```

### 2.2 Edit `.env` File
Open `.env` and configure:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/library
JWT_SECRET=demo_secret_key_change_in_production
API_RATE_LIMIT=100
```

**For MongoDB Atlas (Cloud):**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/library
```

## Step 3: Database Setup

### 3.1 Ensure MongoDB is Running

**Local MongoDB:**
```bash
# Windows
mongod

# macOS/Linux
mongod --dbpath /path/to/data
```

**MongoDB Atlas:**
- No setup needed, just ensure your URI is correct in `.env`

### 3.2 Seed Demo Data (Optional)
```bash
npm run seed
```

This populates the database with sample authors, books, members, and borrowing records.

## Step 4: Start the Server

### 4.1 Development Mode (with auto-reload)
```bash
npm run dev
```

### 4.2 Production Mode
```bash
npm start
```

You should see:
```
✓ MongoDB connected successfully
📚 Library Management System listening on port 5000
```

### 4.3 Test API Health
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "Library Management System running",
  "timestamp": "2024-03-30T..."
}
```

## Step 5: Running the Demo

### 5.1 Start Interactive Demo
```bash
npm run demo
```

This will:
1. Create sample authors
2. Add books to library
3. Register members
4. Demonstrate borrowing/returning books
5. Show the complete workflow

## Step 6: Testing the API

### 6.1 Using Postman

1. **Import Collection:**
   - Open Postman
   - New → HTTP Request

2. **Create a Member:**
   ```
   POST http://localhost:5000/api/members
   Content-Type: application/json

   {
     "firstName": "Alice",
     "lastName": "Wonder",
     "email": "alice@example.com",
     "phone": "555-1234",
     "membershipType": "Premium"
   }
   ```

3. **Add a Book:**
   ```
   POST http://localhost:5000/api/books
   Content-Type: application/json

   {
     "title": "The Hobbit",
     "isbn": "978-0-547-92832-6",
     "author": "<author_id>",
     "totalCopies": 5,
     "genre": "Fiction"
   }
   ```

### 6.2 Using cURL

```bash
# List all books
curl http://localhost:5000/api/books

# Create a new member
curl -X POST http://localhost:5000/api/members \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Bob",
    "lastName": "Builder",
    "email": "bob@example.com",
    "phone": "555-5678",
    "membershipType": "Basic"
  }'

# Get specific member
curl http://localhost:5000/api/members/<member_id>
```

## Step 7: Run Tests

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run in watch mode
npm test -- --watch
```

## Common Issues & Solutions

### Issue: Cannot connect to MongoDB
**Solution:**
- Ensure MongoDB is running (`mongod` on Windows/Mac/Linux)
- Check MONGODB_URI in `.env`
- For Atlas, verify IP whitelist includes your machine

### Issue: Port 5000 already in use
**Solution:**
- Change PORT in `.env` to another number (e.g., 5001)
- Or kill the process using the port:
  ```bash
  # Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F

  # macOS/Linux
  lsof -i :5000
  kill -9 <PID>
  ```

### Issue: Module not found error
**Solution:**
- Reinstall dependencies:
  ```bash
  rm -rf node_modules
  npm install
  ```

### Issue: API returns 404
**Solution:**
- Ensure all routes are loaded in `app.js`
- Check endpoint URL spelling
- Verify the resource exists (try GET request first)

## Next Steps

1. **Explore API Endpoints:** Check [API_EXAMPLES.md](../demo/API_EXAMPLES.md)
2. **Read Architecture:** Review [ARCHITECTURE.md](ARCHITECTURE.md)
3. **Customize:** Modify models, add new endpoints, extend features
4. **Deploy:** Follow deployment guides for your platform
5. **Scale:** Add authentication, implement caching, optimize queries

## Quick Reference

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies |
| `npm start` | Start server (production) |
| `npm run dev` | Start server (development) |
| `npm run seed` | Populate database with demo data |
| `npm run demo` | Run interactive demo |
| `npm test` | Run test suite |

## Support Resources

- **Express.js Docs:** https://expressjs.com/
- **Mongoose Docs:** https://mongoosejs.com/
- **MongoDB Docs:** https://docs.mongodb.com/
- **Node.js Docs:** https://nodejs.org/docs/

Good luck with your Library Management System! 📚
