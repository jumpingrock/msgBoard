import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgModule }      from '@angular/core';
import { appForm } from '../app.model';
// import { Timestamp } from 'rxjs';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})
export class ReportFormComponent implements OnInit {
  report: string;
  username: string;
  currentTimeStamp: Date;
  createReport: appForm;
  @Output() reportCreated = new EventEmitter<appForm>();
  @Input() reportForEdit: appForm;

  if(reportForEdit) {
    this.report = this.reportForEdit.report;
    this.username = this.reportForEdit.username;
    console.log("in report for edit");
  }

  constructor() { }

  ngOnInit(): void {
  }

  buttonOnClick = () => {
    // prompt("hello there!");
    this.currentTimeStamp = new Date();
    this.createReport = new appForm(this.username, this.currentTimeStamp.toString(), this.report);
    this.reportCreated.emit(this.createReport);
    this.report = '';
    this.username = '';

  }

  reportReturnForEdit = () => {

  }

}
