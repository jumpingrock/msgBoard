import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ReportFormComponent } from './report-form/report-form.component';
import { ApprovalFormComponent } from './approval-form/approval-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ReportFormComponent,
    ApprovalFormComponent
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
