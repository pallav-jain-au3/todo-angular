import { Component, OnInit , Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import {TodoService} from '../../../../sevices/todo.service'

@Component({
  selector: 'app-view-edit-todo',
  templateUrl: './view-edit-todo.component.html',
  styleUrls: ['./view-edit-todo.component.css']
})
export class ViewEditTodoComponent implements OnInit {
todoForm:FormGroup
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private dialogRef: MatDialogRef<ViewEditTodoComponent>,
  private todoService : TodoService
  ) {
    
   }
    editTitle = true;
    editDescription = true;
  ngOnInit(): void {
    const {title, description} = this.data.todo
    this.todoForm = new FormGroup({
      title: new FormControl(title, [Validators.required]),
      description: new FormControl(description)
    })
  }
  makeEditable(tag){
    if(tag === 'title'){
    this.editTitle = false
     
    }
    else if (tag == 'description'){
      this.editDescription = false
    }
  }


  save(){
   const todo = {
     title : this.todoForm.controls['title'].value,
     description :this.todoForm.controls['description'].value,
   }
   this.dialogRef.close(JSON.stringify(todo))

  }
  close(){
  this.dialogRef.close()
  }


}
