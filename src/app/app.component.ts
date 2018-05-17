import { Component, OnInit } from '@angular/core';

// Service Worker
import { SwUpdate } from '@angular/service-worker';

// Angular Material
import { MatSnackBar } from '@angular/material/snack-bar';

// Services
import { AuthService } from './services/auth.service';
import { NotesService } from './services/notes.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { not } from '@angular/compiler/src/output/output_ast';

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

  constructor(
    private swUpdate: SwUpdate,
    private notesSevices: NotesService,
    public snackBar: MatSnackBar,
    public authService: AuthService,
  ) {

  }

  ngOnInit(): void {
    // Validate browser SW support and auto refresh of the app
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        window.location.reload();
      });
    }
    this.authenticated = this.authService.isLogged()
      .subscribe(user => this.authenticated = user);
    this.getNotes();

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
        this.notification('Welcome to PLatzi Notes PWA!!!');
        return this.authService.updateUserData(credential.user);
      })
      .catch(error => console.error(error));

  }

  logout() {
    this.authService.logout();
  }

}
