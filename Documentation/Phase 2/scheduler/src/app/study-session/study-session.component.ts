import { LoginComponent } from './../login/login.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { FormControl, Validators } from '@angular/forms';
import { StudySessionService } from '../study-session.service';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-study-session',
  templateUrl: './study-session.component.html',
  styleUrls: ['./study-session.component.css'],
  animations: [
    trigger('detailExpand', [
    state('collapsed', style({height: '0px', minHeight: '0'})),
    state('expanded', style({height: '*'})),
    transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class StudySessionComponent implements OnInit {

  teacher: boolean = LoginComponent.isTeacher
  ta: boolean = LoginComponent.isTa;
  student: boolean = LoginComponent.isStudent;
  theUserEmail: string = "";
  professorSSResults: any;
  studentSSResults: any;
  TASSResults: any;
  @ViewChild(MatTable) table: MatTable<any> | undefined;
  @ViewChild('student') studenttable: MatTable<any> | undefined;

  constructor(private ssService: StudySessionService) { }

  ngOnInit(): void {
    console.log(this.teacher);
    if(SS_DATA.length > 0) {
      SS_DATA.splice(0, SS_DATA.length);
    }
    this.table?.renderRows();
    if(STUDENT_DATA.length > 0) {
      STUDENT_DATA.splice(0, STUDENT_DATA.length);
    }
    this.studenttable?.renderRows();
    // console.log(SS_DATA);
    this.teacher = LoginComponent.isTeacher;
    this.ta = LoginComponent.isTa;
    this.theUserEmail = LoginComponent.userEmail;
    if(this.teacher == false && this.ta == false) {
      //this.queryStudentStudySession();
      this.queryStudentTA();
    } else if (this.teacher = true && this.ta == true) {
      this.queryTAStudySession();
      this.queryStudentTA();
    } else {
      this.queryProfessorStudySessions();
    }
  }

  dataSource = SS_DATA;
  dataSourceStudent = STUDENT_DATA;
  columnsToDisplay = ['course', 'section'];
  expandedElement!: StudySessionInformation | null;
  course = new FormControl('', [Validators.required]);
  taLeader = new FormControl('', [Validators.required]);
  ss_date = new FormControl('', [Validators.required]);
  ss_time = new FormControl('', [Validators.required]);
  ss_location = new FormControl('', [Validators.required]);

  addStudySession() {
    document.getElementById("warningDeleteSS")!.style.display = "none";
    let isUpdate = false;
    for(let i = 0; i < SS_DATA.length; i++) {
      if(this.course.value == SS_DATA[i].course) {
        let taEmailArray = this.taLeader.value.split("-");
        let taEmail = taEmailArray[1];
        let theTa = taEmailArray[0];
        let locationSplit = this.ss_location.value.split(" ");
        let location = locationSplit[0];
        let inputTime = this.ss_time.value.substring(0, 8);
        for(let j = 0; j < SS_DATA[i].date.length; j++) {
          let storedTime = SS_DATA[i].time[j].substring(0, 8);
          console.log(inputTime);
          console.log(storedTime);
          if(SS_DATA[i].date[j] == this.ss_date.value && SS_DATA[i].location[j] == location && SS_DATA[i].taName[j] == theTa && inputTime == storedTime) {
            let locationModePercent = this.ss_location.value.replace(" ", "%20")
            this.ssService.updateStudySession(this.course.value, taEmail, this.ss_date.value, this.ss_time.value, locationModePercent).subscribe(response => console.log(response));
            SS_DATA[i].date[j] = this.ss_date.value;
            SS_DATA[i].time[j] = this.ss_time.value;
            SS_DATA[i].taName[j] = theTa;
            SS_DATA[i].location[j] = location;
            this.ss_date.reset();
            this.course.reset();
            this.ss_time.reset();
            this.ss_location.reset();
            this.taLeader.reset();
            document.getElementById("warningSS")!.style.display = "none";
            document.getElementById("formSS")!.style.display = "none";
            document.getElementById("addssButton")!.style.display = "block";
            isUpdate = true;
          }
        }
        if(isUpdate == false) {
          let locationModePercent = this.ss_location.value.replace(" ", "%20")
          this.ssService.insertStudySession(this.course.value, taEmail, this.ss_date.value, this.ss_time.value, locationModePercent).subscribe(response => console.log(response));
          SS_DATA[i].date.push(this.ss_date.value);
          SS_DATA[i].time.push(this.ss_time.value);
          SS_DATA[i].taName.push(theTa);
          SS_DATA[i].location.push(location);
          this.ss_date.reset();
          this.course.reset();
          this.ss_time.reset();
          this.ss_location.reset();
          this.taLeader.reset();
          document.getElementById("warningSS")!.style.display = "none";
          document.getElementById("formSS")!.style.display = "none";
          document.getElementById("addssButton")!.style.display = "block";
        }
      }
    }
  }

  exitAddStudySession() {
    document.getElementById("formSS")!.style.display = "none";
    document.getElementById("addssButton")!.style.display = "block";
    document.getElementById("warningSS")!.style.display = "none";
    document.getElementById("warningDeleteSS")!.style.display = "none";
  }

  displayAddStudySession() {
    document.getElementById("formSS")!.style.display = "block";
    document.getElementById("addssButton")!.style.display = "none"
  }

  deleteStudySession() {
    let isExistingStudySession = false;
    for(let i = 0; i < SS_DATA.length; i++) {
      if(SS_DATA[i].course == this.course.value) {
        for(let j = 0; j < SS_DATA[i].date.length; j++) {
          let taEmailArray = this.taLeader.value.split("-");
          let taEmail = taEmailArray[1];
          let theTa = taEmailArray[0];
          let locationSplit = this.ss_location.value.split(" ");
          let location = locationSplit[0];
          if(SS_DATA[i].date[j] == this.ss_date.value && SS_DATA[i].location[j] == location && SS_DATA[i].time[j] == this.ss_time.value && theTa == SS_DATA[i].taName[j]) {
            isExistingStudySession = true;
            SS_DATA[i].date.splice(j, 1);
            SS_DATA[i].time.splice(j, 1);
            SS_DATA[i].location.splice(j, 1);
            SS_DATA[i].taName.splice(j, 1);
            this.ssService.deleteStudySession(this.course.value, taEmail, this.ss_date.value, this.ss_time.value, this.ss_location.value).subscribe(response => console.log(response));
            this.course.reset();
            this.taLeader.reset();
            this.ss_date.reset();
            this.ss_location.reset();
            this.ss_time.reset();
            document.getElementById("formSS")!.style.display = "none";
            document.getElementById("addssButton")!.style.display = "block";
            document.getElementById("warningDeleteSS")!.style.display = "none";
          }
        }
      }
    }
    if(isExistingStudySession == false) {
      document.getElementById("warningDeleteSS")!.style.display = "block";
    }
  }

  queryProfessorStudySessions() {
    this.ssService.getProfessorStudySessions(this.theUserEmail).subscribe(response => { this.professorSSResults = response;
                                                                                        for(let i = 0; i < this.professorSSResults.length; i++) {
                                                                                          let isAdded = false;
                                                                                          for(let j = 0; j < SS_DATA.length; j++) {
                                                                                            if(this.professorSSResults[i].course_id == SS_DATA[j].course && this.professorSSResults[i].section_id == SS_DATA[j].section) {
                                                                                              isAdded = true;
                                                                                              SS_DATA[j].date.push(this.professorSSResults[i].date);
                                                                                              SS_DATA[j].time.push(this.professorSSResults[i].time);
                                                                                              SS_DATA[j].taName.push(this.professorSSResults[i].ta_name);
                                                                                              SS_DATA[j].location.push(this.professorSSResults[i].location);
                                                                                            }
                                                                                          }
                                                                                          if(isAdded == false) {
                                                                                            let newSession: StudySessionInformation = { course: this.professorSSResults[i].course_id,
                                                                                                                                        section: this.professorSSResults[i].section_id,
                                                                                                                                        date: [this.professorSSResults[i].date],
                                                                                                                                        time: [this.professorSSResults[i].time],
                                                                                                                                        taName: [this.professorSSResults[i].ta_name],
                                                                                                                                        location: [this.professorSSResults[i].location]
                                                                                                                                      };
                                                                                            SS_DATA.push(newSession);
                                                                                            console.log(SS_DATA);
                                                                                          }
                                                                                        }
                                                                                        this.table?.renderRows();
                                                                                      });
  }

  queryStudentStudySession() {
    this.ssService.getStudentStudySessions(this.theUserEmail).subscribe(response => { this.studentSSResults = response;
      for(let i = 0; i < this.studentSSResults.length; i++) {
        let isAdded = false;
        for(let j = 0; j < SS_DATA.length; j++) {
          if(this.studentSSResults[i].course_id == SS_DATA[j].course && this.studentSSResults[i].section_id == SS_DATA[j].section) {
            isAdded = true;
            SS_DATA[j].date.push(this.studentSSResults[i].date);
            SS_DATA[j].time.push(this.studentSSResults[i].time);
            SS_DATA[j].taName.push(this.studentSSResults[i].ta_name);
            SS_DATA[j].location.push(this.studentSSResults[i].location);
          }
        }
        if(isAdded == false) {
          let newSession: StudySessionInformation = { course: this.studentSSResults[i].course_id,
                                                      section: this.studentSSResults[i].section_id,
                                                      date: [this.studentSSResults[i].date],
                                                      time: [this.studentSSResults[i].time],
                                                      taName: [this.studentSSResults[i].ta_name],
                                                      location: [this.studentSSResults[i].location]
                                                    };
          SS_DATA.push(newSession);
          // console.log(SS_DATA);
        }
      }
      this.table?.renderRows();
    });
  }

  queryTAStudySession() {
    this.ssService.getTAStudySessions(this.theUserEmail).subscribe(response => { this.TASSResults = response;
      for(let i = 0; i < this.TASSResults.length; i++) {
        let isAdded = false;
        for(let j = 0; j < SS_DATA.length; j++) {
          if(this.TASSResults[i].course_id == SS_DATA[j].course && this.TASSResults[i].section_id == SS_DATA[j].section) {
            isAdded = true;
            SS_DATA[j].date.push(this.TASSResults[i].date);
            SS_DATA[j].time.push(this.TASSResults[i].time);
            SS_DATA[j].taName.push(this.TASSResults[i].ta_name);
            SS_DATA[j].location.push(this.TASSResults[i].location);
          }
        }
        if(isAdded == false) {
          let newSession: StudySessionInformation = { course: this.TASSResults[i].course_id,
                                                      section: this.TASSResults[i].section_id,
                                                      date: [this.TASSResults[i].date],
                                                      time: [this.TASSResults[i].time],
                                                      taName: [this.TASSResults[i].ta_name],
                                                      location: [this.TASSResults[i].location]
                                                    };
          SS_DATA.push(newSession);
          // console.log(SS_DATA);
        }
      }
      this.table?.renderRows();
    });
  }

  queryStudentTA() {
    this.ssService.getStudentStudySessions(this.theUserEmail).subscribe(response => { this.studentSSResults = response;
      for(let i = 0; i < this.studentSSResults.length; i++) {
        let isAdded = false;
        for(let j = 0; j < STUDENT_DATA.length; j++) {
          if(this.studentSSResults[i].course_id == STUDENT_DATA[j].course && this.studentSSResults[i].section_id == STUDENT_DATA[j].section) {
            isAdded = true;
            STUDENT_DATA[j].date.push(this.studentSSResults[i].date);
            STUDENT_DATA[j].time.push(this.studentSSResults[i].time);
            STUDENT_DATA[j].taName.push(this.studentSSResults[i].ta_name);
            STUDENT_DATA[j].location.push(this.studentSSResults[i].location);
          }
        }
        if(isAdded == false) {
          let newSession: StudySessionInformation = { course: this.studentSSResults[i].course_id,
                                                      section: this.studentSSResults[i].section_id,
                                                      date: [this.studentSSResults[i].date],
                                                      time: [this.studentSSResults[i].time],
                                                      taName: [this.studentSSResults[i].ta_name],
                                                      location: [this.studentSSResults[i].location]
                                                    };
          STUDENT_DATA.push(newSession);
        }
      }
      this.studenttable?.renderRows();
    });
  }

}

export interface StudySessionInformation{
  course: string;
  section: string;
  date: Array<String>;
  time: Array<String>;
  taName: Array<String>;
  location: Array<String>;
}

const SS_DATA: StudySessionInformation[] = [

]

const STUDENT_DATA: StudySessionInformation[] = [

]
