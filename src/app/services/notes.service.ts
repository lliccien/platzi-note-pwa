import { Injectable } from '@angular/core';

// AngularFirestore
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class NotesService {

  notesCollection: AngularFirestoreCollection<any>;
  noteDocument:   AngularFirestoreDocument<any>;

  constructor(public firestore: AngularFirestore) {
    this.notesCollection = this.firestore.collection('notes', (ref) => ref.orderBy('time', 'desc'));
   }

  getNotes() {
    return this.notesCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }

  getNote(id: string) {
    return this.firestore.doc<any>(`notes/${id}`);
  }

  createNote(note: Object) {
    return this.notesCollection.add(note);
  }

  editNote(id: string, note: object) {
    return this.getNote(id).update(note);
  }

  deleteNote(id: string) {
    return this.getNote(id).delete();
  }
}
