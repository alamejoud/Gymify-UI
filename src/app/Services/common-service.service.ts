import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  toggleMenu: boolean = false;
  routePageMap = new Map<string, string>();

  constructor(private sanitizer: DomSanitizer, private messageService: MessageService, private router: Router) {
    this.routePageMap.set('home', 'Home');
    this.routePageMap.set('workout', 'Workout');
    this.routePageMap.set('exercises', 'Exercises');
  }

  transformImage(image: any): any {
    if (image == null) {
      return '../../assets/images/missing-image.jpg';
    }
    let objectURL = 'data:image/png;base64,' + image;
    return this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }

  transformImageFromFile(file: any) {
    return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
  }

  handleSuccess(message): any {
    this.messageService.clear();
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  handleError(error): any {
    this.messageService.clear();
    this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
    if (error.status === 401) {
      localStorage.removeItem('token');
      this.router.navigate(['/userLogin/login']);
    }
  }

  transformUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getRole() {
    let token = localStorage?.getItem('token');
    if (token) {
      let payload = token.split('.')[1];
      let payloadData = JSON.parse(atob(payload));
      return payloadData.payload.role;
    }
  }

  getUsername() {
    let token = localStorage?.getItem('token');
    if (token) {
      let payload = token.split('.')[1];
      let payloadData = JSON.parse(atob(payload));
      return payloadData.sub;
    }
  }

  updateTitle() {
    return this.routePageMap.get(this.router.url.split('/')[2]);
  }
}
