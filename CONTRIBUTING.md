# Contributing to Library Management System

Thank you for your interest in contributing to the Library Management System project! This guide will help you get started.

## Code of Conduct

- Be respectful and professional
- Provide constructive feedback
- Welcome diverse perspectives
- Help create a positive environment

## Getting Started

### 1. Fork and Clone
```bash
git clone https://github.com/yourusername/library.git
cd library
npm install
```

### 2. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 3. Make Your Changes
- Follow existing code style
- Add tests for new features
- Update documentation as needed

### 4. Testing
```bash
npm test
npm run demo
```

### 5. Commit and Push
```bash
git add .
git commit -m "feat: Add your feature description"
git push origin feature/your-feature-name
```

### 6. Create Pull Request
- Describe changes clearly
- Reference related issues
- Wait for review

## Code Style Guidelines

### JavaScript Style
```javascript
// Use const/let, not var
const user = new User();
let count = 0;

// Use arrow functions
const getData = () => { /* ... */ };

// Use template literals
const message = `Hello ${name}`;

// Proper spacing
const obj = {
  name: 'test',
  value: 123
};

// Comments for complex logic
// Calculate fine if book is overdue
const daysLate = Math.floor((now - dueDate) / (1000 * 60 * 60 * 24));
const fine = daysLate * 5;
```

### File Naming
- `/models/Book.js` - PascalCase
- `/routes/bookRoutes.js` - camelCase
- `get-user.js` - kebab-case (utilities)

### Commit Messages
```
feat: Add book search by ISBN
fix: Resolve member fine calculation
docs: Update API documentation
test: Add borrowing system tests
refactor: Restructure validation logic
```

## Adding New Features

### Adding a New API Endpoint

**1. Create/Update Model** (`src/models/YourModel.js`)
```javascript
const schema = new mongoose.Schema({
  // Your fields
}, { timestamps: true });

module.exports = mongoose.model('YourModel', schema);
```

**2. Create Route Handler** (`src/routes/yourRoutes.js`)
```javascript
const express = require('express');
const router = express.Router();
const Model = require('../models/YourModel');

router.get('/', async (req, res) => {
  try {
    const data = await Model.find();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
```

**3. Register Route** (`src/app.js`)
```javascript
app.use('/api/your-resource', require('./routes/yourRoutes'));
```

**4. Add Tests** (`tests/model.test.js`)
```javascript
describe('Your Feature', () => {
  it('should perform action', async () => {
    // Test code
  });
});
```

**5. Update Documentation** (`docs/ARCHITECTURE.md`, `demo/API_EXAMPLES.md`)

## Testing

### Unit Tests
```javascript
// tests/yourTest.js
describe('Feature Name', () => {
  it('should do something', async () => {
    const result = await someFunction();
    expect(result).toBe(expected);
  });
});
```

### Running Tests
```bash
npm test                  # Run all tests
npm test -- --watch      # Watch mode
npm test -- --coverage   # Coverage report
```

### Test Coverage Goal
- Aim for 80%+ coverage
- Test edge cases
- Include error scenarios

## Documentation Requirements

### For New Features
- [ ] Update README.md
- [ ] Add examples to API_EXAMPLES.md
- [ ] Update ARCHITECTURE.md if needed
- [ ] Add code comments for complex logic
- [ ] Create/update related docs

### Documentation Standards
```markdown
## Feature Name

### Description
Clear explanation of what the feature does.

### Endpoints
```
GET /api/resource
POST /api/resource
```

### Example Usage
```bash
curl -X GET http://localhost:5000/api/resource
```

### Response
```json
{
  "success": true,
  "data": { }
}
```
```

## Issues & Bugs

### Reporting a Bug
1. Check existing issues first
2. Provide reproduction steps
3. Include system information
4. Attach error logs/screenshots

### Issue Template
```
### Description
[Clear description of the bug]

### Steps to Reproduce
1. [Step 1]
2. [Step 2]
3. [Step 3]

### Expected Behavior
[What should happen]

### Actual Behavior
[What actually happens]

### Environment
- Node version: 
- MongoDB version:
- OS: 
```

## Pull Request Process

### Before Submitting
- [ ] Tests pass: `npm test`
- [ ] Code follows style guide
- [ ] Documentation is updated
- [ ] No console.log statements left
- [ ] Commits are clean and descriptive

### PR Template
```markdown
## Description
[Describe your changes]

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Fixes #(issue number)

## Testing
[Describe how you tested this]

## Screenshots (if applicable)
[Add screenshots for UI changes]

## Checklist
- [ ] Tests pass
- [ ] Documentation updated
- [ ] No new warnings
```

## Development Tips

### Useful Commands
```bash
npm run dev              # Development with auto-reload
npm run seed             # Populate test data
npm run demo             # Run demo script
npm test                 # Run tests
npm start                # Production run
```

### Debugging
```bash
# Add in your code
console.log('Debug:', variable);
debugger; // Use node --inspect

# Then run
node --inspect src/app.js
```

### Database Testing
```javascript
// Clear collections before tests
beforeEach(async () => {
  await Book.deleteMany({});
  await Member.deleteMany({});
});
```

## Performance Guidelines

- ✅ Use database indexes
- ✅ Implement pagination (limit 10-50)
- ✅ Avoid N+1 queries (use populate)
- ✅ Cache frequently accessed data
- ✅ Use async/await properly
- ✅ Validate input early

### Example: Optimized Query
```javascript
// Bad: N+1 query problem
const members = await Member.find();
for (const member of members) {
  const books = await Book.find({ memberId: member._id });
}

// Good: Populate relationships
const members = await Member.find().populate('books');
```

## Security Practices

- ✅ Validate all inputs
- ✅ Sanitize user data
- ✅ Hash passwords
- ✅ Use environment variables
- ✅ Don't expose sensitive data
- ✅ Implement rate limiting
- ✅ Use HTTPS in production

## Release Process

### Version Numbers (SemVer)
- `1.0.0` = MAJOR.MINOR.PATCH
- MAJOR: Breaking changes
- MINOR: New features
- PATCH: Bug fixes

### Release Steps
1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create git tag: `git tag v1.0.0`
4. Push tag: `git push origin v1.0.0`
5. Create release notes

## Resources

### Documentation
- [Node.js Docs](https://nodejs.org/docs/)
- [Express Guide](https://expressjs.com/guide/routing.html)
- [Mongoose Manual](https://mongoosejs.com/docs/guide.html)
- [MongoDB Docs](https://docs.mongodb.com/)

### Tools
- [Postman](https://www.postman.com/) - API Testing
- [VSCode](https://code.visualstudio.com/) - Editor
- [MongoDB Compass](https://www.mongodb.com/products/compass) - Database GUI

### Learning
- [REST API Best Practices](https://restfulapi.net/)
- [JavaScript.info](https://javascript.info/)
- [MDN Web Docs](https://developer.mozilla.org/)

## Questions?

- Open an issue with question label
- Check existing documentation
- Reach out to project maintainers

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing! 🎉**

Together we make this project better for everyone! 📚
