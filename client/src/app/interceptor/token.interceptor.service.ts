import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {FirebaseService} from '../sevices/firebase.service'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public userService: FirebaseService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Auth intercep")
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.userService.getIdToken()}`
      }
      
    });
    return next.handle(request);
  }
}
