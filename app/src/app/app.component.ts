import { Component } from '@angular/core';
import { AuthService } from './core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ai-front-ng';

  constructor(private authService: AuthService) {}

  get isAuthorized() {
    return this.authService.isAuthenticated();
  }

  logOut() {
    this.authService.logout();
  }
}
