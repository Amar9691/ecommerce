import { Component, Input } from '@angular/core';
import { Product } from './product';
import { ViewEncapsulation } from '@angular/core';
import { CardService } from '../card.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ProductComponent {
  @Input() product: any = '';
  constructor(public card: CardService, private message: MessageService) {}
  addItemToCard(product: Product) {
    this.card.addItemToCard(product);
    this.message.updateMessageStatus(true);
    this.message.updateMessage('Product Added into card');
  }
}
