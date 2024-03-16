import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  constructor(private sanitizer: DomSanitizer) { }

  transformImage(image: any) {
    if (image == null) {
      return '../../assets/images/Default-Profile-Picture.png';
    }
    let objectURL = 'data:image/png;base64,' + image;
    return this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }

  transformImageFromFile(file: any) {
    return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
  }
}
