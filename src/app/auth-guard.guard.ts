import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserServiceService } from './Services/user-service.service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('token') !== null) {
      return true;
    } else {
      router.navigate(['/userLogin']);
      return false;
    }
  }
  return false;
};
