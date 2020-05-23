import { Component, OnInit } from '@angular/core';
import { userForm } from 'src/app/app.model';
import { ReportService } from 'src/app/report.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userLogin: userForm;
  loginSub: Subscription;
  password: string='';
  username: string='';

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.reportService.getReportsPendingApproval();
    this.loginSub = this.reportService.userLoginListener()
      .subscribe((user: userForm) => {
        this.userLogin = user;
        this.reportService.setUserLoginInfo(user);
    })
  }

  onLoginClicked = () => {
    this.userLogin = new userForm(this.username, this.password)
    this.reportService.userLogin(this.userLogin);
  }

}
