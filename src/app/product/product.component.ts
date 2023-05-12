import { Component, Input } from '@angular/core';
import { Product } from './product';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ProductComponent {
  @Input() product: any = '';
}
