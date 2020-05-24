import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { appForm, tokenInfo } from '../app.model';
import { ReportService } from '../report.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approval-form',
  templateUrl: './approval-form.component.html',
  styleUrls: ['./approval-form.component.css']
})
export class ApprovalFormComponent implements OnInit, OnDestroy {

  reportsPendingApproval: appForm[] = [];
  token: tokenInfo = this.reportService.getToken();
  private reportSub: Subscription
  login: boolean = false;
  routeURL: string = this.router.url;

  constructor(private reportService: ReportService, private router: Router) {  }
  ngOnInit(): void {
    this.reportService.getReportsPendingApproval();
    this.reportSub = this.reportService.getReportPendingApprovalListener()
      .subscribe((reports: appForm[]) => {
        this.reportsPendingApproval = reports
    })
    if(this.reportService.getIsUserLoggedIn() && this.reportService.getToken().getAuth() === "admin"){
      this.login = true;
    }
  }
  indexOfReport:number = this.reportsPendingApproval.length;

  reportApproved = (indexOfReport) => {
    this.reportService.approveReportFromPendingApproval(this.reportsPendingApproval[indexOfReport]);
    this.reportService.deleteReportFromPendingApproval(indexOfReport);
    this.reportsPendingApproval.splice(indexOfReport, 1);
  }

  onDestroyReport = (indexToRemove) => {
    // this.reportService.deleteReport.emit(this.indexOfReport);
    this.reportService.deleteReportFromPendingApproval(indexToRemove);
    this.reportsPendingApproval.splice(indexToRemove, 1);
  }

  onReportForEdit = (indexToRemove) => {
    this.reportService.addReportPendingEdit(this.reportsPendingApproval[indexToRemove]);
    this.reportService.onReportRejected(indexToRemove);
    this.reportsPendingApproval.splice(indexToRemove, 1);


  }
  ngOnDestroy():void{
    this.reportSub.unsubscribe();
  }

}
