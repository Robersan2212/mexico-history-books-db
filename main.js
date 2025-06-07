import { DatabaseOperations } from './database-operations.js';
import { AuthOperations } from './auth-operations.js';
import { initializeDatabase } from './initialize-database.js';
import readlineSync from 'readline-sync';

class MexicanHistoryBooksApp {
  
  static async showViewerMenu() {
    console.log('\n🇲🇽 MEXICAN HISTORY BOOKS DATABASE (VIEWER MODE) 🇲🇽');
    console.log('====================================================');
    console.log('📖 READ-ONLY ACCESS - Contact admin for changes');
    console.log('====================================================');
    console.log('1. View All Books');
    console.log('2. Search Books by Period');
    console.log('3. Search Books by Author');
    console.log('4. View All Periods');
    console.log('5. Authentication Menu');
    console.log('6. Exit');
    console.log('====================================================');
  }

  static async showAdminMenu() {
    console.log('\n🇲🇽 MEXICAN HISTORY BOOKS DATABASE (ADMIN MODE) 🇲🇽');
    console.log('==================================================');
    console.log('🔐 FULL ACCESS - All operations available');
    console.log('==================================================');
    console.log('1. Initialize Database');
    console.log('2. View All Books');
    console.log('3. Search Books by Period');
    console.log('4. Search Books by Author');
    console.log('5. Add New Book');
    console.log('6. Update Book');
    console.log('7. Delete Book');
    console.log('8. Authentication Menu');
    console.log('9. Exit');
    console.log('==================================================');
  }

  static async authMenu() {
    console.log('\n🔐 AUTHENTICATION MENU');
    console.log('======================');
    console.log('1. Register as Viewer');
    console.log('2. Register as Admin');
    console.log('3. Login');
    console.log('4. Logout');
    console.log('5. Check Current User & Role');
    console.log('6. Back to Main Menu');
  }

  static async handleAuthMenu() {
    while (true) {
      await this.authMenu();
      const choice = readlineSync.question('Choose option: ');
      
      try {
        switch (choice) {
          case '1':
            const viewerEmail = readlineSync.questionEMail('Email: ');
            const viewerPassword = readlineSync.question('Password: ', { hideEchoBack: true });
            await AuthOperations.registerUser(viewerEmail, viewerPassword, 'viewer');
            break;
            
          case '2':
            const adminEmail = readlineSync.questionEMail('Admin Email: ');
            const adminPassword = readlineSync.question('Admin Password: ', { hideEchoBack: true });
            await AuthOperations.createAdminUser(adminEmail, adminPassword);
            break;
            
          case '3':
            const loginEmail = readlineSync.questionEMail('Email: ');
            const loginPassword = readlineSync.question('Password: ', { hideEchoBack: true });
            await AuthOperations.loginUser(loginEmail, loginPassword);
            break;
            
          case '4':
            await AuthOperations.logoutUser();
            break;
            
          case '5':
            const user = await AuthOperations.getCurrentUser();
            if (user) {
              const role = await AuthOperations.getUserRole(user.uid);
              console.log(`Current user: ${user.email} (Role: ${role})`);
            } else {
              console.log('No user logged in');
            }
            break;
            
          case '6':
            return;
        }
      } catch (error) {
        console.error('❌ Error:', error.message);
      }
    }
  }

