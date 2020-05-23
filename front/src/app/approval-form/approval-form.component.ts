import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { appForm } from '../app.model';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-approval-form',
  templateUrl: './approval-form.component.html',
  styleUrls: ['./approval-form.component.css']
})
export class ApprovalFormComponent implements OnInit {

  @Input() reportPendingApproval: appForm;
  @Input() displayApprovalForm:boolean = false;
  // @Input() indexOfReport: number;

  constructor(private reportService: ReportService) {  }
  ngOnInit(): void {  }

  reportsPendingApproval: appForm[] = this.reportService.getReportsPendingApproval();
  indexOfReport:number = this.reportService.getReportPendingApprovalLength();
//todo
    //send data to backend node.js once report is completed
    //send approved report into node.js backend to be stored in json
    //create router to only show approprate component

  reportApproved = () => {
    this.reportPendingApproval.approve = true;


    this.reportService.deleteReport.emit(this.indexOfReport);
  }

  onDestroyReport = () => {
    this.reportService.deleteReport.emit(this.indexOfReport);
  }

  onReportForEdit = (indexToRemove) => {
    // this.reportService.editReport.emit(this.reportsPendingApproval[indexToRemove]);
    this.reportService.addReportPendingEdit(this.reportsPendingApproval[indexToRemove])
    this.reportService.onReportRejected(indexToRemove);

    // this.reportService.deleteReport.emit(this.indexOfReport);

  }

}
    //findout why username is not displayed properly -- Done
    //delete report when reject button is clicked -- Done
    //emit event when edit is clicked --done
    //delete report from q once approved --done
