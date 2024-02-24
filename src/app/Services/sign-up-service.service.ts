import { Injectable } from '@angular/core';
import { UserVO } from '../VO/UserVO';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignUpServiceService {

  constructor(private http: HttpClient) { }

  addUser(user: UserVO): Observable<any> {
    return this.http.post('http://localhost:9090/user/addUser', user);
  }
}
