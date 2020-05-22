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
    reportService.deleteReport.subscribe(
      (reportNumber: number) => {this.onReportDelete(reportNumber);})

  }

  title = 'Reporting App';
  reportsPendingApproval: appForm[] = [(new appForm('ken', '123232', 'this it the report')),(new appForm('ken1', '123232', 'this it the report2'))];
  @Output() reportPassedToApprovalComponent = new EventEmitter<appForm>();
  @Output() reportReturnedToEditComponent = new EventEmitter<appForm>();

  //todo

  onReportSubmitted = (reportSubmitted: appForm) => {
    this.reportsPendingApproval.push(reportSubmitted);
  }

  onReportDelete = (reportNumber: number) => {
    this.reportsPendingApproval.splice(reportNumber, 1);
  }

}
  //event reciver from reportform and append report to reportsPendingApproval -- Done
  //event emitter to reportform if edit is clicked -- outsource to service
