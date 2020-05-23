import { Component, OnInit } from '@angular/core';
import { userForm } from 'src/app/app.model';


@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userSignUp: userForm;
  username: string='';
  password: string='';

  constructor() { }

  ngOnInit(): void {
  }

  onSignUpClicked = () => {
    this.userSignUp  = new userForm(this.username, this.password);
  }

}
