import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReportService } from '../report.service';
import { Subscription, Observable } from 'rxjs';
import { userForm, tokenInfo } from '../app.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {
  collapsed: boolean = true;
  // showCreateReport: boolean = true;
  // showApproveReport: boolean = true;
  // userLoggedIn: boolean = false;
  loginSub: Subscription;
  login: boolean = false;
  token: tokenInfo = this.reportService.getToken();
  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.loginSub = this.reportService.isLogon
      .subscribe((logon) => {
        this.login = logon;
    })
  }
  onLogOut = () => {
    this.reportService.onLogout();
  }

  ngOnDestroy(): void {
    this.loginSub.unsubscribe();
  }


}
