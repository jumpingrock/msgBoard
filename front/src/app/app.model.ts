
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

  setLoginType = (type) =>{
    this.loginType = type;
  }
  getLoginType = () => {
    return this.loginType
  }

  public constructor(name: string, pass: string){
    this.username = name;
    this.password = pass;

  }

}
