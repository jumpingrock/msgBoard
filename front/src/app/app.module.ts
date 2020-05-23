import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ReportFormComponent } from './report-form/report-form.component';
import { ApprovalFormComponent } from './approval-form/approval-form.component';
import { ViewReportComponent } from './view-report/view-report.component';
import { ReportService } from './report.service';

const appRoutes: Routes = [
  {path: '', component: ViewReportComponent},
  {path: 'viewreport', component: ViewReportComponent},
  {path: 'reportapproval', component: ApprovalFormComponent},
  {path: 'editreport', component: ReportFormComponent},
  {path: 'createreport', component: ReportFormComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ReportFormComponent,
    ApprovalFormComponent,
    ViewReportComponent
  ],
  imports: [
    BrowserModule, FormsModule, RouterModule.forRoot(appRoutes)
  ],
  providers: [ReportService],
  bootstrap: [AppComponent]
})
export class AppModule { }
