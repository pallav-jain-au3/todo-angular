import { Component,OnInit } from '@angular/core';
import { FirebaseService } from './sevices/firebase.service';
import { Router} from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public firebase :FirebaseService,
    private  router : Router){}
  title = 'TodoApp';
  ngOnInit(): void {
   if (!this.firebase.getIdToken()){
       this.router.navigateByUrl('/login')
   }
   else{
     this.router.navigateByUrl('/')
   }
  }
}

