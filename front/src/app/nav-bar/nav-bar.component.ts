import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  collapsed: boolean = true;
  showCreateReport: boolean = true;
  showApproveReport: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }
  onShowCreateReport () {
    this.showApproveReport = false;
    this.showCreateReport = true;
  }
  onShowApproveReport () {
    this.showApproveReport = true;
    this.showCreateReport = false;
  }

}
