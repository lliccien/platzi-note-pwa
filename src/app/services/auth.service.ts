import { Injectable } from '@angular/core';

// Angularfire
import { firebase } from '@firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from 'angularfire2/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';


interface User {
  uid: string;
  email?: string | null;
  photoURL?: string;
  displayName?: string;
  fcmTokens?: { [token: string]: true };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<User | null>;

  constructor(public Auth: AngularFireAuth, private firestore: AngularFirestore) {
    this.user = this.Auth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  loginGoogle() {
    return this.Auth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    return this.Auth.auth.signOut();
  }

    // Sets user data to firestore after succesful login
    updateUserData(user: User) {
      const userRef: AngularFirestoreDocument<User> = this.firestore.doc(
        `users/${user.uid}`
      );

      const data: User = {
        uid: user.uid,
        email: user.email || null,
        displayName: user.displayName || 'John Doe',
        photoURL: user.photoURL || 'https://goo.gl/Gey7NW'
      };
      return userRef.set(data);
    }

  public isLogged() {
    return this.Auth.authState;
  }
}
