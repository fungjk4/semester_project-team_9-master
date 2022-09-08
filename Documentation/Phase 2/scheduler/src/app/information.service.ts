import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { queryTest } from './information/information.component';

@Injectable({
  providedIn: 'root'
})
export class InformationService {

  constructor(private http: HttpClient) { }

  url = 'http://ec2-3-93-50-104.compute-1.amazonaws.com/student.php'
  viewUrl = 'http://ec2-3-93-50-104.compute-1.amazonaws.com/student_view.php'

  getQueryTwo(course: string) {
    return this.http.get(this.url + '?function=2&course_id=' + course, { responseType: "json"});
  }

  getQueryThree(course: string, section: string, semester: string, year: string, email: string) {
    return this.http.get(this.url + '?function=3&course_id=' + course + '&section_id=' + section + '&semester=' + semester + '&year=' + year + '&email=' + email,
                        { responseType: "json"});
  }

  getQueryFive(course: string) {
    return this.http.get(this.url + '?function=5&course_id=' + course, { responseType: "json"});
  }

  getQuerySix(course_name: string, mode: string) {
    return this.http.get(this.url + '?function=6&mode=' + mode + '&course_name=' + course_name, { responseType: "json"});
  }

  getQueryTen(emailOne: string, emailTwo: string, emailThree: string) {
    return this.http.get(this.url + '?function=10&emailOne=' + emailOne + '&emailTwo=' + emailTwo + '&emailThree=' + emailThree, { responseType: "json"});
  }

  getQueryTwelve(course: string, email: string, section: string, semester: string, year: string) {
    return this.http.get(this.url + '?function=12&course_id=' + course + '&email=' + email + '&section_id=' + section + '&semester=' + semester + '&year=' + year, { responseType: "json"});
  }

  getQueryThirteen(course: string, section: string, semester: string, year: string) {
    return this.http.get(this.url + '?function=13&course_id=' + course + '&section_id=' + section + '&semester=' + semester + '&year=' + year, { responseType: "json"});
  }

  getQueryNineteen(email: string) {
    return this.http.get(this.url + '?function=19&email=' + email, { responseType: "json"});
  }

  getQueryTwenty() {
    return this.http.get(this.url + '?function=20', { responseType: "json"});
  }

  getMyCourses(email: string) {
    return this.http.get(this.viewUrl + "?access=" + email + '&page_request=course_overview', { responseType: "json" });
  }

  getMyAssignments(email: string) {
    return this.http.get(this.viewUrl + "?access=" + email + '&page_request=assignment', { responseType: "json" });
  }

  getMyGrades(email: string) {
    return this.http.get(this.viewUrl + "?access=" + email + '&page_request=grades', { responseType: "json" });
  }
}
