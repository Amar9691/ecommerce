import { Component } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private form: FormBuilder,
    private login: LoginService,
    private route: Router,
    private message: MessageService
  ) {}
  loginForm = this.form.group({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  submitLogin() {
    const payload = this.loginForm.value;
    this.login.login(payload).subscribe((response) => {
      if (response.id) {
        this.login.changeLogin(true);
        this.login.changeLoggedUser(response);
        this.route.navigate(['/']);
        this.message.updateMessageStatus(true);
        this.message.updateMessage('User Logged Successfully');
      } else {
        this.message.updateMessageStatus(false);
        this.message.updateMessage('Something Went Wrong! Please try again');
      }
    });
  }
}
