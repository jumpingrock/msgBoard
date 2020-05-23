import { EventEmitter } from '@angular/core';
import { appForm } from './app.model';

export class ReportService {

  private reportsPendingApproval: appForm[] = [(new appForm('ken', '123232', 'this it the report')),(new appForm('ken1', '123232', 'this it the report2'))];
  private reportsPendingEdit: appForm[] = [];

  reportCreated = new EventEmitter<appForm>();
  editReport = new EventEmitter<appForm>();
  deleteReport = new EventEmitter<number>();

  onReportCreate = (report: appForm) => {
    this.reportsPendingApproval.push(report);
  }
  onReportRejected = (reportNum: number) => {
    this.reportsPendingApproval.splice(reportNum, 1);
  }
  getReportsPendingApproval = () => {
    return this.reportsPendingApproval;
  }
  getReportPendingApprovalLength = () => {
    return this.reportsPendingApproval.length;
  }
  getReportsPendingEdit = () => {
    return this.reportsPendingEdit;
  }
  getReportPendingEditLength = () => {
    return this.reportsPendingEdit.length;
  }
  addReportPendingEdit = (report: appForm) => {
    console.log(report);
    this.reportsPendingEdit.push(report);
    console.log(this.reportsPendingEdit);
  }

}
