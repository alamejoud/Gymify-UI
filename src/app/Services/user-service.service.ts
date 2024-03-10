import { Injectable } from '@angular/core';
import { UserVO } from '../VO/UserVO';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  profileDialogVisible: boolean = false;
  isEditingProfile: boolean = false;

  displayedUser: UserVO = new UserVO();
  editedUser: UserVO = new UserVO();

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

    return user;
  }

  getUser(username: String): Observable<any> {
    return this.http.get('http://localhost:9090/user/getUser?token=' + sessionStorage.getItem('token'));
  }

  updateUser(user: UserVO): Observable<any> {
    return this.http.put('http://localhost:9090/user/updateUser', user);
  }
}
