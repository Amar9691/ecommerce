import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
export const auth = () => {
  const authService = inject(LoginService);
  const router = inject(Router);
  if (authService.islogin) {
    return true;
  }
  return router.parseUrl('/log-in');
};
