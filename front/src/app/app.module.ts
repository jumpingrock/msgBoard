import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ReportFormComponent } from './report-form/report-form.component';
import { ApprovalFormComponent } from './approval-form/approval-form.component';
import { ViewReportComponent } from './view-report/view-report.component';
import { ReportService } from './report.service';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

const appRoutes: Routes = [
  {path: '', component: ViewReportComponent},
  {path: 'viewreport', component: ViewReportComponent},
  {path: 'reportapproval', component: ApprovalFormComponent},
  {path: 'editreport', component: ReportFormComponent},
  {path: 'createreport', component: ReportFormComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LoginComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ReportFormComponent,
    ApprovalFormComponent,
    ViewReportComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule, FormsModule, RouterModule.forRoot(appRoutes),HttpClientModule,ReactiveFormsModule
  ],
  providers: [ReportService],
  bootstrap: [AppComponent]
})
export class AppModule { }
