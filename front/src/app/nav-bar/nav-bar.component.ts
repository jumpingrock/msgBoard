import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report.service';
import { Subscription } from 'rxjs';
import { userForm } from '../app.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  collapsed: boolean = true;
  showCreateReport: boolean = true;
  showApproveReport: boolean = true;
  loginSub: Subscription;
  userLoggedIn: boolean = false;
  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.loginSub = this.reportService.userLoginListener()
      .subscribe((user: userForm) => {
        this.userLoggedIn = true;
    })
  }
  onShowCreateReport () {
    this.showApproveReport = false;
    this.showCreateReport = true;

  }
  onShowApproveReport () {
    this.showApproveReport = true;
    this.showCreateReport = false;
  }
  onShowPendingReport () {

  }

}
