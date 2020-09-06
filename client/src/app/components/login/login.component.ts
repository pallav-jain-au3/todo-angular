import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import {FirebaseService} from '../../sevices/firebase.service'
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router} from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  constructor(public firebase : FirebaseService,
    private _snackBar: MatSnackBar,
    private router: Router
     ) { }
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })

  }

  onLogin(){
    if (this.loginForm.invalid){
            return
    }
    
    const email = this.loginForm.get('email').value
    const password = this.loginForm.get('password').value
    this.firebase.signIn(email, password).then(user => {
      console.log(user)
      this.openSnackBar("Successfully Logged in", '')
      this.router.navigateByUrl('/')
    })
    .catch(err => {
       if (err.code === 'auth/user-not-found'){
         this.openSnackBar('Invalid user or passwprd','')
       }
    })
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top', // 'top' | 'bottom'
      horizontalPosition: 'center',
    });
  }

}
