import { Timestamp } from 'rxjs';

export class appForm {
  public username: string;
  // public time: Timestamp<String>;
  public time: string;
  public report: string;

  public constructor (name: string, time: string, report: string) {
    this.username = name;
    this.time = time;
    this.report = report;
  }
}
