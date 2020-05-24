import { EventEmitter, Injectable } from '@angular/core';
import { appForm, userForm, tokenInfo } from './app.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { sha256, sha224 } from 'js-sha256';

@Injectable({providedIn: 'root'})

export class ReportService {

  private reportsPendingApproval: appForm[];
  private reportsPendingEdit: appForm[] = [];
  private reportsApproved: appForm[] = [];
  private userLoginInfo: userForm;
  private token: tokenInfo;
  reportUpdated = new Subject<appForm[]>();
  userLogon = new Subject<userForm>();
  reportCreated = new EventEmitter<appForm>();
  editReport = new EventEmitter<appForm>();
  deleteReport = new EventEmitter<number>();

  constructor (private http: HttpClient) {}



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

  onReportCreate = (report: appForm) => {
    this.reportsPendingApproval.push(report);
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
  onReportRejected = (reportNum: number) => {
    this.reportsPendingApproval.splice(reportNum, 1);
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
  addReportPendingEdit = (report: appForm) => {
    console.log(report);
    this.reportsPendingEdit.push(report);
    console.log(this.reportsPendingEdit);
  }

  setUserLoginInfo = (info: userForm) => {
    this.userLoginInfo = info;
    console.log(info);
  }
  getUserLoginInfo = () => {
    return this.userLoginInfo;
  }
  userLoginListener () {
    return this.userLogon.asObservable();
  }
  userLogin = (user: userForm) => {
    user.password = sha256(user.password + 'salt');
    this.http.post<{message: string, logonInfo: any}>
    ('http://localhost:3000/api/login', user).subscribe((resData) => {
      console.log(resData.logonInfo);
      this.token = new tokenInfo(resData.logonInfo.token, resData.logonInfo.auth);
      console.log(this.token);
      // this.reportsPendingApproval = resData.reports;
      // this.reportUpdated.next([...this.reportsPendingApproval])
    });
  }
  getToken = () => {
    return this.token;
  }
  userSignUp = (user: userForm) => {
    user.password = sha256(user.password + 'salt');
    this.http.post<{message: string}>
    ('http://localhost:3000/api/signup', user).subscribe((resData) => {
      console.log(resData.message);
      // this.reportsPendingApproval = resData.reports;
      // this.reportUpdated.next([...this.reportsPendingApproval])
    });
  }

}
