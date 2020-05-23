import { Component, OnInit } from '@angular/core';
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

  reportsApproved: appForm[] = [];
  private reportSub: Subscription

  constructor(private reportService: ReportService, private router: Router) {  }
  ngOnInit(): void {

    this.reportService.getReportsApproved();
      this.reportSub = this.reportService.getReportApprovedListener()
        .subscribe((reports: appForm[]) => {
          this.reportsApproved = reports
        })
  }
  indexOfReport:number = this.reportsApproved.length;

}

