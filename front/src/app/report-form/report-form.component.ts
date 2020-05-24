import { Component, OnInit, OnDestroy } from '@angular/core';
import { appForm, tokenInfo } from '../app.model';
import { ReportService } from '../report.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})
export class ReportFormComponent implements OnInit, OnDestroy {
  report: string;
  username: string;
  currentTimeStamp: Date;
  createReport: appForm;
  editReport: appForm[];
  editReportIndex: number;
  login: boolean = false;
  private editReportSub: Subscription
  auth: string = '';
  token: tokenInfo;

  constructor(private reportService: ReportService, private router: Router) {  }

  ngOnInit(): void {
    if(this.reportService.getIsUserLoggedIn()){
      this.login = true;
      this.token = this.reportService.getToken();
      this.username = this.token.getId();
    }
    if(this.router.url === '/editreport' && this.login) {
      this.reportService.getReportsPendingEdit();
      this.editReportSub = this.reportService.editReportSub
        .subscribe((reports: appForm[]) => {
          this.editReport = reports
          this.appendReport();
      })
    }
  }

  buttonOnClick = () => {

    this.currentTimeStamp = new Date();
    this.createReport = new appForm(this.username, this.currentTimeStamp.toString(), this.report);
    this.reportService.addReportToPendingApproval(this.createReport);
    this.reportService.deleteReportFromPendingEdit(0);
    if(this.router.url === '/editreport'){
      this.editReport.splice(0,1);
      if(this.editReport.length > 0){
        this.appendReport();
      }else {
        this.removeReport();
      }

    }else {
      this.removeReport();
    }

  }
  appendReport = () => {
    if(this.editReport.length > 0){
      this.report = this.editReport[0].report;
      this.username = this.editReport[0].username;
    }

  }

  removeReport = () => {
    this.report = '';
    this.username = '';
  }
  ngOnDestroy():void {
    if(this.editReportSub){
      this.editReportSub.unsubscribe();
    }

  }

}
