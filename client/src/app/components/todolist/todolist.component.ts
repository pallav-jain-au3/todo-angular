import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../sevices/firebase.service'
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar'
import {TodoService} from '../../sevices/todo.service'



@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  newTodo :string = '';
   showCompleted : boolean = false;
   query :any = {}
 todoList:any[] = [ ]
  constructor(public firbaseAuth : FirebaseService,
    private router : Router,
    public _snackBar : MatSnackBar,
    private todoServie : TodoService
    ) { }

  ngOnInit(): void {
    this.getTodos()
  }

  getTodos(){
    this.todoServie.getTasks(this.query).subscribe(
      todos=>{
       this.todoList = todos
      },
      error => {
        this.openSnackBar('Something went wrong','')
      }
    )
  }

  onAddTodo(){
    if (!this.newTodo.length){
      return
    }
  this.addTodo()
    
  }
  addTodo(){
    let todo = {
      title : this.newTodo,
      description : '',
    }
    this.todoServie.addTask(todo).subscribe(
      res =>{
        this.getTodos()
        this.newTodo = ''
      },
      error => {
        console.log(error)
        this.openSnackBar("Something went wrong", '')
      }
    )
  }
  toggleShowCompleted(){
    this.showCompleted = !this.showCompleted
    this.query.isComplete = this.showCompleted
    this.getTodos()
  }
  logout(){
     this.firbaseAuth.logout()
     .then(() => {
       this.openSnackBar('Logged out', '')
       this.router.navigateByUrl('/login')
     })
     .catch(err=> {
       console.log(err)
       this.openSnackBar('Something went wrong', '')
     })
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top', // 'top' | 'bottom'
      horizontalPosition: 'center',
    });
  }

  onDelete(id){
    
    this.todoServie.deleteTask(id).subscribe(
      res => {
        console.log("res",res)
         this.getTodos()
      },
      error => {
        console.log(error);
        this.openSnackBar("Something Went wrong", '')
      }
        )
    
  }

  updateTodo(todo){
    this.todoServie.updateTask(todo).subscribe(
      res => {
        this.getTodos()
      },
      err => {
         console.log(err)
         this.openSnackBar('Something went wrong', '')
      }
    )
  }
}
