import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  showMessage = false;
  message = '';
  private showMessage$ = new BehaviorSubject<boolean>(this.showMessage);
  private message$ = new BehaviorSubject<string>(this.message);
  isShowMessage = this.showMessage$.asObservable();
  currentMessage = this.message$.asObservable();
  updateMessageStatus(answer: boolean) {
    this.showMessage$.next(answer);
  }
  updateMessage(Message: string) {
    this.message$.next(Message);
  }
  constructor() {}
}
