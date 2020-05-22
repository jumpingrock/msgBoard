import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ReportFormComponent } from './report-form/report-form.component';
import { ApprovalFormComponent } from './approval-form/approval-form.component';
import { ViewReportComponent } from './view-report/view-report.component';
import { ReportService } from './report.service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ReportFormComponent,
    ApprovalFormComponent,
    ViewReportComponent
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [ReportService],
  bootstrap: [AppComponent]
})
export class AppModule { }
