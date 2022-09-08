import { LoginComponent } from './../login/login.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { FormControl, Validators } from '@angular/forms';
import { TeacherInformationService } from '../teacher-information.service';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-teacher-information',
  templateUrl: './teacher-information.component.html',
  styleUrls: ['./teacher-information.component.css'],
  animations: [
    trigger('detailExpand', [
    state('collapsed', style({height: '0px', minHeight: '0'})),
    state('expanded', style({height: '*'})),
    transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TeacherInformationComponent implements OnInit {

  @ViewChild('teacherCourse') tableCourse: MatTable<any> | undefined;
  @ViewChild('teacherGrade') tableGrade: MatTable<any> | undefined;
  @ViewChild('teacherAssignment') tableAssignment: MatTable<any> | undefined;
  professorCourseResults: any;
  professorGradeResults: any;
  professorAssignmentResults: any;
  TACourseResults: any;
  TAGradeResults: any;
  TAAssignmentResults: any;


  constructor(private teacherInfoService: TeacherInformationService) { }

  ngOnInit(): void {
    if(ELEMENT_DATA.length > 0) {
      ELEMENT_DATA.splice(0, ELEMENT_DATA.length);
    }
    this.tableCourse?.renderRows();
    console.log(ELEMENT_DATA);
    if(GRADE_DATA.length > 0) {
      GRADE_DATA.splice(0, GRADE_DATA.length);
    }
    this.tableGrade?.renderRows();
    if(ASSIGNMENT_DATA.length > 0) {
      ASSIGNMENT_DATA.splice(0, ASSIGNMENT_DATA.length);
    }
    this.tableAssignment?.renderRows();
    if(this.isUserteacher == true && this.isUserTA == true) {
      this.queryTACourse();
      this.queryTAAssignments();
      this.queryTAGrades();
    } else {
      this.queryProfessorCourse();
      this.queryProfessorAssignments();
      this.queryProfessorGrades();
    }
  }

  isUserteacher = LoginComponent.isTeacher;
  isUserTA = LoginComponent.isTa;
  theUserEmail = LoginComponent.userEmail;
  dataSource = ELEMENT_DATA;
  dataAssignment = ASSIGNMENT_DATA;
  dataGrade = GRADE_DATA;
  columnsToDisplay = ['course', 'section'];
  expandedElement!: CourseInformation | null;
  expandedCourseAssignments!: AssignmentInformation | null;
  expandedGrade!: GradeInformation | null;
  course = new FormControl('', [Validators.required]);
  assignmentId = new FormControl('', [Validators.required]);
  assignmentDue = new FormControl('', [Validators.required]);
  course_grade = new FormControl('', [Validators.required]);
  studentInputName = new FormControl('', [Validators.required]);
  student_grade = new FormControl('', [Validators.required]);
  courseInformation = new FormControl('', [Validators.required]);
  officeHours = new FormControl('', [Validators.required]);
  //Query 1 Validators
  oneCourse = new FormControl('', [Validators.required]);
  oneEmail = new FormControl('', [Validators.required]);
  //Query 2 Validators
  twoCourse = new FormControl('', [Validators.required]);
  //Query 4 Validators
  fourEmail = new FormControl('', [Validators.required]);
  //Query 5 Validators
  fiveCourse = new FormControl('', [Validators.required]);
  //Query 6 Validators
  sixCourse = new FormControl('', [Validators.required]);
  sixModality = new FormControl('', [Validators.required]);
  //Query 7 Validators
  sevenEmail = new FormControl('', [Validators.required]);
  //Query 8 Validators
  eightCourse = new FormControl('', [Validators.required]);
  //Query 10 Validators
  tenEmailOne = new FormControl('', [Validators.required]);
  tenEmailTwo = new FormControl('', [Validators.required]);
  tenEmailThree = new FormControl('', [Validators.required]);
  //Query 11 Validators
  elevenCourse = new FormControl('', [Validators.required]);
  elevenSection = new FormControl('', [Validators.required]);
  elevenSemester = new FormControl('', [Validators.required]);
  elevenYear = new FormControl('', [Validators.required]);
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
  //Query 14 Validators
  fourteenEmail = new FormControl('', [Validators.required]);
  //Query 15 Validators
  fifteenCourse = new FormControl('', [Validators.required]);
  fifteenSection = new FormControl('', [Validators.required]);
  fifteenSemester = new FormControl('', [Validators.required]);
  fifteenYear = new FormControl('', [Validators.required]);
  fifteenDate = new FormControl('', [Validators.required]);
  fifteenStartTime = new FormControl('', [Validators.required]);
  fifteenEndTime = new FormControl('', [Validators.required]);
  //Query 17 Validators
  seventeenFirstName = new FormControl('', [Validators.required]);
  seventeenLastName = new FormControl('', [Validators.required]);
  seventeenAssignment = new FormControl('', [Validators.required]);

  //Query On Click Variables
  queryTwoNumSections: any;
  results: any;
  oneResults: any;
  fourResults: any;
  fourHoursWorked: any;
  fiveResults: any;
  sixResults: any;
  sevenResults: any;
  eightResults: any;
  nineResults: any;
  tenResults: any;
  elevenResults: any;
  twelveResults: any;
  thirteenResults: any;
  fourteenResults: any;
  fourteenSSAttended: any;
  fifteenResults: any;
  fifteenAvaliableStudents: any;
  sixteenResults: any;
  sixteenTimeOfDay: any;
  seventeenResults: any;
  eighteenResults: any;
  twentyResults: any;

  displayNewAssignForm() {
    document.getElementById("formAssign")!.style.display = "block";
    document.getElementById("addAssignButton")!.style.display = "none"
  }

  displayEditStudentForm() {
    document.getElementById("formGrade")!.style.display = "block";
    document.getElementById("editGradeButton")!.style.display = "none"
  }

  displayEditOHForm() {
    document.getElementById("formCourseInfo")!.style.display = "block";
    document.getElementById("addEditOHButton")!.style.display = "none"
  }

  addAssignment() {
    document.getElementById("warningDeleteAssignment")!.style.display = "none";
    let isValid = false;
    let isAssignemnt = false;
    for(let i = 0; i < ASSIGNMENT_DATA.length; i++) {
      if(this.course.value == (ASSIGNMENT_DATA[i].course + "-" + ASSIGNMENT_DATA[i].section)) {
        let assignmentArray = this.assignmentId.value.split("-");
        let assignmentName = assignmentArray[2];
        // assignmentName = assignmentName.replace("+", " ");
        // console.log(assignmentName);
        for(let j = 0; j < ASSIGNMENT_DATA[i].assignment.length; j++) {
          if(assignmentName == ASSIGNMENT_DATA[i].assignment[j]) {
            isAssignemnt = true;
            isValid = true;
            let assignmentInputIdOne = this.assignmentId.value.replace(" ", "%20");
            let assignmentInputDueTwo = this.assignmentDue.value.replace(" ", "%20");
            this.teacherInfoService.updateAssignment(this.course.value, assignmentInputIdOne, assignmentInputDueTwo).subscribe(response => console.log(response));
            let assignmentDateTwo = this.assignmentDue.value.replace("%20", " ");
            ASSIGNMENT_DATA[i].dueDate[j] = assignmentDateTwo;
            document.getElementById("formAssign")!.style.display = "none";
            document.getElementById("addAssignButton")!.style.display = "block"
            this.course.reset();
            this.assignmentDue.reset();
            this.assignmentId.reset();
            document.getElementById("warningAssignment")!.style.display = "none";
          }
        }
        if(isAssignemnt == false) {
          console.log(this.course.value);
          console.log(this.assignmentId.value);
          console.log(this.assignmentDue.value);
          let assignmentInputId = this.assignmentId.value.replace(" ", "%20");
          let assignmentInputDue = this.assignmentDue.value.replace(" ", "%20");
          this.teacherInfoService.postAssignment(this.course.value, assignmentInputId, assignmentInputDue).subscribe(response => console.log(response));
          let assignmentName = assignmentArray[2].replace("%20", " ");
          ASSIGNMENT_DATA[i].assignment.push(assignmentName);
          let assignmentDate = this.assignmentDue.value.replace("%20", " ");
          ASSIGNMENT_DATA[i].dueDate.push(assignmentDate);
          document.getElementById("formAssign")!.style.display = "none";
          document.getElementById("addAssignButton")!.style.display = "block"
          document.getElementById("warningAssignment")!.style.display = "none";
          isValid = true
          this.course.reset();
          this.assignmentDue.reset();
          this.assignmentId.reset();
        }
      }
    }
    if(isValid == false) {
      document.getElementById("warningAssignment")!.style.display = "block";
    }
  }

  deleteAssignment() {
    let isExistingAssignment = false;
    for(let i = 0; i < ASSIGNMENT_DATA.length; i++) {
      if((ASSIGNMENT_DATA[i].course + "-" + ASSIGNMENT_DATA[i].section) === this.course.value) {
        for(let j = 0; j < ASSIGNMENT_DATA[i].assignment.length; j++) {
          let assignmentArray = this.assignmentId.value.split("-");
          let assignmentName = assignmentArray[2];
          console.log(assignmentArray[0]);
          if(ASSIGNMENT_DATA[i].assignment[j] == assignmentName && ASSIGNMENT_DATA[i].dueDate[j] == this.assignmentDue.value) {
            isExistingAssignment = true;
            ASSIGNMENT_DATA[i].assignment.splice(j, 1);
            ASSIGNMENT_DATA[i].dueDate.splice(j, 1);
            let assignmentDeleteId = this.assignmentId.value.replace(" ", "%20");
            let assignmentDeleteDue = this.assignmentDue.value.replace(" ", "%20");
            let trimTime = assignmentDeleteDue.substring(0,assignmentDeleteDue.length-3);
            console.log(trimTime);
            this.teacherInfoService.deleteAssignment(this.course.value, assignmentDeleteId, trimTime).subscribe(response => console.log(response));
            this.course.reset();
            this.assignmentDue.reset();
            this.assignmentId.reset();
            document.getElementById("formAssign")!.style.display = "none";
            document.getElementById("addAssignButton")!.style.display = "block"
            document.getElementById("warningDeleteAssignment")!.style.display = "none";
            break;
          }
        }
      }
    }
    if(isExistingAssignment == false) {
      document.getElementById("warningDeleteAssignment")!.style.display = "block";
    }
  }

  exitAddAssignment() {
    document.getElementById("formAssign")!.style.display = "none";
    document.getElementById("addAssignButton")!.style.display = "block";
    document.getElementById("warningAssignment")!.style.display = "none";
  }

  exitEditStudent() {
    document.getElementById("formGrade")!.style.display = "none";
    document.getElementById("editGradeButton")!.style.display = "block";
    document.getElementById("warningStudent")!.style.display = "none";
  }

  exitEditCourse() {
    document.getElementById("formCourseInfo")!.style.display = "none";
    document.getElementById("addEditOHButton")!.style.display = "block";
    document.getElementById("warningEditOH")!.style.display = "none";
  }

  editStudentGrade() {
    let isStudent = false;
    for(let i = 0; i < GRADE_DATA.length; i++) {
      console.log((GRADE_DATA[i].course + " " + GRADE_DATA[i].section));
      if((GRADE_DATA[i].course + "-" + GRADE_DATA[i].section) === this.course_grade.value) {
        for(let j = 0; j < GRADE_DATA[i].grade.length; j++) {
          //console.log(GRADE_DATA[i].grade.length);
          console.log(GRADE_DATA[i].grade[j][0]);
          if(this.studentInputName.value == GRADE_DATA[i].grade[j][0]) {
            this.teacherInfoService.updateGrade(this.course_grade.value, this.studentInputName.value, this.student_grade.value).subscribe(response => console.log("response"));
            GRADE_DATA[i].grade[j][1] = this.student_grade.value;
            document.getElementById("formGrade")!.style.display = "none";
            document.getElementById("editGradeButton")!.style.display = "block";
            this.course_grade.reset();
            this.student_grade.reset();
            this.studentInputName.reset();
            isStudent = true;
            document.getElementById("warningStudent")!.style.display = "none";
          }
        }
      }
    }
    if(isStudent == false) {
      document.getElementById("warningStudent")!.style.display = "block";
    }
  }

  editCourseInformation() {
    let isCourseTaught = false;
    if(this.officeHours.value == "" || this.officeHours.value == null || this.courseInformation.value == "") {
      document.getElementById("warningEditOH")!.style.display = "block";
    } else {
      for(let i = 0; i < ELEMENT_DATA.length; i++) {
        if(this.courseInformation.value == ELEMENT_DATA[i].course) {
          for(let k = 0; k < ELEMENT_DATA[i].officeHours.length; k++) {
            let noEndP1 = this.officeHours.value.substring(0,8)
            let noEndP2 = this.officeHours.value.substring(17, this.officeHours.value.length);
            let noEnd = noEndP1 + noEndP2;
            console.log(noEnd);
            let noEndCurrP1 = ELEMENT_DATA[i].officeHours[k].substring(0,8)
            let noEndCurrP2 = ELEMENT_DATA[i].officeHours[k].substring(17, ELEMENT_DATA[i].officeHours[k].length);
            let noEndCurr = noEndCurrP1 + noEndCurrP2;
            console.log(noEndCurr);
            if(noEndCurr === noEnd) {
              ELEMENT_DATA[i].officeHours[k] = this.officeHours.value;
              let officeReplace = this.officeHours.value.replace(/ /g, '%20');
              console.log(officeReplace);
              this.teacherInfoService.updateOfficeHours(this.courseInformation.value, officeReplace).subscribe(response => console.log(response));
              document.getElementById("formCourseInfo")!.style.display = "none";
              document.getElementById("addEditOHButton")!.style.display = "block";
              document.getElementById("warningEditOH")!.style.display = "none";
              this.courseInformation.reset();
              this.officeHours.reset();
              isCourseTaught = true;
              break;
            }
          }
        }
      }
      if(isCourseTaught == false) {
        document.getElementById("warningEditOH")!.style.display = "block";
      }
    }
  }

  getErrorMessage(input: FormControl) {
    if (input.hasError('required')) {
      return 'You must enter a value';
    }
    return ""
  }

  queryOne() {
    let courseIdOne = this.oneCourse.value;
    let inputEmailOne = this.oneEmail.value;
    this.teacherInfoService.getQueryOne(courseIdOne, inputEmailOne).subscribe(response => this.oneResults = response);
  }

  queryTwo() {
    let courseInput = this.twoCourse.value;
    // let data1 = this.infoService.getQueryTwo(courseInput).subscribe((response) => console.log(response));
    this.teacherInfoService.getQueryTwo(courseInput).subscribe(response => { this.results = response; this.queryTwoNumSections = this.results[0].num_sections;});
    document.getElementById("numSections")!.style.display = "block";
  }

  queryFour() {
    let emailFour = this.fourEmail.value;
    this.teacherInfoService.getQueryFour(emailFour).subscribe(response => { this.fourResults = response;  this.fourHoursWorked = this.fourResults[0].hours_worked});
    document.getElementById("numTaHoursWorked")!.style.display = "block";
  }

  queryFive() {
    let fiveCourseId = this.fiveCourse.value;
    this.teacherInfoService.getQueryFive(fiveCourseId).subscribe(response => this.fiveResults = response);
  }

  querySix() {
    let sixCourseName = this.sixCourse.value;
    let sixMode = this.sixModality.value;
    this.teacherInfoService.getQuerySix(sixCourseName, sixMode).subscribe(response => { this.sixResults = response;});
  }

  querySeven() {
    let emailSeven = this.sevenEmail.value;
    this.teacherInfoService.getQuerySeven(emailSeven).subscribe(response => this.sevenResults = response);
  }

  queryEight() {
    let courseEight = this.eightCourse.value;
    this.teacherInfoService.getQueryEight(courseEight).subscribe(response => this.eightResults = response);
  }

  queryNine() {
    this.teacherInfoService.getQueryNine().subscribe(response => this.nineResults = response);
  }

  queryTen() {
    let tenEmailUno = this.tenEmailOne.value;
    let tenEmailDos = this.tenEmailTwo.value;
    let tenEmailTres = this.tenEmailThree.value;
    this.teacherInfoService.getQueryTen(tenEmailUno, tenEmailDos, tenEmailTres).subscribe(response => this.tenResults = response);
  }

  queryEleven() {
    let courseEleven = this.elevenCourse.value;
    let sectionEleven = this.elevenSection.value;
    let semesterEleven = this.elevenSemester.value;
    let yearEleven = this.elevenYear.value;
    this.teacherInfoService.getQueryEleven(courseEleven, sectionEleven, semesterEleven, yearEleven).subscribe(response => this.elevenResults = response);
  }

  queryTwelve() {
    let twelveEmailInput = this.twelveEmail.value;
    let twelveCourseId = this.twelveCourse.value;
    let twelveSemesterInput = this.twelveSemester.value;
    let twelveSectionId = this.twelveSection.value;
    let twelveYearInput = this.twelveYear.value;
    this.teacherInfoService.getQueryTwelve(twelveCourseId, twelveEmailInput, twelveSectionId, twelveSemesterInput, twelveYearInput).subscribe(response => this.twelveResults = response);
  }

  queryThirteen() {
    let thirteenCourseId = this.thirteenCourse.value;
    let thirteenSectionId = this.thirteenSection.value;
    let thirteenSemesterInput = this.thirteenSemester.value;
    let thirteenYearInput = this.thirteenYear.value;
    this.teacherInfoService.getQueryThirteen(thirteenCourseId, thirteenSectionId, thirteenSemesterInput, thirteenYearInput).subscribe(response => this.thirteenResults = response);
  }

  queryFourteen() {
    let emailFourteen = this.fourteenEmail.value;
    this.teacherInfoService.getQueryFourteen(emailFourteen).subscribe(response => { this.fourteenResults = response; this.fourteenSSAttended = this.fourteenResults[0].num_sessions_attended;});
    document.getElementById('attendedSSFourteen')!.style.display = "block";
  }

  queryFifteen() {
    let courseFifteen = this.fifteenCourse.value;
    let sectionFifteen = this.fifteenSection.value;
    let semesterFifteen = this.fifteenSemester.value;
    let yearFifteen = this.fifteenYear.value;
    let dateFifteen = this.fifteenDate.value;
    let startTimeFifteen = this.fifteenStartTime.value;
    let endTimeFifteen = this.fifteenEndTime.value;
    this.teacherInfoService.getQueryFifteen(courseFifteen, sectionFifteen, semesterFifteen, yearFifteen, dateFifteen, startTimeFifteen, endTimeFifteen).subscribe(response => { this.fifteenResults = response; this.fifteenAvaliableStudents = this.fifteenResults[0].available_students;});
    document.getElementById('avaliableStudents')!.style.display = "block";
  }

  querySixteen() {
    this.teacherInfoService.getQuerySixteen().subscribe(response => { this.sixteenResults = response; this.sixteenTimeOfDay = this.sixteenResults[0].most_popular_start_time;});
    document.getElementById('popularStartTime')!.style.display = "block";
  }

  querySeventeen() {
    let firstnameSeventeen = this.seventeenFirstName.value;
    let lastnameSeventeen = this.seventeenLastName.value;
    let assignmentSeventeen = this.seventeenAssignment.value;
    this.teacherInfoService.getQuerySeventeen(firstnameSeventeen, lastnameSeventeen, assignmentSeventeen).subscribe(response => this.seventeenResults = response);
  }

  queryEighteen() {
    this.teacherInfoService.getQueryEighteen().subscribe(response => this.eighteenResults = response);
  }

  queryTwenty() {
    this.teacherInfoService.getQueryTwenty().subscribe(response => this.twentyResults = response);
  }

  queryProfessorCourse() {
    this.teacherInfoService.getProfessorCourses(this.theUserEmail).subscribe(response => { console.log(response); this.professorCourseResults = response;
      for(let i = 0; i < this.professorCourseResults.length; i++) {
        let isAdded = false;
        for(let j = 0; j < ELEMENT_DATA.length; j++) {
          if(this.professorCourseResults[i].course_id == ELEMENT_DATA[j].course && this.professorCourseResults[i].section_id == ELEMENT_DATA[j].section) {
            isAdded = true;
            ELEMENT_DATA[j].taName.push(this.professorCourseResults[i].ta);
            ELEMENT_DATA[j].taEmail.push(this.professorCourseResults[i].ta_email);
            ELEMENT_DATA[j].officeHours.push(this.professorCourseResults[i].office_hour_time + " " + this.professorCourseResults[i].office_hour_day + " " + this.professorCourseResults[i].office_hour_location);
          }
        }
        if(isAdded == false) {
          let newSession: CourseInformation = {
                  course: this.professorCourseResults[i].course_id,
                  section: this.professorCourseResults[i].section_id,
                  professorName: this.professorCourseResults[i].professor,
                  taName: [this.professorCourseResults[i].ta],
                  professorEmail: this.professorCourseResults[i].professor_email,
                  taEmail: [this.professorCourseResults[i].ta_email],
                  officeHours: [this.professorCourseResults[i].office_hour_time + " " + this.professorCourseResults[i].office_hour_day + " " + this.professorCourseResults[i].office_hour_location]
                };
          ELEMENT_DATA.push(newSession);
          // console.log(ASSIGNMENT_DATA);
        }
      }
      this.tableCourse?.renderRows();
    });
  }

  queryProfessorAssignments() {
    this.teacherInfoService.getProfessorAssignments(this.theUserEmail).subscribe(response => { console.log(response); this.professorAssignmentResults = response;
      for(let i = 0; i < this.professorAssignmentResults.length; i++) {
        let isAdded = false;
        for(let j = 0; j < ASSIGNMENT_DATA.length; j++) {
          if(this.professorAssignmentResults[i].course_id == ASSIGNMENT_DATA[j].course && this.professorAssignmentResults[i].section_id == ASSIGNMENT_DATA[j].section) {
            isAdded = true;
            ASSIGNMENT_DATA[j].assignment.push(this.professorAssignmentResults[i].description);
            ASSIGNMENT_DATA[j].dueDate.push(this.professorAssignmentResults[i].due_date);
          }
        }
        if(isAdded == false) {
          let newSession: AssignmentInformation = { course: this.professorAssignmentResults[i].course_id,
                                                      section: this.professorAssignmentResults[i].section_id,
                                                      assignment: [this.professorAssignmentResults[i].description],
                                                      dueDate: [this.professorAssignmentResults[i].due_date],
                                                    };
          ASSIGNMENT_DATA.push(newSession);
          // console.log(ASSIGNMENT_DATA);
        }
      }
      this.tableAssignment?.renderRows();
    });
  }

  queryProfessorGrades() {
    this.teacherInfoService.getProfessorGrades(this.theUserEmail).subscribe(response => { console.log(response); this.professorGradeResults = response;
      for(let i = 0; i < this.professorGradeResults.length; i++) {
        let isAdded = false;
        for(let j = 0; j < GRADE_DATA.length; j++) {
          if(this.professorGradeResults[i].course_id == GRADE_DATA[j].course && this.professorGradeResults[i].section_id == GRADE_DATA[j].section) {
            isAdded = true;
            GRADE_DATA[j].grade.push([this.professorGradeResults[i].student_email, this.professorGradeResults[i].grade]);
          }
        }
        if(isAdded == false) {
          let newSession: GradeInformation = { course: this.professorGradeResults[i].course_id,
                                                      section: this.professorGradeResults[i].section_id,
                                                      grade: [[this.professorGradeResults[i].student_email, this.professorGradeResults[i].grade]],
                                                    };
          GRADE_DATA.push(newSession);
          //console.log(GRADE_DATA);
        }
      }
      console.log(GRADE_DATA);
      this.tableGrade?.renderRows();
    });
  }

  queryTACourse() {
    this.teacherInfoService.getTACourses(this.theUserEmail).subscribe(response => { console.log(response); this.TACourseResults = response;
      for(let i = 0; i < this.TACourseResults.length; i++) {
        let isAdded = false;
        for(let j = 0; j < ELEMENT_DATA.length; j++) {
          if(this.TACourseResults[i].course_id == ELEMENT_DATA[j].course && this.TACourseResults[i].section_id == ELEMENT_DATA[j].section) {
            isAdded = true;
            ELEMENT_DATA[j].taName.push(this.TACourseResults[i].ta_name);
            ELEMENT_DATA[j].taEmail.push(this.TACourseResults[i].email);
            ELEMENT_DATA[j].officeHours.push(this.TACourseResults[i].office_hour_time + " " + this.TACourseResults[i].office_hour_day + " " + this.TACourseResults[i].office_hour_location);
          }
        }
        if(isAdded == false) {
          let newSession: CourseInformation = {
                  course: this.TACourseResults[i].course_id,
                  section: this.TACourseResults[i].section_id,
                  professorName: this.TACourseResults[i].professor,
                  taName: [this.TACourseResults[i].ta_name],
                  professorEmail: this.TACourseResults[i].professor_email,
                  taEmail: [this.TACourseResults[i].email],
                  officeHours: [this.TACourseResults[i].office_hour_time + " " + this.TACourseResults[i].office_hour_day + " " + this.TACourseResults[i].office_hour_location]
                };
          ELEMENT_DATA.push(newSession);
          // console.log(ASSIGNMENT_DATA);
        }
      }
      this.tableCourse?.renderRows();
    });
  }

  queryTAAssignments() {
    this.teacherInfoService.getTAAssignments(this.theUserEmail).subscribe(response => { console.log(response); this.TAAssignmentResults = response;
      for(let i = 0; i < this.TAAssignmentResults.length; i++) {
        let isAdded = false;
        for(let j = 0; j < ASSIGNMENT_DATA.length; j++) {
          if(this.TAAssignmentResults[i].course_id == ASSIGNMENT_DATA[j].course && this.TAAssignmentResults[i].section_id == ASSIGNMENT_DATA[j].section) {
            isAdded = true;
            ASSIGNMENT_DATA[j].assignment.push(this.TAAssignmentResults[i].description);
            ASSIGNMENT_DATA[j].dueDate.push(this.TAAssignmentResults[i].due_date);
          }
        }
        if(isAdded == false) {
          let newSession: AssignmentInformation = { course: this.TAAssignmentResults[i].course_id,
                                                      section: this.TAAssignmentResults[i].section_id,
                                                      assignment: [this.TAAssignmentResults[i].description],
                                                      dueDate: [this.TAAssignmentResults[i].due_date],
                                                    };
          ASSIGNMENT_DATA.push(newSession);
          // console.log(ASSIGNMENT_DATA);
        }
      }
      this.tableAssignment?.renderRows();
    });
  }

  queryTAGrades() {
    this.teacherInfoService.getTAGrades(this.theUserEmail).subscribe(response => { console.log(response); this.TAGradeResults = response;
      for(let i = 0; i < this.TAGradeResults.length; i++) {
        let isAdded = false;
        for(let j = 0; j < GRADE_DATA.length; j++) {
          if(this.TAGradeResults[i].course_id == GRADE_DATA[j].course && this.TAGradeResults[i].section_id == GRADE_DATA[j].section) {
            isAdded = true;
            GRADE_DATA[j].grade.push([this.TAGradeResults[i].student_email, this.TAGradeResults[i].grade]);
          }
        }
        if(isAdded == false) {
          let newSession: GradeInformation = { course: this.TAGradeResults[i].course_id,
                                                      section: this.TAGradeResults[i].section_id,
                                                      grade: [[this.TAGradeResults[i].studnet_email, this.TAGradeResults[i].grade]],
                                                    };
          GRADE_DATA.push(newSession);
          // console.log(GRADE_DATA);
        }
      }
      console.log("bing bong");
      console.log(GRADE_DATA);
      this.tableGrade?.renderRows();
    });
  }

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
  grade: Array<Array<any>>;
}

const ELEMENT_DATA: CourseInformation[] = [

];

const ASSIGNMENT_DATA: AssignmentInformation[] = [

]

const GRADE_DATA: GradeInformation[] = [

]
