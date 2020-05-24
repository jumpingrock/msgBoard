import { Component, OnInit } from '@angular/core';
import { appForm, tokenInfo } from '../app.model';
import { ReportService } from '../report.service';
import { Subscription } from 'rxjs';
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
  login: boolean = false;
  private editReportSub: Subscription
  auth: string = '';
  token: tokenInfo = this.reportService.getToken();


  constructor(private reportService: ReportService, private router: Router) {  }

  ngOnInit(): void {
    if(this.reportService.getIsUserLoggedIn()){
      this.login = true;
    }
    if(this.router.url === '/editreport' && this.login) {
      this.reportService.getReportsPendingEdit();
      this.editReportSub = this.reportService.editReportSub
        .subscribe((reports: appForm[]) => {
          console.log(reports)
          this.editReport = reports
          this.report = reports[0].report;
          this.username = reports[0].report;
      })

      if(this.editReport.length > 0){
        this.report = this.editReport[0].report;
        this.username = this.editReport[0].username
      }
    }
  }
  onLogOut = () => {

  }
  buttonOnClick = () => {

    this.currentTimeStamp = new Date();
    this.createReport = new appForm(this.username, this.currentTimeStamp.toString(), this.report);
    this.reportService.addReportToPendingApproval(this.createReport);
    if(this.router.url === '/editreport'){
      this.editReport.splice(0,1);
      this.report = this.editReport[0].report;
      this.username = this.editReport[0].username;
    }else {
      this.report = '';
      this.username = '';
    }

  }

}
