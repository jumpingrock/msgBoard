import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgModule }      from '@angular/core';
import { appForm } from '../app.model';
import { ReportService } from '../report.service';

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

  constructor(private reportService: ReportService) {
    this.reportService.editReport.subscribe(
      (editReport: appForm) => {
        this.report = editReport.report;
        this.username = editReport.username;
      }
    )
  }

  ngOnInit(): void {
  }
  onCreateReport = () => {

    this.currentTimeStamp = new Date();
    this.createReport = new appForm(this.username, this.currentTimeStamp.toString(), this.report);
    this.reportService.reportCreated.emit(this.createReport);
    this.report = '';
    this.username = '';


  }

  onReportToEdit () {

  }

}
