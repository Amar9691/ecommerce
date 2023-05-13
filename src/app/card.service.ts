import { Injectable } from '@angular/core';
import { Product } from './product/product';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  items: Product[] = [];
  constructor() {}
  addItemToCard(Item: Product) {
    this.items.push(Item);
  }
  getItems() {
    return this.items;
  }

  removeItem(Item: Number) {
    var index = 1;
    for (var i = 0; i < this.items.length; i++) {
      if (Item == this.items[i].id) {
        index = i;
      }
    }
    this.items.splice(index, 1);
  }
}
