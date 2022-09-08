import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient) { }

  url = "http://ec2-3-93-50-104.compute-1.amazonaws.com/calendar_view.php"

  getEvents(email: string) {
    return this.http.get(this.url + '?access=' + email, { responseType: "json"});
  }

}
