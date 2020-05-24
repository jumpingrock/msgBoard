
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
export class userForm {
  public username: string;
  public password: string;
  public loginTime: string;
  private loginType: string;

  public constructor(name: string, pass: string){
    this.username = name;
    this.password = pass;
  }
}
export class tokenInfo {
  private token: string = '';
  private auth: string = '';
  getToken() {
    return this.token;
  }
  getAuth() {
    return this.auth;
  }
  public constructor(token: string, auth: string) {
    this.token = token;
    this.auth = auth;
  }
}
