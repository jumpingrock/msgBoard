import { EventEmitter, Injectable } from '@angular/core';
import { appForm } from './app.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})

export class ReportService {

  private reportsPendingApproval: appForm[];
  private reportsPendingEdit: appForm[] = [];
  private reportsApproved: appForm[] = [];
  reportUpdated = new Subject<appForm[]>();
  reportCreated = new EventEmitter<appForm>();
  editReport = new EventEmitter<appForm>();
  deleteReport = new EventEmitter<number>();

  constructor (private http: HttpClient) {}

  onReportCreate = (report: appForm) => {
    this.reportsPendingApproval.push(report);
  }
  onReportRejected = (reportNum: number) => {
    this.reportsPendingApproval.splice(reportNum, 1);
  }
  getReportApprovedListener () {
    return this.reportUpdated.asObservable();
  }
  getReportsApproved = () => {
    // return this.reportsPendingApproval;
    this.http.get<{message: string, reports: appForm[]}>
    ('http://localhost:3000/api/reportsapproved').subscribe((resData) => {
      this.reportsApproved = resData.reports;
      this.reportUpdated.next([...this.reportsApproved])
    });
  }

  getReportPendingApprovalListener () {
    return this.reportUpdated.asObservable();
  }
  getReportsPendingApproval = () => {
    // return this.reportsPendingApproval;
    this.http.get<{message: string, reports: appForm[]}>
    ('http://localhost:3000/api/reportspending').subscribe((resData) => {
      this.reportsPendingApproval = resData.reports;
      this.reportUpdated.next([...this.reportsPendingApproval])
    });
  }
  addReportToPendingApproval = (report: appForm) => {
    // return this.reportsPendingApproval;
    this.http.post<{message: string}>
    ('http://localhost:3000/api/submitreport', report).subscribe((resData) => {
      console.log(resData.message);
      // this.reportsPendingApproval = resData.reports;
      // this.reportUpdated.next([...this.reportsPendingApproval])
    });
  }
  deleteReportFromPendingApproval = (reportId: number) => {
    this.http.delete<{message: string}>
    ('http://localhost:3000/api/deletereport/'+reportId).subscribe((resData) => {
      console.log(resData.message);

    });
  }
  approveReportFromPendingApproval = (report: appForm) => {
    // return this.reportsPendingApproval;
    this.http.put<{message: string}>
    ('http://localhost:3000/api/approvereport', report).subscribe((resData) => {
      console.log(resData.message);
      // this.reportsPendingApproval = resData.reports;
      // this.reportUpdated.next([...this.reportsPendingApproval])
    });
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
