import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { MessageService } from 'primeng/api';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  let router = inject(Router);
  let messageService = inject(MessageService);
  let token = null;
  if (typeof window !== 'undefined') {
    token = sessionStorage?.getItem('token');
  }
  if (token) {
    try {
      let decodedToken = jwtDecode(token);
      const isExpired = decodedToken && decodedToken.exp ? decodedToken.exp < Date.now() / 1000 : false;
      if (isExpired) {
        console.log('Token expired');
        sessionStorage?.removeItem('token');
        messageService.clear();
        messageService.add({ severity: 'warning', summary: 'Warning', detail: 'Session has expired' });
        router.navigate(['/userLogin/login']);
      } else {
        console.log('Token found');
      }
    } catch (e) {
      console.log('Error decoding token');
      sessionStorage?.removeItem('token');
      router.navigate(['/userLogin/login']);
    }
  } else {
    console.log('No token found');
    router.navigate(['/userLogin/login']);
  }
  return next(req);
};