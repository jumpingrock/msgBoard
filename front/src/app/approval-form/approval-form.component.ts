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

//todo
    //send data to backend node.js once report is completed
    //send approved report into node.js backend to be stored in json
    //create router to only show approprate component --Done

  reportApproved = (indexOfReport) => {
    // this.reportPendingApproval.approve = true;
    // this.reportService.deleteReport.emit(this.indexOfReport);
    // this.reportService.addReportToPendingApproval(this.reportsPendingApproval[indexOfReport]);
  }

  onDestroyReport = (indexToRemove) => {
    // this.reportService.deleteReport.emit(this.indexOfReport);
    this.reportService.onReportRejected(indexToRemove);
    this.reportsPendingApproval.splice(indexToRemove, 1);
  }

  onReportForEdit = (indexToRemove) => {
    this.reportService.addReportPendingEdit(this.reportsPendingApproval[indexToRemove])
    this.reportService.onReportRejected(indexToRemove);
    this.reportsPendingApproval.splice(indexToRemove, 1);

  }

}
