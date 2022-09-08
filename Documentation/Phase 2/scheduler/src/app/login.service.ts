import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  url = 'http://ec2-3-93-50-104.compute-1.amazonaws.com/login.php'

  getEmails(email: string) {
    return this.http.get(this.url + '?access=' + email, { responseType: "json"});
  }

}


