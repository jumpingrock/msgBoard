import { Component } from '@angular/core';
import { appForm } from './app.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front';
  reportsPendingApproval: appForm[] = [(new appForm('ken', '123232', 'this it the report')),(new appForm('ken1', '123232', 'this it the report2'))];
}
