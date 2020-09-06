import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ViewEditTodoComponent } from './view-edit-todo/view-edit-todo.component';
import {TodoService} from '../../../sevices/todo.service';


@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.css']
})
export class TodoListItemComponent implements OnInit {
  
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @Output() update: EventEmitter<any> = new EventEmitter();

  @Input() todo ;
  constructor(public dialog: MatDialog,
    private todoService : TodoService) { }

  ngOnInit(): void {
  }

  openTodo(){
      const dialogRef = this.dialog.open(ViewEditTodoComponent,
        {
          width : '50%',
          data :{todo :this.todo}
        })
        dialogRef.afterClosed().subscribe(
          todo => {
            if (todo){
              todo = JSON.parse(todo)
              todo.id = this.todo.id
              this.update.emit(todo)
            }
          }
        )
  }

  onDelete(){
  this.delete.emit(this.todo.id)
  }

  onDone(action){
    const todo = {
      id : this.todo.id,
      isComplete : action,
      completedDate : action ? new Date() : null
    }
   this.update.emit(todo)
  }
}
