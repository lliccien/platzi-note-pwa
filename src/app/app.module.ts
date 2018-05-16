import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Service Worker
import { ServiceWorkerModule } from '@angular/service-worker';

// Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material.module';

// AngularFirebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FirebaseOptionsToken, FirebaseAppNameToken, FirebaseAppConfigToken } from 'angularfire2';

import { environment } from '../environments/environment';

// Components
import { AppComponent } from './app.component';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    AngularFireModule, // .initializeApp(firebasePlaceholderConfig, { }),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AppMaterialModule,
    FormsModule
  ],
  providers: [
    { provide: FirebaseOptionsToken, useValue: environment.firebaseConfig },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
