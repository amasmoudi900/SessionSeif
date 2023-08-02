import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userURL: string = "http://localhost:3000/users";
  constructor(private httpClient: HttpClient) { }

  // obj = {firstName: ...., lastName: ..., email: .... , pwd: .....}
  signup(obj, img: File) {
    let fData = new FormData();
    fData.append("img", img);
    fData.append("firstName", obj.firstName);
    fData.append("lastName", obj.lastName);
    fData.append("email", obj.email);
    fData.append("password", obj.password);
    fData.append("role", obj.role);
    if (obj.tel) {
      fData.append("tel", obj.tel);
    }
    return this.httpClient.post<{ msg: boolean }>
    (this.userURL + "/signup", fData);
  }

  // obj = {email: .... , pwd: .....}
  login(obj) {
    return this.httpClient.post<{ msg: string, connectedUser: any }>(this.userURL + "/login", obj);
  }
}
