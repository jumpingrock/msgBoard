import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { appForm } from '../app.model';
import { ReportService } from '../report.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approval-form',
  templateUrl: './approval-form.component.html',
  styleUrls: ['./approval-form.component.css']
})
export class ApprovalFormComponent implements OnInit {

  reportsPendingApproval: appForm[] = [];
  // @Input() displayApprovalForm:boolean = false;
  private reportSub: Subscription
  routeURL: string = this.router.url;

  constructor(private reportService: ReportService, private router: Router) {  }
  ngOnInit(): void {
    this.reportService.getReportsPendingApproval();
    this.reportSub = this.reportService.getReportPendingApprovalListener()
      .subscribe((reports: appForm[]) => {
        this.reportsPendingApproval = reports
    })
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
    this.reportService.addReportPendingEdit(this.reportsPendingApproval[indexToRemove])
    this.reportService.onReportRejected(indexToRemove);
    this.reportsPendingApproval.splice(indexToRemove, 1);

  }

}
