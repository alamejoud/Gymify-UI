import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  chatPage: boolean = true;

  constructor() { }

  loadMessages(): any[] {
    return [];
  }
}
