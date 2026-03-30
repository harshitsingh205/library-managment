#!/usr/bin/env node

/**
 * Demo Runner Script
 * Shows common operations in the Library Management System
 */

const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m'
};

const log = (message, color = 'reset') => {
  console.log(`${colors[color]}${message}${colors.reset}`);
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function runDemo() {
  log('\n╔════════════════════════════════════════════════════════════╗', 'cyan');
  log('║     Library Management System - Interactive Demo        ║', 'cyan');
  log('╚════════════════════════════════════════════════════════════╝\n', 'cyan');

  try {
    // 1. Check API Health
    log('✓ Step 1: Checking API Health...', 'bright');
    const health = await axios.get('http://localhost:5000/health');
    log(`✓ API Status: ${health.data.status}\n`, 'green');
    await sleep(1000);

    // 2. Create an Author
    log('✓ Step 2: Creating Sample Author...', 'bright');
    const authorRes = await axios.post(`${API_URL}/authors`, {
      firstName: 'Isaac',
      lastName: 'Asimov',
      email: 'isaac@scifi.com',
      bio: 'Legendary science fiction author and biochemist',
      birthYear: 1920,
      nationality: 'American',
      awards: ['Hugo Award', 'Nebula Award']
    });
    const authorId = authorRes.data.data._id;
    log(`✓ Author Created: ${authorRes.data.data.firstName} ${authorRes.data.data.lastName}`, 'green');
    log(`  ID: ${authorId}\n`);
    await sleep(1000);

    // 3. Add Books
    log('✓ Step 3: Adding Books to Library...', 'bright');
    const books = [
      {
        title: 'Foundation',
        isbn: '978-0-553-29438-0',
        author: authorId,
        publisher: 'Doubleday',
        publicationYear: 1951,
        genre: 'Science',
        totalCopies: 3,
        condition: 'Good',
        price: 14.99
      },
      {
        title: 'I, Robot',
        isbn: '978-0-553-29730-5',
        author: authorId,
        publisher: 'Gnome Press',
        publicationYear: 1950,
        genre: 'Science',
        totalCopies: 4,
        condition: 'Excellent',
        price: 12.99
      }
    ];

    let bookIds = [];
    for (const book of books) {
      book.availableCopies = book.totalCopies;
      const res = await axios.post(`${API_URL}/books`, book);
      bookIds.push(res.data.data._id);
      log(`  ✓ Added: "${res.data.data.title}"`, 'green');
    }
    log();
    await sleep(1000);

    // 4. Register Members
    log('✓ Step 4: Registering Library Members...', 'bright');
    const members = [
      {
        firstName: 'Emma',
        lastName: 'Wilson',
        email: 'emma@example.com',
        phone: '555-0001',
        membershipType: 'Premium',
        status: 'Active'
      },
      {
        firstName: 'Michael',
        lastName: 'Brown',
        email: 'michael@example.com',
        phone: '555-0002',
        membershipType: 'Basic',
        status: 'Active'
      }
    ];

    let memberIds = [];
    for (const member of members) {
      const res = await axios.post(`${API_URL}/members`, member);
      memberIds.push(res.data.data._id);
      log(`  ✓ Member Registered: ${res.data.data.firstName} ${res.data.data.lastName}`, 'green');
    }
    log();
    await sleep(1000);

    // 5. List Books
    log('✓ Step 5: Listing All Books...', 'bright');
    const booksRes = await axios.get(`${API_URL}/books?limit=10`);
    log(`✓ Total Books in Library: ${booksRes.data.total}`, 'green');
    booksRes.data.data.forEach(book => {
      log(`  📖 ${book.title} (Available: ${book.availableCopies}/${book.totalCopies})`);
    });
    log();
    await sleep(1000);

    // 6. Borrow a Book
    log('✓ Step 6: Member Borrows a Book...', 'bright');
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);

    const borrowRes = await axios.post(`${API_URL}/borrowing/borrow`, {
      bookId: bookIds[0],
      memberId: memberIds[0],
      dueDate: dueDate.toISOString().split('T')[0]
    });
    log(`✓ Book Borrowed Successfully!`, 'green');
    log(`  Member: ${borrowRes.data.data.memberId}`);
    log(`  Due Date: ${borrowRes.data.data.dueDate.split('T')[0]}\n`);
    await sleep(1000);

    // 7. View Borrowing Records
    log('✓ Step 7: Viewing Borrowing Records...', 'bright');
    const borrowRes2 = await axios.get(`${API_URL}/borrowing?status=Borrowed`);
    log(`✓ Active Borrowing Records: ${borrowRes2.data.count}`, 'green');
    borrowRes2.data.data.forEach(record => {
      log(`  • Book borrowed on: ${record.borrowDate.split('T')[0]}`);
      log(`    Due date: ${record.dueDate.split('T')[0]}`);
    });
    log();
    await sleep(1000);

    // 8. Return a Book
    log('✓ Step 8: Member Returns the Book...', 'bright');
    const returnRes = await axios.post(`${API_URL}/borrowing/return/${borrowRes.data.data._id}`);
    log(`✓ Book Returned Successfully!`, 'green');
    log(`  Return Date: ${returnRes.data.data.returnDate.split('T')[0]}`);
    log(`  Status: ${returnRes.data.data.status}`);
    if (returnRes.data.data.fineAmount > 0) {
      log(`  ⚠️  Fine Amount: $${returnRes.data.data.fineAmount.toFixed(2)}`);
    } else {
      log(`  ✓ No Fine (Returned on time)`);
    }
    log();
    await sleep(1000);

    // 9. View Member Details
    log('✓ Step 9: Viewing Member Profile...', 'bright');
    const memberRes = await axios.get(`${API_URL}/members/${memberIds[0]}`);
    const member = memberRes.data.data;
    log(`✓ Member Profile:`, 'green');
    log(`  Name: ${member.firstName} ${member.lastName}`);
    log(`  Email: ${member.email}`);
    log(`  Membership: ${member.membershipType}`);
    log(`  Current Borrowing: ${member.currentBorrowingCount}/${member.borrowingLimit}`);
    log(`  Outstanding Fines: $${member.fines.toFixed(2)}\n`);
    await sleep(1000);

    // 10. Summary
    log('╔════════════════════════════════════════════════════════════╗', 'cyan');
    log('║            Demo Completed Successfully! 🎉               ║', 'cyan');
    log('╚════════════════════════════════════════════════════════════╝\n', 'cyan');

    log('📊 Demo Summary:', 'bright');
    log(`  • Authors Created: 1`);
    log(`  • Books Added: ${bookIds.length}`);
    log(`  • Members Registered: ${memberIds.length}`);
    log(`  • Borrowing Transactions: 1`);
    log(`  • Return Transactions: 1\n`);

    log('📚 Next Steps:', 'yellow');
    log(`  1. Explore the API using Postman or curl`);
    log(`  2. Check API_EXAMPLES.md for more endpoints`);
    log(`  3. Add more books and members`);
    log(`  4. Test the fine calculation system\n`);

  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      log('\n❌ Error: Cannot connect to API', 'red');
      log('Please make sure the server is running: npm start\n', 'yellow');
    } else if (error.response) {
      log(`\n❌ API Error: ${error.response.status}`, 'red');
      log(`Message: ${error.response.data.message}\n`, 'red');
    } else {
      log(`\n❌ Error: ${error.message}\n`, 'red');
    }
    process.exit(1);
  }
}

// Run the demo
runDemo();
