import { Timestamp } from 'rxjs';

export class appForm {
  public username: string;
  // public time: Timestamp<String>;
  public time: string;
  public report: string;
  public approve: boolean;

  public constructor (userName: string, time: string, report: string) {
    this.username = userName;
    this.time = time;
    this.report = report;
    this.approve = false;
  }
}
