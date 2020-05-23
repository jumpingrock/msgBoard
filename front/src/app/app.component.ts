import { Component, Input, EventEmitter, Output } from '@angular/core';
import { appForm } from './app.model';
import { ReportService } from './report.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private reportService: ReportService) {
    reportService.reportCreated.subscribe(
      (newReport: appForm) => {this.onReportSubmitted(newReport);})
    // reportService.deleteReport.subscribe(
    //   (reportNumber: number) => {this.onReportDelete(reportNumber);})

  }

  title = 'Reporting App';
  reportsPendingApproval: appForm[] = this.reportService.getReportsPendingApproval();

  //todo

  onReportSubmitted = (reportSubmitted: appForm) => {
    this.reportsPendingApproval.push(reportSubmitted);

  }



}
  //event reciver from reportform and append report to reportsPendingApproval -- Done
  //event emitter to reportform if edit is clicked -- outsource to service
