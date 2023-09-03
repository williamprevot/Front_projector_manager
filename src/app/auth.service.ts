import { Injectable, NgZone } from '@angular/core';
import { User } from './user';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; // Save logged in user data
  private API_URL = 'http://localhost:3000/api/users';
  private apiKey = environment.apiKey;
  private _isLoggedIn: boolean | null = null;
  constructor(
    private http: HttpClient,
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    private toastr: ToastrService,
    public ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user && this.isValidUserData(user)) {
        // this.userData = user;
        // localStorage.setItem('user', JSON.stringify(this.userData));
        this.initializeUserDataFromMongo(user.uid);
      } else {
        localStorage.setItem('user', 'null');
      }
    });
  }
  private initializeUserDataFromMongo(uid: string): void {
    this.GetUserDataFromMongoDB(uid).then(userProfile => {
      console.log("MongoDB User Profile:", userProfile);
      if (userProfile) {
        localStorage.setItem('user', JSON.stringify(userProfile));
      }
    }).catch(error => {
      console.error("Error fetching user data from MongoDB:", error);
    });
  }
  private isValidUserData(data: any): boolean {
    // Check if data exists
    if (!data) return false;

    // Check if UID exists and is a string
    if (!data.uid || typeof data.uid !== 'string') return false;

    // Check if email exists and matches email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!data.email || !emailRegex.test(data.email)) return false;

    // If all checks pass, data is valid
    return true;
  }


  handleError(error: any) {
    const message = error.message || 'Une erreur est survenue!';
    this.toastr.error(message);
    console.error('Error:', error);  // pour le débogage
  }

  async register(email: string, password: string, organisation: string, role: string): Promise<any> {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      const uid = result.user?.uid;

      if (!uid) throw new Error("User UID not found.");
      const mongoDBUserData = {
        uid: uid,
        email: email,
        organisation: organisation,
        role: role
      };
      const response = await this.SetUserDataToMongoDB(mongoDBUserData);

      if (response) {
        this.toastr.success('Utilisateur enregistré avec succès!');
      } else {
        this.toastr.error('Erreur lors de l’enregistrement du nouvel utilisateur dans MongoDB.');
      }

      return result.user || null;
    }
    catch (error) {
      this.handleError(error);
      console.error('Error during registration:', error);
      throw error;
    }
  }

  async login(email: string, password: string): Promise<any> {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      const uid = result.user?.uid;

      if (!uid) throw new Error("User UID not found.");

      // Récupération des données utilisateur de MongoDB
       const userProfile = await this.GetUserDataFromMongoDB(uid);
       console.log("MongoDB User Profile:", userProfile);
      // // Fusionner les données d'authentification Firebase avec userProfile
      // const completeUserData = { ...result.user, ...userProfile };
      // console.log("Complete User Profile:", completeUserData);
      // Stockez completeUserData dans localStorage
       localStorage.setItem('user', JSON.stringify(userProfile));
  
      this.ngZone.run(() => {
        this.router.navigate(['profil']);
      });

      return userProfile;

    } catch (error) {
      this.handleError(error);
      console.error('Error during login:', error);
      throw error;
    }
  }

  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        this.handleError(error);
      });
  }

  async getCurrentUserId(): Promise<string | null> {
    const user = await this.afAuth.currentUser;
    if (user) {
      return user.uid;
    }
    return null;
  }

  // // pour init auth guard
  get isLoggedIn(): boolean {
    if (this._isLoggedIn !== null) {
      return this._isLoggedIn;
    }
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null ? true : false;
  }

  set isLoggedIn(value: boolean) {
    this._isLoggedIn = value;
  }
  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      this.router.navigate(['profil']);
    });
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['profil']);
        });
      })
      .catch((error) => {
        this.handleError(error);
      });
  }

  async getToken(): Promise<string> {
    const user = await this.afAuth.currentUser;
    return user?.getIdToken() || '';
  }

  async SetUserDataToMongoDB(user: any) {
    try {
      const token = await this.getToken()
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'X-API-Key': this.apiKey,
        // 'Authorization': `Bearer ${token}`
      });
      const response = await this.http.post(this.API_URL, user, { headers }).toPromise();
      return response;
    } catch (error) {
      console.error("Error saving user to MongoDB:", error);
      throw error;
    }
  }

  async GetUserDataFromMongoDB(uid: string) {
    try {
      const token = await this.getToken()
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'X-API-Key': this.apiKey,
        // 'Authorization': `Bearer ${token}`
      });
      const userProfile = await this.http.get(`${this.API_URL}/${uid}`, { headers }).toPromise();
      return userProfile;
    } catch (error) {
      console.error("Error fetching user from MongoDB:", error);
      throw error;
    }
  }

  async updateUserData(uid: string, updatedData: any) {
    try {
      // Mettre à jour les données dans Firebase
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
      userRef.set(updatedData, { merge: true });

      // Mettre à jour les données dans MongoDB
      await this.updateUserInMongoDB(uid, updatedData);

      return true;
    } catch (error) {
      console.error("Error updating user data:", error);
      throw error;
    }
  }

  async updateUserInMongoDB(uid: string, updatedData: any) {
    try {
      const token = await this.getToken();
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'X-API-Key': this.apiKey,
      });
      const response = await this.http.put(`${this.API_URL}/${uid}`, updatedData, { headers }).toPromise();
      return response;
    } catch (error) {
      console.error("Error updating user in MongoDB:", error);
      throw error;
    }
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.ngZone.run(() => {
        this.router.navigate(['index/signIn']);
      });
    });
  }
}
