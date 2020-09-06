import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {TODO} from './model/todo'
import { Observable } from 'rxjs';


const URL = 'https://us-central1-tood-list-angular.cloudfunctions.net/app'

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http : HttpClient) {   }

  getTasks(query:any):Observable<TODO[]>{
    let params = new HttpParams();
    if (query.isComplete){
      params = params.append("isComplete",query.isComplete)
    }
    const url = `${URL}/task`
    return this.http.get<TODO[]>(url, { params })
  }

  addTask(todo:any):Observable<any>{
     const url =  `${URL}/task`;
     return this.http.post(url, {document : todo})
      
  }

  deleteTask(_id):Observable<any>{
    const url =  `${URL}/task/${_id}`;
    return this.http.delete(url)
  }

  updateTask(todo:any):Observable<any>{
    const url =  `${URL}/task/${todo.id}`;
    return this.http.put(url, {todo})
  }

}
