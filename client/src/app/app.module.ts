import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodolistComponent } from './components/todolist/todolist.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {TodoListItemComponent} from './components/todolist/todo-list-item/todo-list-item.component';
import {AngularFireModule} from'@angular/fire'
import { FirebaseService } from './sevices/firebase.service';
import {ViewEditTodoComponent} from './components/todolist/todo-list-item/view-edit-todo/view-edit-todo.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {HttpClientModule} from '@angular/common/http';
import {TodoService} from './sevices/todo.service'
 import {httpInterceptorProvider} from './interceptor/index';
 import {MatTooltipModule} from '@angular/material/tooltip';
 import {config} from './firebaseConfig'
@NgModule({
  declarations: [
    AppComponent,
    TodolistComponent,
    LoginComponent,
    SignupComponent,
    TodoListItemComponent,
    ViewEditTodoComponent,
  ],
  entryComponents: [ViewEditTodoComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatListModule,
    MatDialogModule,
    FormsModule,
    AngularFireModule.initializeApp(config),
    MatSnackBarModule,
    HttpClientModule,
    MatTooltipModule
  ],
  providers: [FirebaseService, TodoService, httpInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
