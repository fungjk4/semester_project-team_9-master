import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeacherInformationService {

  constructor(private http: HttpClient) { }

  url = 'http://ec2-3-93-50-104.compute-1.amazonaws.com/employee.php';
  viewUrl = 'http://ec2-3-93-50-104.compute-1.amazonaws.com/professor_view.php';
  taUrl = 'http://ec2-3-93-50-104.compute-1.amazonaws.com/ta_view.php';
  assignments = 'http://ec2-3-93-50-104.compute-1.amazonaws.com/updateAssignments.php';
  grade = "http://ec2-3-93-50-104.compute-1.amazonaws.com/updateGrades.php";
  officeHours = "http://ec2-3-93-50-104.compute-1.amazonaws.com/updateOfficeHours.php";

  getQueryOne(courseId: string, email: string) {
    return this.http.get(this.url + '?function=1&course_id=' + courseId  + '&email=' + email, {responseType: "json"});
  }

  getQueryTwo(course: string) {
    return this.http.get(this.url + '?function=2&course_id=' + course, { responseType: "json"});
  }

  getQueryFour(email: string) {
    return this.http.get(this.url + '?function=4&email=' + email, { responseType: "json"});
  }

  getQueryFive(course: string) {
    return this.http.get(this.url + '?function=5&course_id=' + course, { responseType: "json"});
  }

  getQuerySix(course_name: string, mode: string) {
    return this.http.get(this.url + '?function=6&mode=' + mode + '&course_name=' + course_name, { responseType: "json"});
  }

  getQuerySeven(email: string) {
    return this.http.get(this.url + '?function=7&email=' + email, { responseType: "json"});
  }

  getQueryEight(course: string) {
    return this.http.get(this.url + '?function=8&course_id=' + course, {responseType: "json"});
  }

  getQueryNine() {
    return this.http.get(this.url + '?function=9', { responseType: "json"});
  }

  getQueryTen(emailOne: string, emailTwo: string, emailThree: string) {
    return this.http.get(this.url + '?function=10&emailOne=' + emailOne + '&emailTwo=' + emailTwo + '&emailThree=' + emailThree, { responseType: "json"});
  }

  getQueryEleven(course: string, section: string, semester: string, year: string) {
    return this.http.get(this.url + '?function=11&course_id=' + course + '&section_id=' + section + '&semester=' + semester + '&year=' + year, { responseType: "json"});
  }

  getQueryTwelve(course: string, email: string, section: string, semester: string, year: string) {
    return this.http.get(this.url + '?function=12&course_id=' + course + '&email=' + email + '&section_id=' + section + '&semester=' + semester + '&year=' + year, { responseType: "json"});
  }

  getQueryThirteen(course: string, section: string, semester: string, year: string) {
    return this.http.get(this.url + '?function=13&course_id=' + course + '&section_id=' + section + '&semester=' + semester + '&year=' + year, { responseType: "json"});
  }

  getQueryFourteen(email: string) {
    return this.http.get(this.url + '?function=14&email=' + email, { responseType: "json" });
  }

  getQueryFifteen(course: string, section: string, semester: string, year: string, date: string, start_time: string, end_time: string) {
    return this.http.get(this.url + '?function=15&course_id=' + course + '&section_id=' + section + '&semester=' + semester +
                          '&year=' + year + '&date=' + date + '&start_time=' + start_time + '&end_time=' + end_time, { responseType: "json" });
  }

  getQuerySixteen() {
    return this.http.get(this.url + '?function=16', { responseType: "json" });
  }

  getQuerySeventeen(firstname: string, lastname: string, assignment: string) {
    return this.http.get(this.url + '?function=17&first_name=' + firstname + '&last_name=' + lastname + '&assignment=' + assignment, { responseType: "json" });
  }

  getQueryEighteen() {
    return this.http.get(this.url + '?function=18', { responseType: "json" });
  }

  getQueryTwenty() {
    return this.http.get(this.url + '?function=20', { responseType: "json"});
  }

  getProfessorCourses(email: string) {
    return this.http.get(this.viewUrl + "?access=" + email + '&page_request=course_overview', { responseType: "json" });
  }

  getProfessorAssignments(email: string) {
    return this.http.get(this.viewUrl + "?access=" + email + '&page_request=assignments', { responseType: "json" });
  }

  getProfessorGrades(email: string) {
    return this.http.get(this.viewUrl + "?access=" + email + '&page_request=grades', { responseType: "json" });
  }

  getTACourses(email: string) {
    return this.http.get(this.taUrl + "?access=" + email + '&page_request=course_overview', { responseType: "json" });
  }

  getTAAssignments(email: string) {
    return this.http.get(this.taUrl + "?access=" + email + '&page_request=assignments', { responseType: "json" });
  }

  getTAGrades(email: string) {
    return this.http.get(this.taUrl + "?access=" + email + '&page_request=grades', { responseType: "json" });
  }

  postAssignment(course: string, assignment: string, dueDate:string) {
    return this.http.get(this.assignments + '?page_request=insert&course=' + course + '&assignment=' + assignment + '&dueDate=' + dueDate);
  }

  updateAssignment(course: string, assignment: string, dueDate:string) {
    console.log("help");
    return this.http.get(this.assignments + '?page_request=update&course=' + course + '&assignment=' + assignment + '&dueDate=' + dueDate);
  }

  updateGrade(course: string, email: string, grade: string) {
    console.log("yessir");
    return this.http.get(this.grade + '?page_request=update&course=' + course + '&email=' + email + '&grade=' + grade);
  }

  deleteAssignment(course: string, assignment: string, dueDate:string) {
    console.log("...");
    return this.http.get(this.assignments + '?page_request=delete&course=' + course + '&assignment=' + assignment + '&dueDate=' + dueDate);
  }

  updateOfficeHours(course: string, info: string) {
    console.log("epic");
    return this.http.get(this.officeHours + "?page_request=update&course=" + course + "&info=" + info);
  }

}
