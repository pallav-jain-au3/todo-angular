import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {FirebaseService} from '../../sevices/firebase.service'
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router} from '@angular/router'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup
  constructor(
    public firebase : FirebaseService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })

  }

  getEmailError(){
    if (this.registerForm.get('email')){

    }
  }
  onRegister(){
    if (this.registerForm.invalid){
            return
    }
    
    const email = this.registerForm.get('email').value
    const password = this.registerForm.get('password').value
    this.firebase.signUp(email, password).then(user => {
      console.log(user)
      this.openSnackBar("Successfully Signup in", '')
      this.router.navigateByUrl('/')
    })
    .catch(err => {
       if (err.code === 'auth/email-already-in-use'){
         this.openSnackBar('Email already exists','')
       }
       if(err.code === 'auth/weak-password'){
         this.openSnackBar('Password should be at least 6 characters','')
       }
       console.log(err)
    })
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
