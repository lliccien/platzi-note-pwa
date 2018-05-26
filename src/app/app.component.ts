import { Component, OnInit } from '@angular/core';

// Service Worker
import { SwUpdate } from '@angular/service-worker';

// Angular Material
import { MatSnackBar } from '@angular/material/snack-bar';

// Services
import { AuthService } from './services/auth.service';
import { NotesService } from './services/notes.service';

import { Observable } from 'rxjs';
import { map, filter, take } from 'rxjs/operators';

import { MessagingService } from './services/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Platzi Note PWA';
  panelOpenState: boolean;
  categories: any = ['Trabajo', 'Personal'];
  authenticated: any;
  notes: Observable<any[]>;
  note: any = {};
  message: any;

  constructor(
    private swUpdate: SwUpdate,
    private notesSevices: NotesService,
    public snackBar: MatSnackBar,
    public authService: AuthService,
    public messagingService: MessagingService
  ) {}

  ngOnInit(): void {
    // Validate browser SW support and auto refresh of the app
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        window.location.reload();
      });
    }
    this.authenticated = this.authService.isLogged()
      .subscribe(user => this.authenticated = user);

    this.messagingService.getPermission();
    this.messagingService.monitorRefresh();
    this.messagingService.receiveMessages();
    this.messagingService.currentMessage.subscribe(notification => {
      this.message = notification;
        if (this.message) {
          setTimeout(() => {
            this.message = undefined;
          }, 3000);
        }
    });

    this.getNotes();

    this.authService.Auth.auth.getRedirectResult().then(result => {
      if (result.user !== null) {
        this.authService.updateUserData(result.user);
        this.notification('Welcome to PLatzi Notes PWA!!!');
      }
    });
  }

  notification(message, duration = 3000 ) {
    this.snackBar.open(message, 'X', { duration });
  }

  getNotes() {
    this.notes = this.notesSevices.getNotes();
  }

  saveNote() {
    if (!this.note.id) {
      this.note.time = new Date().getTime();
      this.notesSevices.createNote(this.note);
      this.note = {};
      this.panelOpenState = false;
      this.notification('Note Create');
    } else {
      this.note.time = new Date().getTime();
      this.notesSevices.editNote(this.note.id, this.note)
        .then(note => {
          this.note = {};
          this.panelOpenState = false;
          this.notification('Note Update');
        })
        .catch(error => console.error(error) );
    }

  }

  selectNote(id) {
    return this.notesSevices.getNote(id).snapshotChanges()
      .subscribe(note => {
        const data = note.payload.data();
        data.id = note.payload.id;
        this.note = data;
        this.panelOpenState = true;
      });
  }


  deleteNote(id) {
    this.notesSevices.deleteNote(id);
    this.notification('Note delete');
  }

  login() {
    this.authService.loginGoogle()
      .then(credential => {
        console.log(credential);
        // return this.authService.updateUserData(credential.user);
      })
      .catch(error => console.error(error));
  }

  logout() {
    this.authService.logout();
  }

}
