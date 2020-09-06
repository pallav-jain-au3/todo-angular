import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
user;
isLoggedin = false;
  constructor(public firebaseAuth : AngularFireAuth ) { }

  async signIn(email : string, password:string){
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
    .then(res =>  {
      this.user = res.user
      return res.user.getIdToken()
    })
    .then(token => {
      this.isLoggedin = true;
      this.addUserInLocalStorage(token)
      this.user
    })
    .catch(err => {
            throw err
    })
  }

  async signUp(email : string, password:string){
    
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
    .then(res =>  {
      this.user = res.user
      return res.user.getIdToken()
    })
    .then(token => {
      this.isLoggedin = true;
      this.addUserInLocalStorage(token)
      return this.user
    })
    .catch(err => {
            throw err
    })
  
  }

  async logout(){
    this.firebaseAuth.signOut()
    this.user = null;
    localStorage.removeItem('token')
  }

  addUserInLocalStorage(token: any){

   localStorage.setItem('token',token)
   return
  }

  getIdToken(){
      return localStorage.getItem('token')
  }


}
