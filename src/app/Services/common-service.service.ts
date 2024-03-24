import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  toggleMenu: boolean = true;

  constructor(private sanitizer: DomSanitizer, private messageService: MessageService, private router: Router) { }

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
}
