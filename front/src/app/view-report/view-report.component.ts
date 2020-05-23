import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { appForm } from '../app.model';
import { ReportService } from '../report.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.css']
})
export class ViewReportComponent implements OnInit {

  // reportsPendingApproval: appForm[] = [];
  reportsApproved: appForm[] = [];
  // @Input() displayApprovalForm:boolean = false;
  private reportSub: Subscription
  routeURL: string = this.router.url;

  constructor(private reportService: ReportService, private router: Router) {  }
  ngOnInit(): void {

    this.reportService.getReportsApproved();
      this.reportSub = this.reportService.getReportApprovedListener()
        .subscribe((reports: appForm[]) => {
          this.reportsApproved = reports
        })
  }
  indexOfReport:number = this.reportsApproved.length;

//todo
    //send data to backend node.js once report is completed
    //send approved report into node.js backend to be stored in json
    //create router to only show approprate component --Done


  onReportForEdit = (indexToRemove) => {
    this.reportService.addReportPendingEdit(this.reportsApproved[indexToRemove])
    this.reportService.onReportRejected(indexToRemove);
    this.reportsApproved.splice(indexToRemove, 1);


  }

}

