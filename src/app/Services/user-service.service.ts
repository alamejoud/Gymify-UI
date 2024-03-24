import { Injectable } from '@angular/core';
import { UserVO } from '../VO/UserVO';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  imageUrl: any = '../../assets/images/Default-Profile-Picture.png';
  profileDialogVisible: boolean = false;
  isEditingProfile: boolean = false;

  displayedUser: UserVO = new UserVO();
  editedUser: UserVO = new UserVO();

  constructor(private http: HttpClient) { }

  addUser(user: UserVO): Observable<any> {
    user.status = 'active';
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

  getLoggedInUser(): Observable<any> {
    return this.http.get('http://localhost:9090/user/getLoggedInUser?token=' + localStorage?.getItem('token'));
  }

  updateUser(user: UserVO): Observable<any> {
    return this.http.put('http://localhost:9090/user/updateUser', user);
  }

  getLoggedInProfilePicture(): Observable<any> {
    return this.http.get<Blob>('http://localhost:9090/user/getLoggedInProfilePicture?token=' + localStorage?.getItem('token'));
  }

  generateToken(): Observable<any> {
    return this.http.post('http://localhost:9090/user/generateToken', this.displayedUser);
  }

}
