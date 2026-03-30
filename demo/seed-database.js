/**
 * Database Seed Script
 * Populates the database with sample data for demo and testing
 */

const mongoose = require('mongoose');
require('dotenv').config();

const Book = require('../src/models/Book');
const Member = require('../src/models/Member');
const Author = require('../src/models/Author');
const Borrowing = require('../src/models/Borrowing');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/library';

const authors = [
  {
    firstName: 'F. Scott',
    lastName: 'Fitzgerald',
    email: 'scott@writers.com',
    bio: 'American writer and author of The Great Gatsby',
    birthYear: 1896,
    nationality: 'American',
    awards: ['National Book Award']
  },
  {
    firstName: 'Harper',
    lastName: 'Lee',
    email: 'harper@writers.com',
    bio: 'Author of To Kill a Mockingbird',
    birthYear: 1926,
    nationality: 'American'
  },
  {
    firstName: 'George',
    lastName: 'Orwell',
    email: 'george@writers.com',
    bio: 'English author famous for dystopian novels',
    birthYear: 1903,
    nationality: 'British'
  },
  {
    firstName: 'Stephen',
    lastName: 'Hawking',
    email: 'stephen@science.com',
    bio: 'Theoretical physicist and cosmologist',
    birthYear: 1942,
    nationality: 'British'
  }
];

const members = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '555-0101',
    membershipType: 'Premium',
    status: 'Active',
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    borrowingLimit: 10,
    password: 'Password123'
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '555-0102',
    membershipType: 'Basic',
    status: 'Active',
    address: {
      street: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      country: 'USA'
    },
    borrowingLimit: 5,
    password: 'Password123'
  },
  {
    firstName: 'Robert',
    lastName: 'Johnson',
    email: 'robert.johnson@example.com',
    phone: '555-0103',
    membershipType: 'Student',
    status: 'Active',
    address: {
      street: '789 Elm St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      country: 'USA'
    },
    borrowingLimit: 7,
    password: 'Password123'
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');

    // Clear existing data
    await Author.deleteMany({});
    await Member.deleteMany({});
    await Book.deleteMany({});
    await Borrowing.deleteMany({});
    console.log('✓ Cleared existing data');

    // Seed authors
    const createdAuthors = await Author.insertMany(authors);
    console.log(`✓ Created ${createdAuthors.length} authors`);

    // Seed books with author references
    const books = [
      {
        title: 'The Great Gatsby',
        isbn: '978-0-7432-7356-5',
        author: createdAuthors[0]._id,
        publisher: 'Scribner',
        publicationYear: 1925,
        genre: 'Fiction',
        description: 'A classic American novel set in the Jazz Age.',
        totalCopies: 5,
        availableCopies: 3,
        condition: 'Good',
        price: 12.99,
        location: { shelf: 'A1', row: '3', section: 'Fiction' }
      },
      {
        title: 'To Kill a Mockingbird',
        isbn: '978-0-06-112008-4',
        author: createdAuthors[1]._id,
        publisher: 'J.B. Lippincott',
        publicationYear: 1960,
        genre: 'Fiction',
        description: 'A gripping tale of race relations in the American South.',
        totalCopies: 4,
        availableCopies: 2,
        condition: 'Excellent',
        price: 14.99,
        location: { shelf: 'B2', row: '1', section: 'Fiction' }
      },
      {
        title: '1984',
        isbn: '978-0-451-52493-2',
        author: createdAuthors[2]._id,
        publisher: 'Secker & Warburg',
        publicationYear: 1949,
        genre: 'Fiction',
        description: 'A dystopian novel depicting totalitarianism.',
        totalCopies: 6,
        availableCopies: 4,
        condition: 'Good',
        price: 13.99,
        location: { shelf: 'C3', row: '2', section: 'Fiction' }
      },
      {
        title: 'A Brief History of Time',
        isbn: '978-0-553-38016-3',
        author: createdAuthors[3]._id,
        publisher: 'Bantam',
        publicationYear: 1988,
        genre: 'Science',
        description: 'An overview of cosmology and black holes.',
        totalCopies: 3,
        availableCopies: 2,
        condition: 'Fair',
        price: 15.99,
        location: { shelf: 'D1', row: '4', section: 'Science' }
      }
    ];

    const createdBooks = await Book.insertMany(books);
    console.log(`✓ Created ${createdBooks.length} books`);

    // Seed members
    const createdMembers = await Member.insertMany(members);
    console.log(`✓ Created ${createdMembers.length} members`);

    // Create sample borrowing records
    const borrowing = [
      {
        bookId: createdBooks[0]._id,
        memberId: createdMembers[0]._id,
        borrowDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        status: 'Borrowed'
      },
      {
        bookId: createdBooks[1]._id,
        memberId: createdMembers[1]._id,
        borrowDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
        dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        returnDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        status: 'Returned',
        fineAmount: 15.00,
        finePaid: false
      }
    ];

    const createdBorrowings = await Borrowing.insertMany(borrowing);
    console.log(`✓ Created ${createdBorrowings.length} borrowing records`);

    console.log('\n✅ Database seeding completed successfully!');
    console.log(`
Demo Statistics:
  • Authors: ${createdAuthors.length}
  • Books: ${createdBooks.length}
  • Members: ${createdMembers.length}
  • Borrowing Records: ${createdBorrowings.length}
    `);

    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  }
}

seedDatabase();