  static async run() {
    console.log('🎉 Welcome to Mexican History Books Database!');
    console.log('📚 Secure Access Control Enabled');
    
    while (true) {
      try {
        // Check if user is admin
        const isAdmin = await AuthOperations.isCurrentUserAdmin();
        const user = await AuthOperations.getCurrentUser();
        
        if (user) {
          const role = await AuthOperations.getUserRole(user.uid);
          console.log(`\n👤 Logged in as: ${user.email} (${role.toUpperCase()})`);
        } else {
          console.log('\n👤 Not logged in - READ-ONLY access');
        }
        
        // Show appropriate menu
        if (isAdmin) {
          await this.showAdminMenu();
        } else {
          await this.showViewerMenu();
        }
        
        const choice = readlineSync.question('Choose an option: ');
        
        switch (choice) {
          case '1':
            if (isAdmin) {
              await initializeDatabase();
            } else {
              // View all books for viewers
              const allBooks = await DatabaseOperations.getAllBooks();
              console.table(allBooks.map(book => ({
                Title: book.title,
                Authors: book.authors.join(', '),
                Period: book.period,
                Category: book.category
              })));
            }
            break;
            
          case '2':
            const allBooks = await DatabaseOperations.getAllBooks();
            console.table(allBooks.map(book => ({
              Title: book.title,
              Authors: book.authors.join(', '),
              Period: book.period,
              Category: book.category
            })));
            break;
            
          case '3':
            const periods = await DatabaseOperations.getAllPeriods();
            console.log('\nAvailable periods:');
            periods.forEach(p => console.log(`- ${p.id}: ${p.name}`));
            const periodId = readlineSync.question('Enter period ID: ');
            const periodBooks = await DatabaseOperations.getBooksByPeriod(periodId);
            console.table(periodBooks.map(book => ({
              Title: book.title,
              Authors: book.authors.join(', ')
            })));
            break;
            
          case '4':
            if (isAdmin) {
              const authorName = readlineSync.question('Enter author name: ');
              const authorBooks = await DatabaseOperations.getBooksByAuthor(authorName);
              console.table(authorBooks.map(book => ({
                Title: book.title,
                Period: book.period
              })));
            } else {
              // View periods for viewers
              const allPeriods = await DatabaseOperations.getAllPeriods();
              console.table(allPeriods.map(period => ({
                ID: period.id,
                Name: period.name,
                'Year Range': `${period.yearRange.start}-${period.yearRange.end}`,
                Description: period.description
              })));
            }
            break;
            
          case '5':
            if (isAdmin) {
              const newBook = {
                title: readlineSync.question('Book title: '),
                authors: readlineSync.question('Authors (comma-separated): ').split(',').map(a => a.trim()),
                isbn: readlineSync.question('ISBN: '),
                period: readlineSync.question('Period ID: '),
                category: readlineSync.question('Category: ')
              };
              await DatabaseOperations.insertBook(newBook);
            } else {
              await this.handleAuthMenu();
            }
            break;
            
          case '6':
            if (isAdmin) {
              const books = await DatabaseOperations.getAllBooks();
              console.table(books.map((book, index) => ({
                Index: index,
                Title: book.title,
                ID: book.id
              })));
              const bookIndex = parseInt(readlineSync.question('Enter book index to update: '));
              const bookToUpdate = books[bookIndex];
              
              const updates = {};
              const newTitle = readlineSync.question(`New title (current: ${bookToUpdate.title}): `);
              if (newTitle) updates.title = newTitle;
              
              if (Object.keys(updates).length > 0) {
                await DatabaseOperations.updateBook(bookToUpdate.id, updates);
              }
            } else {
              console.log('🎉 Goodbye!');
              process.exit(0);
            }
            break;
            
          case '7':
            if (isAdmin) {
              const allBooksForDelete = await DatabaseOperations.getAllBooks();
              console.table(allBooksForDelete.map((book, index) => ({
                Index: index,
                Title: book.title,
                ID: book.id
              })));
              const deleteIndex = parseInt(readlineSync.question('Enter book index to delete: '));
              const bookToDelete = allBooksForDelete[deleteIndex];
              await DatabaseOperations.deleteBook(bookToDelete.id);
            } else {
              console.log('❌ Invalid option');
            }
            break;
            
          case '8':
            if (isAdmin) {
              await this.handleAuthMenu();
            } else {
              console.log('❌ Invalid option');
            }
            break;
            
          case '9':
            if (isAdmin) {
              console.log('👋 Goodbye!');
              process.exit(0);
            } else {
              console.log('❌ Invalid option');
            }
            break;
            
          default:
            console.log('❌ Invalid option');
        }
      } catch (error) {
        if (error.message.includes('Access Denied')) {
          console.error('🚫 ' + error.message);
          console.log('💡 Please login as an admin to perform this operation');
        } else {
          console.error('❌ Error:', error.message);
        }
      }
      
      readlineSync.question('\nPress Enter to continue...');
    }
  }
}

// Run the application
MexicanHistoryBooksApp.run();
