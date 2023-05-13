import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  isShowMessage = false;
  messageDescription = '';
  constructor(private message: MessageService) {}

  ngOnInit(): void {
    this.message.isShowMessage.subscribe((message) => {
      if (message == true) {
        this.isShowMessage = message;
        setTimeout(() => {
          this.hideMessage();
        }, 3000);
      }
    });
    this.message.currentMessage.subscribe((message) => {
      this.messageDescription = message;
    });
  }

  hideMessage() {
    this.isShowMessage = false;
    this.message.updateMessageStatus(false);
  }
}
