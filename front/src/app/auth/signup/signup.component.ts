import { Component, OnInit } from '@angular/core';
import { userForm } from 'src/app/app.model';
import { ReportService } from 'src/app/report.service';


@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userSignUp: userForm;
  username: string='';
  password: string='';

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
  }

  onSignUpClicked = () => {
    this.userSignUp  = new userForm(this.username, this.password);
    this.reportService.userSignUp(this.userSignUp);
  }

}
