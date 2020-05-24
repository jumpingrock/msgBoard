import { EventEmitter, Injectable } from '@angular/core';
import { appForm, userForm, tokenInfo } from './app.model';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { sha256, sha224 } from 'js-sha256';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})

export class ReportService {

  private reportsPendingApproval: appForm[];
  private reportsPendingEdit: appForm[] = [];
  private reportsApproved: appForm[] = [];
  private userLoginInfo: userForm;
  private token: tokenInfo;
  private isUserLoggedIn: boolean = false;
  reportUpdated = new Subject<appForm[]>();
  userLogon = new Subject<userForm>();
  isLogon = new Subject<boolean>();
  editReportSub = new Subject<appForm[]>();
  // reportCreated = new EventEmitter<appForm>();
  // editReport = new EventEmitter<appForm>();
  // deleteReport = new EventEmitter<number>();


  constructor (private http: HttpClient, private router: Router) {}

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
    this.http.post<{message: string}>
    ('http://localhost:3000/api/submitreport', report).subscribe((resData) => {

    });
  }
  onReportRejected = (reportNum: number) => {
    this.reportsPendingApproval.splice(reportNum, 1);
    this.deleteReportFromPendingApproval(reportNum);
    // this.router.navigate(['editreport']);
  }
  deleteReportFromPendingApproval = (reportId: number) => {
    this.http.delete<{message: string}>
    ('http://localhost:3000/api/deletereport/'+reportId).subscribe((resData) => {

    });
  }

  approveReportFromPendingApproval = (report: appForm) => {
    // return this.reportsPendingApproval;
    this.http.put<{message: string}>
    ('http://localhost:3000/api/approvereport', report).subscribe((resData) => {

    });
  }

  getReportsPendingEdit = () => {
    this.http.get<{message: string, reports: appForm[]}>
    ('http://localhost:3000/api/reportspendingedit').subscribe((resData) => {
      this.reportsPendingEdit = resData.reports;
      this.editReportSub.next([...this.reportsPendingEdit])

    });
    return this.reportsPendingEdit;
  }
  deleteReportFromPendingEdit = (reportId: number) => {
    this.http.delete<{message: string}>
    ('http://localhost:3000/api/deleteeditreport/'+reportId).subscribe((resData) => {

    });
  }
  addReportPendingEdit = (report: appForm) => {
    this.reportsPendingEdit.push(report);
    this.http.post<{message: string}>
    ('http://localhost:3000/api/addreporttoediting', report).subscribe((resData) => {

    });

  }
  userLoginListener () {
    return this.userLogon.asObservable();
  }
  userLogin = (user: userForm) => {
    user.password = sha256(user.password + 'salt');
    this.http.post<{message: string, logonInfo: any}>
    ('http://localhost:3000/api/login', user).subscribe((resData) => {
      this.isUserLoggedIn = true;
      this.token = new tokenInfo(resData.logonInfo.token, resData.logonInfo.auth, resData.logonInfo.id);
      this.isLogon.next(this.isUserLoggedIn);
      this.router.navigate(['createreport']);

    });
  }
  onLogout = () => {
    this.isUserLoggedIn = false;
    this.userLoginInfo = null;
  }
  getIsUserLoggedIn() {
    return this.isUserLoggedIn;
  }
  getToken = () => {
    return this.token;
  }
  userSignUp = (user: userForm) => {
    user.password = sha256(user.password + 'salt');
    this.http.post<{message: string}>
    ('http://localhost:3000/api/signup', user).subscribe((resData) => {
      this.router.navigate(['login']);

    });
  }

}
