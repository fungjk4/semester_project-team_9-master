import { LoginService } from './../login.service';
import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private route:Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  public static isTeacher: boolean = false;
  public static isTa: boolean = false;
  public static isStudent: boolean = true;
  public static userEmail: string = ""
  email = new FormControl('', [Validators.required, Validators.email]);
  databaseEmails = [['harndorfer@gmail.com', "student"], ['harndorfer@amctechnology.com', "teacher"]]
  isDatabaseEmail = false
  emailQueryResults: any;

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  onSubmit() {
    // for(let i = 0; i < this.databaseEmails.length; i++) {
    //   if(this.email.value == this.databaseEmails[i][0]) {
    //     this.isDatabaseEmail = true;
    //     if(this.databaseEmails[i][1] == "teacher") {
    //       LoginComponent.isTeacher = true;
    //     } else if(this.databaseEmails[i][1] == "student") {
    //       LoginComponent.isTeacher = false;
    //     }
    //     break;
    //   }
    // }
    this.loginService.getEmails(this.email.value).subscribe(response => {  this.emailQueryResults = response
                                                                          if(this.emailQueryResults.length == 0) {
                                                                            this.isDatabaseEmail = false;
                                                                          } else if(this.emailQueryResults[0].professor_id != null) {
                                                                            document.getElementById("appearError")!.style.display = "none";
                                                                            LoginComponent.isTeacher = true;
                                                                            LoginComponent.isTa = false;
                                                                            LoginComponent.isStudent = false;
                                                                            this.isDatabaseEmail = true;
                                                                          } else if(this.emailQueryResults[0].v_number != null && this.emailQueryResults[0].ta_id != null) {
                                                                            document.getElementById("appearError")!.style.display = "none";
                                                                            LoginComponent.isTa = true;
                                                                            LoginComponent.isTeacher = true;
                                                                            LoginComponent.isStudent = true;
                                                                            this.isDatabaseEmail = true;
                                                                          } else {
                                                                            document.getElementById("appearError")!.style.display = "none";
                                                                            this.isDatabaseEmail = true
                                                                            LoginComponent.isTeacher = false;
                                                                            LoginComponent.isTa = false;
                                                                            LoginComponent.isStudent = true;
                                                                          }
                                                                          if(this.isDatabaseEmail == true) {
                                                                            LoginComponent.userEmail = this.email.value;
                                                                            this.route.navigate(['/schedule'])
                                                                          } else {
                                                                            document.getElementById("appearError")!.style.display = "block";
                                                                          }
                                                                        });
  }

}
