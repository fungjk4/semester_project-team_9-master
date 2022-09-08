import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformationComponent } from './information/information.component';
import { StudySessionComponent } from './study-session/study-session.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { LoginComponent } from './login/login.component';
import { TeacherInformationComponent } from './teacher-information/teacher-information.component';

const routes: Routes = [
  { path: 'information', component: InformationComponent},
  { path: 'study-session', component: StudySessionComponent},
  { path: 'schedule', component: ScheduleComponent},
  { path: '', component: LoginComponent},
  { path: 'teacherInformation', component: TeacherInformationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
