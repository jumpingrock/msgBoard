import { Component, OnInit } from '@angular/core';
import { appForm } from '../app.model';
import { ReportService } from '../report.service';
import { Router } from '@angular/router';

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
  editReport: appForm[];
  editReportIndex: number;

  constructor(private reportService: ReportService, private router: Router) {  }

  ngOnInit(): void {
    if(this.router.url === '/editreport') {
      this.editReport = this.reportService.getReportsPendingEdit();
      this.report = this.editReport[0].report;
      this.username = this.editReport[0].username
    }
  }
  buttonOnClick = () => {

    this.currentTimeStamp = new Date();
    this.createReport = new appForm(this.username, this.currentTimeStamp.toString(), this.report);
    // this.reportService.reportCreated.emit(this.createReport);
    this.reportService.addReportToPendingApproval(this.createReport);


    if(this.router.url === '/editreport' && this.editReport.length >= 2){
      this.editReport.splice(0,1);
      this.report = this.editReport[0].report;
      this.username = this.editReport[0].username;
    }else {
      this.report = '';
      this.username = '';
    }

  }

}
