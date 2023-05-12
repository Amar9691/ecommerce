import { Component } from '@angular/core';
import { env } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  appName: string = env.APP_NAME;
  appEnv: string = env.APP_ENV;
}
