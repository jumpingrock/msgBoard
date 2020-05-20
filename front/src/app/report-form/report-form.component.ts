import { Component, OnInit } from '@angular/core';
import { appForm } from '../app.model';
// import { Timestamp } from 'rxjs';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})
export class ReportFormComponent implements OnInit {
  createReport: appForm;

  constructor() { }

  ngOnInit(): void {
  }

  buttonOnClick = () => {
    prompt("hello there!");
    this.createReport = new appForm("someusername", "timetimetime", "whatever is in the textarea");

  }

}
