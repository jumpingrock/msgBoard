import { Component, OnInit } from '@angular/core';
import { appForm } from '../app.model';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})
export class ReportFormComponent implements OnInit {

  report: string = "";
  reportGen: appForm;

  constructor() { }

  ngOnInit(): void {
  }

  buttonOnClick = () => {
    prompt("hello there!");
    this.reportGen = new appForm(this.report, this.report, this.report)
  }

}
