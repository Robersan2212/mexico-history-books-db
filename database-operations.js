import { db } from './firebase-config.js';
import { AuthOperations } from './auth-operations.js';
import { 
  collection, 
  addDoc, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc, 
  query, 
  where, 
  orderBy 
} from 'firebase/firestore';

const COLLECTIONS = {
  BOOKS: 'books',
  PERIODS: 'periods',
  AUTHORS: 'authors'
};

export class DatabaseOperations {
  
  // Authorization check helper
  static async requireAdminAccess() {
    const isAdmin = await AuthOperations.isCurrentUserAdmin();
    if (!isAdmin) {
      throw new Error('❌ Access Denied: Admin privileges required for this operation');
    }
  }

  // CREATE Operations (Admin Only)
  static async insertBook(bookData) {
    await this.requireAdminAccess();
    
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.BOOKS), {
        ...bookData,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log(`✅ Book inserted with ID: ${docRef.id}`);
      return docRef.id;
    } catch (error) {
      console.error('❌ Error inserting book:', error);
      throw error;
    }
  }

  static async insertPeriod(periodData) {
    await this.requireAdminAccess();
    
    try {
      await setDoc(doc(db, COLLECTIONS.PERIODS, periodData.id), {
        ...periodData,
        createdAt: new Date()
      });
      console.log(`✅ Period inserted: ${periodData.name}`);
    } catch (error) {
      console.error('❌ Error inserting period:', error);
      throw error;
    }
  }

  // READ Operations (Available to All Users)
  static async getAllBooks() {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTIONS.BOOKS));
      const books = [];
      querySnapshot.forEach((doc) => {
        books.push({ id: doc.id, ...doc.data() });
      });
      console.log(`📚 Retrieved ${books.length} books`);
      return books;
    } catch (error) {
      console.error('❌ Error retrieving books:', error);
      throw error;
    }
  }

  static async getBooksByPeriod(periodId) {
    try {
      const q = query(
        collection(db, COLLECTIONS.BOOKS),
        where('period', '==', periodId),
        orderBy('title')
      );
      const querySnapshot = await getDocs(q);
      const books = [];
      querySnapshot.forEach((doc) => {
        books.push({ id: doc.id, ...doc.data() });
      });
      console.log(`📖 Found ${books.length} books for period: ${periodId}`);
      return books;
    } catch (error) {
      console.error('❌ Error querying books by period:', error);
      throw error;
    }
  }

  static async getBooksByAuthor(authorName) {
    try {
      const q = query(
        collection(db, COLLECTIONS.BOOKS),
        where('authors', 'array-contains', authorName)
      );
      const querySnapshot = await getDocs(q);
      const books = [];
      querySnapshot.forEach((doc) => {
        books.push({ id: doc.id, ...doc.data() });
      });
      console.log(`👤 Found ${books.length} books by ${authorName}`);
      return books;
    } catch (error) {
      console.error('❌ Error searching books by author:', error);
      throw error;
    }
  }

  // UPDATE Operations (Admin Only)
  static async updateBook(bookId, updateData) {
    await this.requireAdminAccess();
    
    try {
      const bookRef = doc(db, COLLECTIONS.BOOKS, bookId);
      await updateDoc(bookRef, {
        ...updateData,
        updatedAt: new Date()
      });
      console.log(`✏️ Book updated: ${bookId}`);
    } catch (error) {
      console.error('❌ Error updating book:', error);
      throw error;
    }
  }

  // DELETE Operations (Admin Only)
  static async deleteBook(bookId) {
    await this.requireAdminAccess();
    
    try {
      await deleteDoc(doc(db, COLLECTIONS.BOOKS, bookId));
      console.log(`🗑️ Book deleted: ${bookId}`);
    } catch (error) {
      console.error('❌ Error deleting book:', error);
      throw error;
    }
  }

  static async getAllPeriods() {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTIONS.PERIODS));
      const periods = [];
      querySnapshot.forEach((doc) => {
        periods.push({ id: doc.id, ...doc.data() });
      });
      return periods;
    } catch (error) {
      console.error('❌ Error retrieving periods:', error);
      throw error;
    }
  }
}
