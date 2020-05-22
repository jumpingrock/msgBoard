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
  @Output() reportForEdit = new EventEmitter<appForm>();

  constructor() { }

  ngOnInit(): void {
  }

  reportApproved = () => {
    this.reportPendingApproval.approve = true;

    //todo
    //findout why username is not displayed properly -- Done
    //send approved report into node.js backend to be stored in json
    //delete report when reject button is clicked -- Done
    //emit event when edit is clicked
    //send data to backend node.js once report is completed
    //delete report from q once approved --done
    this.reportNumToDestroy.emit(this.indexOfReport);

  }

  onDestroyReport = () => {
    this.reportNumToDestroy.emit(this.indexOfReport);
  }

  onReportForEdit = () => {
    this.reportForEdit.emit(this.reportPendingApproval);
  }

}
