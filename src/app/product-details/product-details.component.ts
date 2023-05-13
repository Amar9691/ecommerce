import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Product } from '../product/product';
import { HomeService } from '../home.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CardService } from '../card.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;
  id!: number;
  qty: number = 1;
  changeImage: boolean = false;
  imageSrc: string = '';
  constructor(
    private HomeSerive: HomeService,
    private route: ActivatedRoute,
    public card: CardService,
    private message: MessageService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.HomeSerive.getProductDetails(this.id).subscribe((response) => {
      this.product = response;
    });
  }
  manageQty(obj: string): void {
    if (obj == 'add') {
      this.qty++;
    } else {
      this.qty > 1 ? this.qty-- : 1;
    }
  }
  changImage(src: string): void {
    this.changeImage = true;
    this.imageSrc = src;
  }

  addItemToCard(product: Product) {
    this.card.addItemToCard(product);
    this.message.updateMessageStatus(true);
    this.message.updateMessage('Product Added into card');
  }
}
