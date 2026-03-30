/**
 * Basic Unit Tests for Library Management System
 * Using Jest and Supertest
 */

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');

describe('Library Management System API', () => {
  
  // Connect to test database before running tests
  beforeAll(async () => {
    const testDbUri = process.env.TEST_MONGODB_URI || 'mongodb://localhost:27017/library-test';
    await mongoose.connect(testDbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  // Close database after tests
  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('Health Check', () => {
    it('should return health status', async () => {
      const res = await request(app)
        .get('/health')
        .expect(200);
      
      expect(res.body.status).toBeDefined();
      expect(res.body.timestamp).toBeDefined();
    });
  });

  describe('Books API', () => {
    it('should get books list', async () => {
      const res = await request(app)
        .get('/api/books')
        .expect(200);
      
      expect(res.body.success).toBe(true);
      expect(res.body.data).toBeInstanceOf(Array);
    });

    it('should handle pagination', async () => {
      const res = await request(app)
        .get('/api/books?page=1&limit=10')
        .expect(200);
      
      expect(res.body.page).toBe(1);
      expect(res.body.count).toBeLessThanOrEqual(10);
    });
  });

  describe('Members API', () => {
    it('should get members list', async () => {
      const res = await request(app)
        .get('/api/members')
        .expect(200);
      
      expect(res.body.success).toBe(true);
      expect(res.body.data).toBeInstanceOf(Array);
    });
  });

  describe('Authors API', () => {
    it('should get authors list', async () => {
      const res = await request(app)
        .get('/api/authors')
        .expect(200);
      
      expect(res.body.success).toBe(true);
      expect(res.body.data).toBeInstanceOf(Array);
    });
  });

  describe('Error Handling', () => {
    it('should return 404 for non-existent book', async () => {
      const res = await request(app)
        .get('/api/books/000000000000000000000000')
        .expect(404);
      
      expect(res.body.success).toBe(false);
    });
  });
});
