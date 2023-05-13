import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { HomeService } from '../home.service';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private form: FormBuilder,
    private homeSerive: HomeService,
    private Router: Router,
    private message: MessageService
  ) {}
  registerForm = this.form.group({
    userName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  get userName() {
    return this.registerForm.get('userName');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }

  register() {
    const payload = {
      firstName: 'Muhammad',
      lastName: 'Ovi',
      age: 250,
    };
    this.homeSerive
      .registerUser(JSON.stringify(payload))
      .subscribe((Response) => {
        if (Response.id) {
          this.message.updateMessageStatus(true);
          this.message.updateMessage('User registered successfully');
          this.Router.navigate(['/log-in']);
        } else {
          this.message.updateMessageStatus(false);
          this.message.updateMessage('Something Went Wrong! Please try again');
        }
      });
  }
}
