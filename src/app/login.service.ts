import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { env } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isLogged = false;
  islogin = false;
  loggedUser = [];
  private isLogged$ = new BehaviorSubject<boolean>(this.isLogged);
  private loggedUser$ = new BehaviorSubject<any>(this.loggedUser);
  Logged = this.isLogged$.asObservable();
  LoggedUser = this.loggedUser$.asObservable();
  changeLogin(status: boolean) {
    if (status == true) {
      this.islogin = true;
    }
    this.isLogged$.next(status);
  }
  changeLoggedUser(user: any) {
    this.loggedUser$.next(user);
  }
  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post(env.API_URL + 'auth/login', credentials).pipe(
      tap({
        next: (value) => {
          console.log('Logged Successfully');
        },
        error: (error) => {
          retry(3);
        },
      })
    );
  }
}
