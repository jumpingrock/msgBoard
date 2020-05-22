import { EventEmitter } from '@angular/core';
import { appForm } from './app.model';

export class ReportService {

  reportCreated = new EventEmitter<appForm>();
  editReport = new EventEmitter<appForm>();
  deleteReport = new EventEmitter<number>();

  displayFunction () {
    console.log("is in report.service");
  }

}
