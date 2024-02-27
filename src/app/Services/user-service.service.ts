import { Injectable } from '@angular/core';
import { UserVO } from '../VO/UserVO';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }

  addUser(user: UserVO): Observable<any> {
    return this.http.post('http://localhost:9090/user/addUser', user);
  }

  loginUser(user: UserVO): Observable<any> {
    return this.http.post('http://localhost:9090/user/login', user);
  }

  mapUser(loginForm: any): UserVO {
    let user: UserVO = new UserVO();
    user.username = loginForm.username;
    user.password = loginForm.password;
    user.confirmPassword = loginForm.confirmPassword;
    user.role = loginForm.role;
    console.log(user);

    return user;
  }
}
