import { Component, Input, EventEmitter, Output } from '@angular/core';
import { appForm } from './app.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front';
  @Input() reportsPendingApproval: appForm[] = [(new appForm('ken', '123232', 'this it the report')),(new appForm('ken1', '123232', 'this it the report2'))];
  // @Output() reportCreated = new EventEmitter<appForm>();
  @Output() reportPassedToApprovalComponent = new EventEmitter<appForm>();

  //todo
  //event reciver from reportform and append report to reportsPendingApproval
  //event emitter to reportform if edit is clicked

  onReportSubmitted = (reportSubmitted: appForm) => {
    this.reportsPendingApproval.push(reportSubmitted);
    // this.reportPassedToApprovalComponent.emit(reportSubmitted);
  }

  onEditingReport = (reportToEdit: appForm) => {

  }

  onReportDelete = (reportNumber: number) => {
    this.reportsPendingApproval.splice(reportNumber, 1);
  }

}
