import { LoginComponent } from './../login/login.component';
import { InformationService } from './../information.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css'],
  animations: [
    trigger('detailExpand', [
    state('collapsed', style({height: '0px', minHeight: '0'})),
    state('expanded', style({height: '*'})),
    transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class InformationComponent implements OnInit {

  constructor(private infoService: InformationService) { }

  ngOnInit(): void {
    if(ELEMENT_DATA.length > 0) {
      ELEMENT_DATA.splice(0, ELEMENT_DATA.length);
    }
    this.table?.renderRows();
    console.log(ELEMENT_DATA);
    if(GRADE_DATA.length > 0) {
      GRADE_DATA.splice(0, GRADE_DATA.length);
    }
    this.gradeTable?.renderRows();
    if(ASSIGNMENT_DATA.length > 0) {
      ASSIGNMENT_DATA.splice(0, ASSIGNMENT_DATA.length);
    }
    this.assignmentTable?.renderRows();
    console.log(GRADE_DATA);
    this.queryMyCourse();
    this.queryMyAssignments();
    this.queryMyGrades();
  }

  teacher: boolean = LoginComponent.isTeacher;
  ta: boolean = LoginComponent.isTa;
  theUserEmail = LoginComponent.userEmail;
  dataSource = ELEMENT_DATA;
  dataAssignment = ASSIGNMENT_DATA;
  dataGrade = GRADE_DATA;
  columnsToDisplay = ['course', 'section'];
  expandedElement!: CourseInformation | null;
  expandedCourseAssignments!: AssignmentInformation | null;

  @ViewChild(MatTable) table: MatTable<any> | undefined;
  @ViewChild('grade') gradeTable: MatTable<any> | undefined;
  @ViewChild('assignment') assignmentTable: MatTable<any> | undefined;
  myCourseResults: any;
  myGradeResults: any
  myAssignmentResults: any;

  //Query Variables needed from http
  queryTwoNumSections: any;
  results: any;
  threeYesOrNo: any;
  threeResults: any;
  fiveResults: any;
  sixResults: any;
  tenResults: any;
  twelveResults: any;
  thirteenResults: any;
  nineteenResults: any;
  twentyResults: any;

  //Query 2 Validators
  twoCourse = new FormControl('', [Validators.required]);
  //Query 3 Validators
  threeCourse = new FormControl('', [Validators.required]);
  threeSection = new FormControl('', [Validators.required]);
  threeSemester = new FormControl('', [Validators.required]);
  threeYear = new FormControl('', [Validators.required]);
  threeEmail = new FormControl('', [Validators.required]);
  //Query 5 Validators
  fiveCourse = new FormControl('', [Validators.required]);
  //Query 6 Validators
  sixCourse = new FormControl('', [Validators.required]);
  sixModality = new FormControl('', [Validators.required]);
  //Query 10 Validators
  tenEmailOne = new FormControl('', [Validators.required]);
  tenEmailTwo = new FormControl('', [Validators.required]);
  tenEmailThree = new FormControl('', [Validators.required]);
  //Query 12 Validators
  twelveCourse = new FormControl('', [Validators.required]);
  twelveEmail = new FormControl('', [Validators.required]);
  twelveSection = new FormControl('', [Validators.required]);
  twelveSemester = new FormControl('', [Validators.required]);
  twelveYear = new FormControl('', [Validators.required]);
  //Query 13 Validators
  thirteenCourse = new FormControl('', [Validators.required]);
  thirteenSection = new FormControl('', [Validators.required]);
  thirteenSemester = new FormControl('', [Validators.required]);
  thirteenYear = new FormControl('', [Validators.required]);
  //Query 19 Validators
  nineteenEmail = new FormControl('', [Validators.required]);

  getErrorMessage(input: FormControl) {
    if (input.hasError('required')) {
      return 'You must enter a value';
    }
    return ""
  }

  queryTwo() {
    let courseInput = this.twoCourse.value;
    // let data1 = this.infoService.getQueryTwo(courseInput).subscribe((response) => console.log(response));
    this.infoService.getQueryTwo(courseInput).subscribe(response => { this.results = response; this.queryTwoNumSections = this.results[0].num_sections;});
    document.getElementById("numSections")!.style.display = "block";
  }

  queryThree() {
    let threeCoureseId = this.threeCourse.value;
    let threeSectionId = this.threeSection.value;
    let threeSemesterInput = this.threeSemester.value;
    let threeYearInput = this.threeYear.value;
    let threeEmailInput = this.threeEmail.value;
    this.infoService.getQueryThree(threeCoureseId, threeSectionId, threeSemesterInput, threeYearInput, threeEmailInput).subscribe(response => {this.threeResults = response; this.threeYesOrNo = this.threeResults[0].result;});
    document.getElementById("courseFit")!.style.display = "block";
  }

  queryFive() {
    let fiveCourseId = this.fiveCourse.value;
    this.infoService.getQueryFive(fiveCourseId).subscribe(response => this.fiveResults = response);
  }

  querySix() {
    let sixCourseName = this.sixCourse.value;
    let sixMode = this.sixModality.value;
    this.infoService.getQuerySix(sixCourseName, sixMode).subscribe(response => { this.sixResults = response;});
  }

  queryTen() {
    let tenEmailUno = this.tenEmailOne.value;
    let tenEmailDos = this.tenEmailTwo.value;
    let tenEmailTres = this.tenEmailThree.value;
    this.infoService.getQueryTen(tenEmailUno, tenEmailDos, tenEmailTres).subscribe(response => this.tenResults = response);
  }

  queryTwelve() {
    let twelveEmailInput = this.twelveEmail.value;
    let twelveCourseId = this.twelveCourse.value;
    let twelveSemesterInput = this.twelveSemester.value;
    let twelveSectionId = this.twelveSection.value;
    let twelveYearInput = this.twelveYear.value;
    this.infoService.getQueryTwelve(twelveCourseId, twelveEmailInput, twelveSectionId, twelveSemesterInput, twelveYearInput).subscribe(response => this.twelveResults = response);
  }

  queryThirteen() {
    let thirteenCourseId = this.thirteenCourse.value;
    let thirteenSectionId = this.thirteenSection.value;
    let thirteenSemesterInput = this.thirteenSemester.value;
    let thirteenYearInput = this.thirteenYear.value;
    this.infoService.getQueryThirteen(thirteenCourseId, thirteenSectionId, thirteenSemesterInput, thirteenYearInput).subscribe(response => this.thirteenResults = response);
  }

  queryNineteen() {
    let nineteenEmailInput = this.nineteenEmail.value;
    this.infoService.getQueryNineteen(nineteenEmailInput).subscribe(response => this.nineteenResults = response);
  }

  queryTwenty() {
    this.infoService.getQueryTwenty().subscribe(response => this.twentyResults = response);
  }

  queryMyCourse() {
    this.infoService.getMyCourses(this.theUserEmail).subscribe(response => { console.log(response); this.myCourseResults = response;
      for(let i = 0; i < this.myCourseResults.length; i++) {
        let isAdded = false;
        for(let j = 0; j < ELEMENT_DATA.length; j++) {
          if(this.myCourseResults[i].course_id == ELEMENT_DATA[j].course && this.myCourseResults[i].section_id == ELEMENT_DATA[j].section) {
            isAdded = true;
            ELEMENT_DATA[j].taName.push(this.myCourseResults[i].ta);
            ELEMENT_DATA[j].taEmail.push(this.myCourseResults[i].ta_email);
            ELEMENT_DATA[j].officeHours.push(this.myCourseResults[i].office_hour_time + " " + this.myCourseResults[i].office_hour_day + " " + this.myCourseResults[i].office_hour_location);
          }
        }
        if(isAdded == false) {
          let newSession: CourseInformation = {
                  course: this.myCourseResults[i].course_id,
                  section: this.myCourseResults[i].section_id,
                  professorName: this.myCourseResults[i].professor,
                  taName: [this.myCourseResults[i].ta],
                  professorEmail: this.myCourseResults[i].professor_email,
                  taEmail: [this.myCourseResults[i].ta_email],
                  officeHours: [this.myCourseResults[i].office_hour_time + " " + this.myCourseResults[i].office_hour_day + " " + this.myCourseResults[i].office_hour_location]
                };
          ELEMENT_DATA.push(newSession);
          // console.log(ASSIGNMENT_DATA);
        }
      }
      this.table?.renderRows();
    });//{ console.log(response); this.myCourseResults = response;
    //   for(let i = 0; i < this.myCourseResults.length; i++) {
    //     let newSession: CourseInformation = {
    //       course: this.myCourseResults[i].course_id,
    //       section: this.myCourseResults[i].section_id,
    //       professorName: this.myCourseResults[i].professor,
    //       taName: this.myCourseResults[i].ta,
    //       professorEmail: this.myCourseResults[i].professor_email,
    //       taEmail: this.myCourseResults[i].ta_email,
    //       officeHours: [this.myCourseResults[i].office_hour_time + " " + this.myCourseResults[i].office_hour_day + " " + this.myCourseResults[i].office_hour_location]
    //     };
    //     ELEMENT_DATA.push(newSession);
    //     // console.log(ELEMENT_DATA);
    //   }
    //   this.table?.renderRows();
    // });
  }

  queryMyAssignments() {
    this.infoService.getMyAssignments(this.theUserEmail).subscribe(response => { console.log(response); this.myAssignmentResults = response;
      for(let i = 0; i < this.myAssignmentResults.length; i++) {
        let isAdded = false;
        for(let j = 0; j < ASSIGNMENT_DATA.length; j++) {
          if(this.myAssignmentResults[i].course_id == ASSIGNMENT_DATA[j].course && this.myAssignmentResults[i].section_id == ASSIGNMENT_DATA[j].section) {
            isAdded = true;
            ASSIGNMENT_DATA[j].assignment.push(this.myAssignmentResults[i].description);
            ASSIGNMENT_DATA[j].dueDate.push(this.myAssignmentResults[i].due_date);
          }
        }
        if(isAdded == false) {
          let newSession: AssignmentInformation = { course: this.myAssignmentResults[i].course_id,
                                                      section: this.myAssignmentResults[i].section_id,
                                                      assignment: [this.myAssignmentResults[i].description],
                                                      dueDate: [this.myAssignmentResults[i].due_date],
                                                    };
          ASSIGNMENT_DATA.push(newSession);
          // console.log(ASSIGNMENT_DATA);
        }
      }
      this.assignmentTable?.renderRows();
    });
  }

  queryMyGrades() {
    this.infoService.getMyGrades(this.theUserEmail).subscribe(response => { this.myGradeResults = response;
      for(let i = 0; i < this.myGradeResults.length; i++) {
        let newSession: GradeInformation = {
          course: this.myGradeResults[i].course_id,
          section: this.myGradeResults[i].section_id,
          grade: this.myGradeResults[i].grade,
        };
        GRADE_DATA.push(newSession);
        console.log(GRADE_DATA);
      }
      this.gradeTable?.renderRows();
    });
  }

}

export interface queryTest {
  num_sections: string;
}

export interface CourseInformation{
  course: string;
  section: string;
  professorName: string;
  taName: Array<string>;
  professorEmail: string;
  taEmail: Array<string>;
  officeHours: Array<string>;
}

export interface AssignmentInformation{
  course: string;
  section: string;
  assignment: Array<String>;
  dueDate: Array<String>;
}

export interface GradeInformation{
  course: string;
  section: string;
  grade: number;
}

const ELEMENT_DATA: CourseInformation[] = [

];

const ASSIGNMENT_DATA: AssignmentInformation[] = [

]

const GRADE_DATA: GradeInformation[] = [
]
