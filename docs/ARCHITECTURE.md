# Project Documentation

## Architecture Overview

The Library Management System follows a modular MVC-like architecture:

### Directory Structure
```
src/
├── models/         - Database schemas (Book, Member, Author, Borrowing)
├── routes/         - API endpoints and routing
├── controllers/    - Business logic (ready for expansion)
├── middleware/     - Custom middleware (ready for expansion)
├── config/         - Configuration files
├── utils/          - Utility functions
└── app.js          - Express app initialization
```

## Database Schema

### Book
```javascript
{
  title: String,
  isbn: String (unique),
  author: ObjectId (reference to Author),
  publisher: String,
  publicationYear: Number,
  genre: Enum['Fiction', 'Non-Fiction', 'Science', ...],
  description: String,
  totalCopies: Number,
  availableCopies: Number,
  location: {
    shelf: String,
    row: String,
    section: String
  },
  condition: Enum['Excellent', 'Good', 'Fair', 'Poor'],
  price: Number
}
```

### Member
```javascript
{
  firstName: String,
  lastName: String,
  email: String (unique),
  phone: String,
  membershipType: Enum['Basic', 'Premium', 'Student'],
  status: Enum['Active', 'Inactive', 'Suspended'],
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  borrowingLimit: Number,
  currentBorrowingCount: Number,
  password: String (hashed),
  fines: Number
}
```

### Borrowing
```javascript
{
  bookId: ObjectId,
  memberId: ObjectId,
  borrowDate: Date,
  dueDate: Date,
  returnDate: Date,
  status: Enum['Borrowed', 'Returned', 'Overdue'],
  fineAmount: Number,
  finePaid: Boolean
}
```

### Author
```javascript
{
  firstName: String,
  lastName: String,
  email: String,
  bio: String,
  birthYear: Number,
  nationality: String,
  awards: [String],
  totalBooks: Number,
  isActive: Boolean
}
```

## Feature Specifications

### Book Management
- Add, update, delete books
- Track inventory with copy management
- Store location information
- Support multiple genres
- Price and condition tracking

### Member Management
- Registration with validation
- Multiple membership tiers
- Borrowing limit enforcement
- Fine tracking system
- Status management (Active/Inactive/Suspended)

### Borrowing System
- Borrow with automatic due date
- Return with fine calculation
- Availability tracking
- Prevent over-borrowing
- Automatic limit enforcement

### Fine System
- $5 per day for overdue books
- Automatic calculation on return
- Fine tracking per member
- Payment status management

## API Response Format

All responses follow this format:

### Success Response
```json
{
  "success": true,
  "data": { /* resource or array */ },
  "count": 10,
  "total": 50,
  "page": 1,
  "pages": 5
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

## Running the Project

### Development Mode
```bash
npm install
npm run dev
```

### Production Mode
```bash
npm install --production
npm start
```

### Demo Mode
```bash
npm run seed      # Populate with sample data
npm run demo      # Run interactive demo
```

## Testing

```bash
npm test                    # Run all tests
npm test -- --watch         # Watch mode
npm test -- --coverage      # Coverage report
```

## Configuration

### Environment Variables
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/library
JWT_SECRET=your_secret_key
API_RATE_LIMIT=100
```

## Security Features

1. **Input Validation**: Joi schemas on all endpoints
2. **Password Security**: Bcrypt hashing
3. **MongoDB Injection Prevention**: Using mongoose sanitization
4. **CORS Ready**: Easily configurable
5. **Error Handling**: Standardized error responses
6. **Rate Limiting**: Configurable per environment

## Future Enhancements

### Phase 2
- [ ] JWT authentication
- [ ] Role-based access control (Admin, Librarian, Member)
- [ ] Email notifications
- [ ] SMS reminders
- [ ] Book reviews and ratings

### Phase 3
- [ ] Mobile application
- [ ] Advanced reporting dashboard
- [ ] Book reservation system
- [ ] Multi-branch support
- [ ] QR code integration

### Phase 4
- [ ] Document upload (book covers, PDFs)
- [ ] Analytics and insights
- [ ] Automated fine collection
- [ ] Integration with external APIs
- [ ] Machine learning recommendations

## Deployment

### Docker Deployment
Create a Dockerfile and docker-compose.yml for containerized deployment.

### Cloud Deployment
- Heroku: `git push heroku main`
- AWS: Use Elastic Beanstalk
- Azure: App Service
- DigitalOcean: App Platform

## Support & Contributing

For issues, feature requests, or contributions:
1. Check existing issues
2. Create detailed bug reports
3. Follow code style guidelines
4. Submit pull requests with tests

## License

MIT License - Feel free to use this project commercially or educationally.
