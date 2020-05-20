import { Component, OnInit, Input } from '@angular/core';
import { appForm } from '../app.model';

@Component({
  selector: 'app-approval-form',
  templateUrl: './approval-form.component.html',
  styleUrls: ['./approval-form.component.css']
})
export class ApprovalFormComponent implements OnInit {

  @Input() reportPendingApproval: appForm;
  @Input() displayApprovalForm:boolean = false;


  constructor() { }

  ngOnInit(): void {
  }

  reportApproved = (reportPendingApproval) => {
    reportPendingApproval.approve = true;
    //todo
    //findout why username is not displayed properly
    //send approved report into node.js backend to be stored in json
    //delete report when reject button is clicked
    //emit event when edit is clicked
  }

}
