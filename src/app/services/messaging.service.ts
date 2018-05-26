import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

import {firebase} from '@firebase/app';
import '@firebase/messaging';
import { Observable, Subject } from 'rxjs';
import { map, filter, take } from 'rxjs/operators';

import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  private messaging = firebase.messaging();

  private messageSource = new Subject();
  currentMessage = this.messageSource.asObservable();

  constructor(private firestore: AngularFirestore, private Auth: AngularFireAuth, private authService: AuthService) {

  }


  // get permission to send messages
  getPermission() {
    this.messaging.requestPermission()
    .then(() => {
      console.log('Notification permission granted.');
      return this.messaging.getToken();
    })
    .then(token => {
      console.log(token);
      this.saveToken(token);
    })
    .catch((err) => {
      console.log('Unable to get permission to notify.', err);
    });
  }


  // Listen for token refresh
  monitorRefresh() {
    this.messaging.onTokenRefresh(() => {
      this.messaging.getToken()
      .then(refreshedToken => {
        // console.log('Token refreshed.');
        this.saveToken(refreshedToken);
      })
      .catch( err => console.log(err, 'Unable to retrieve new token') );
    });
  }



  // used to show message when app is open
  receiveMessages() {
    this.messaging.onMessage(payload => {
    //  console.log('Message received. ', payload);
     this.messageSource.next(payload);
   });

  }

  // save the permission token in firestore
  private saveToken(token): void {
    // this.Auth.authState.subscribe(user => {
      this.authService.user.pipe(
        filter(user => !!user), // filter null
        take(1) // take first real user
      ).subscribe(user => {
      // console.log(user);
      const currentTokens = user.fcmTokens || { };
      // console.log(currentTokens, token);

      // If token does not exist in firestore, update db
      if (!currentTokens[token]) {
        const userRef = this.firestore.collection('users').doc(user.uid);
        const tokens = { ...currentTokens, [token]: true };
        userRef.update({ fcmTokens: tokens });

      }

    });
  }

}
