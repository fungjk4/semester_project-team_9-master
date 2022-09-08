import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudySessionService {

  constructor(private http: HttpClient) { }

  professorUrl = 'http://ec2-3-93-50-104.compute-1.amazonaws.com/professor_view.php'
  studentUrl = 'http://ec2-3-93-50-104.compute-1.amazonaws.com/student_view.php'
  taUrl = 'http://ec2-3-93-50-104.compute-1.amazonaws.com/ta_view.php'
  studySession = "http://ec2-3-93-50-104.compute-1.amazonaws.com/updateStudySession.php";



  getProfessorStudySessions(email: string) {
    return this.http.get(this.professorUrl + '?access=' + email + "&page_request=study", { responseType: "json"});
  }

  getStudentStudySessions(email: string) {
    return this.http.get(this.studentUrl + '?access=' + email + "&page_request=study", { responseType: "json"});
  }

  getTAStudySessions(email: string) {
    return this.http.get(this.taUrl + '?access=' + email + "&page_request=study", { responseType: "json"});
  }

  insertStudySession(course: string, ta_email: string, date: string, times: string, location: string) {
    console.log("ss");
    return this.http.get(this.studySession + '?page_request=insert&course_id=' + course + "&ta_email=" + ta_email + "&date=" + date +"&times=" + times + "&location_mode=" + location);
  }

  updateStudySession(course: string, ta_email: string, date: string, times: string, location: string) {
    console.log("up");
    return this.http.get(this.studySession + '?page_request=update&course_id=' + course + "&ta_email=" + ta_email + "&date=" + date +"&times=" + times + "&location_mode=" + location);
  }

  deleteStudySession(course: string, ta_email: string, date: string, times: string, location: string) {
    console.log("sus");
    return this.http.get(this.studySession + '?page_request=delete&course_id=' + course + "&ta_email=" + ta_email + "&date=" + date +"&times=" + times + "&location_mode=" + location);
  }
}
