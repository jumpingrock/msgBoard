import { Component, OnInit, OnDestroy } from '@angular/core';
import { userForm } from 'src/app/app.model';
import { ReportService } from 'src/app/report.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  userLogin: userForm;
  loginSub: Subscription;
  password: string='';
  username: string='';
  login: boolean = false;

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.reportService.getReportsPendingApproval();
    this.loginSub = this.reportService.isLogon
      .subscribe((logon) => {
        this.login = !logon;
    })
  }

  onLoginClicked = () => {
    this.userLogin = new userForm(this.username, this.password)
    this.reportService.userLogin(this.userLogin);
  }

  ngOnDestroy():void {
    this.loginSub.unsubscribe();
  }

}
