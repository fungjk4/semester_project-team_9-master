import { LoginComponent } from './../login/login.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import Calendar from 'tui-calendar'; /* ES6 */
import "tui-calendar/dist/tui-calendar.css";
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import { ScheduleService } from '../schedule.service';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  teacher: boolean = false;
  ta: boolean = false;
  userEmail: string = LoginComponent.userEmail;
  calResults: any;
  schedule: any[] = [];

  constructor(private scheduleServer: ScheduleService) {

   }

  ngOnInit(): void {
    this.teacher = LoginComponent.isTeacher;
    this.ta = LoginComponent.isTa;
    this.queryEvents();
  }

  queryEvents() {
    this.scheduleServer.getEvents(this.userEmail).subscribe(response => {console.log(response); this.calResults = response;
                                                            for(let i = 0; i < this.calResults.length; i++) {
                                                              let event = {
                                                                id: i,
                                                                calendarId: '1',
                                                                title: this.calResults[i].title,
                                                                category: 'time',
                                                                dueDateClass: '',
                                                                start: this.calResults[i].start,
                                                                end: this.calResults[i].end,
                                                              }
                                                              this.schedule.push(event);
                                                            }
                                                            var calendar = new Calendar('#calendar', {
                                                              defaultView: 'month',
                                                              taskView: true,
                                                              useCreationPopup: true,
                                                              template: {
                                                                monthDayname: function(dayname) {
                                                                  return '<span class="calendar-week-dayname-name">' + dayname.label + '</span>';
                                                                },
                                                              }
                                                            });
                                                            calendar.createSchedules(this.schedule);
                                                            });
  }

}
