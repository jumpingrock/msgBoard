import { Timestamp } from 'rxjs';

export class appForm {
  public username: string;
  public time: string;
  public report: string;
  public approve: boolean;
  public indexNumber: number;

  public constructor (userName: string, time: string, report: string) {
    this.username = userName;
    this.time = time;
    this.report = report;
    this.approve = false;
    this.indexNumber = null;

  }
}
