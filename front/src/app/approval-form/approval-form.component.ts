import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { appForm } from '../app.model';

@Component({
  selector: 'app-approval-form',
  templateUrl: './approval-form.component.html',
  styleUrls: ['./approval-form.component.css']
})
export class ApprovalFormComponent implements OnInit {

  @Input() reportPendingApproval: appForm;
  // @Input() reportPendingApproval: appForm[];
  @Input() displayApprovalForm:boolean = false;
  @Input() indexOfReport: number;

  @Output() reportNumToDestroy = new EventEmitter<number>();


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

  onReportPendingApproval = (reportReceived: appForm) => {

  }

  onDestroyReport = () => {
    this.reportNumToDestroy.emit(this.indexOfReport);
  }

}
