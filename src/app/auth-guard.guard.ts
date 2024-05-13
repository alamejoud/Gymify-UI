import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserServiceService } from './Services/user-service.service';
import { CommonServiceService } from './Services/common-service.service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const commonServiceService = inject(CommonServiceService);
  const allowedRoles = route.data['roles'] as Array<string>;
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('token') !== null) {
      if (allowedRoles && allowedRoles.includes(commonServiceService.getRole())) {
        return true;
      } else {
        router.navigate(['homePage/pageNotFound']);
        return false;
      }
    } else {
      router.navigate(['/userLogin']);
      return false;
    }
  }
  return false;
};
