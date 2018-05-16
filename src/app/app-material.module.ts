import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatListModule,
  MatSnackBarModule,
  MatGridListModule,
  MatIconModule,
} from '@angular/material';

const modules = [
  MatToolbarModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatListModule,
  MatSnackBarModule,
  MatGridListModule,
  MatIconModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class AppMaterialModule { }
