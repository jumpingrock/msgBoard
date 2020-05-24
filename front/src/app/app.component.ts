import { Component, Input, EventEmitter, Output } from '@angular/core';
import { appForm } from './app.model';
import { ReportService } from './report.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private reportService: ReportService) {


  }

  title = 'Reporting App';


}

