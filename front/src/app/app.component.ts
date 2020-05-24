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
    // reportService.reportCreated.subscribe(
    //   (newReport: appForm) => {this.onReportSubmitted(newReport);})

  }

  title = 'Reporting App';

  // onReportSubmitted = (reportSubmitted: appForm) => {
  //   this.reportsPendingApproval.push(reportSubmitted);

  // }



}

