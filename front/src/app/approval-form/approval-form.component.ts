import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-approval-form',
  templateUrl: './approval-form.component.html',
  styleUrls: ['./approval-form.component.css']
})
export class ApprovalFormComponent implements OnInit {

  @Input() reportPendingApproval: {userName: string, time: string, report: string, approve: boolean};
  @Input() displayApprovalForm:boolean = false;


  constructor() { }

  ngOnInit(): void {
  }

  reportApproved = (reportPendingApproval) => {
    reportPendingApproval.approve = true;
  }

}
