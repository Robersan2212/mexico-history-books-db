import { auth, db } from './firebase-config.js';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export class AuthOperations {
  
  // Register user with role (default: viewer)
  static async registerUser(email, password, role = 'viewer') {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Store user role in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: email,
        role: role,
        createdAt: new Date()
      });
      
      console.log(`✅ User registered: ${userCredential.user.email} (Role: ${role})`);
      return userCredential.user;
    } catch (error) {
      console.error('❌ Registration error:', error.message);
      throw error;
    }
  }

  // Create admin user (special function)
  static async createAdminUser(email, password) {
    return await this.registerUser(email, password, 'admin');
  }

  static async loginUser(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(`✅ User logged in: ${userCredential.user.email}`);
      return userCredential.user;
    } catch (error) {
      console.error('❌ Login error:', error.message);
      throw error;
    }
  }

  static async logoutUser() {
    try {
      await signOut(auth);
      console.log('✅ User logged out');
    } catch (error) {
      console.error('❌ Logout error:', error.message);
      throw error;
    }
  }

  static getCurrentUser() {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();
        resolve(user);
      });
    });
  }

  // Get user role from Firestore
  static async getUserRole(userId) {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        return userDoc.data().role;
      }
      return 'viewer'; // Default role
    } catch (error) {
      console.error('❌ Error getting user role:', error);
      return 'viewer';
    }
  }

  // Check if current user is admin
  static async isCurrentUserAdmin() {
    const user = await this.getCurrentUser();
    if (!user) return false;
    
    const role = await this.getUserRole(user.uid);
    return role === 'admin';
  }
}
